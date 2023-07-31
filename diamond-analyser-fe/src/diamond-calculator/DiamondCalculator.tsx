import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, styled, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { RootState } from '../store/modules/store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { DIAMOND_CHARACTERISTICS, EMPTY_DIAMOND_DATA } from '../constants/diamond-characteristics';
import {
  AUTOCOMPLETE_TYPE,
  DiamondCharacteristic,
  IAutocompleteDiamondCharacteristic,
  IDiamondCharacteristicRequestData,
  INumericDiamondCharacteristic,
  NUMBER_TYPE,
} from '../types/diamond-characteristics';
import { getTextFieldErrorText } from './helper/error';
import { CharacteristicField } from './CharacteristicField';
import { IDiamondPriceData } from '../store/modules/diamond/diamondSlice';
import { formatPrice } from './helper/price';
import { calculatePriceThunk } from '../store/modules/diamond/thunks';
import { SimilarProducts } from './SimilarProducts';

const ListBox = styled(Box)(() => ({
  width: '100%',
  marginBottom: '20px',
}));
const ActionBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
  gap: '10px',
}));
const ResultedData = styled(Typography)(() => ({
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '20px 0',
}));
const DiamondCalculator = () => {
  const dispatch = useAppDispatch();
  const priceData = useAppSelector<IDiamondPriceData | null>((state: RootState) => state.diamond.price.data);
  const priceLoading = useAppSelector<boolean>((state: RootState) => state.diamond.price.loading);
  const priceError = useAppSelector<string>((state: RootState) => state.diamond.price.error);
  const similarProductsLoading = useAppSelector<boolean>((state: RootState) => state.diamond.similarProducts.loading);
  const similarProductsError = useAppSelector<string>((state: RootState) => state.diamond.similarProducts.error);
  const [inputValues, setInputValues] = useState<Record<string, { value: string | null; errorText: string }>>({});
  const [errorShown, setErrorShown] = useState<boolean>(false);
  const [expandedOptionsShown, setExpandedOptionsShown] = useState(false);

  const setDefaultValues = () => {
    const initialValues: Record<string, { value: string | null; errorText: string }> = {};

    DIAMOND_CHARACTERISTICS.forEach((item: DiamondCharacteristic) => {
      if (item.type === AUTOCOMPLETE_TYPE) {
        initialValues[item.id] = { value: (item as IAutocompleteDiamondCharacteristic).defaultValue?.toString() ?? null, errorText: '' };
      } else if (item.type === NUMBER_TYPE) {
        initialValues[item.id] = { value: (item as INumericDiamondCharacteristic).defaultValue?.toString() ?? null, errorText: '' };
      }
    });

    setInputValues(initialValues);
  };
  useEffect(() => setDefaultValues(), []);

  const formHasErrors = Object.values(inputValues).some(({ errorText }) => !!errorText);

  const handleInputChange = (item: DiamondCharacteristic, value: string): void => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [item.id]: { value, errorText: getTextFieldErrorText(item, value) },
    }));
    if (!formHasErrors) {
      setErrorShown(false);
    }
  };

  const calculatePrice = () => {
    if (formHasErrors) {
      setErrorShown(true);
      return;
    }

    const requestData: IDiamondCharacteristicRequestData = Object.entries(inputValues)
      .filter(([, { value }]) => !!value)
      .reduce(
        (acc: IDiamondCharacteristicRequestData, [key, { value }]) => {
          acc[key] = value!;
          return acc;
        },
        { ...EMPTY_DIAMOND_DATA },
      );
    dispatch(calculatePriceThunk(requestData));
  };

  const getCharacteristics = (required: boolean) => DIAMOND_CHARACTERISTICS.filter((item: DiamondCharacteristic) => item.required === required);
  const expandMoreOptions = () => setExpandedOptionsShown(!expandedOptionsShown);

  return (
    <>
      {getCharacteristics(true).map((item: DiamondCharacteristic) => (
        <ListBox key={item.id}>
          <CharacteristicField characteristic={item} inputValue={inputValues[item.id]} errorShown={errorShown} handleInputChange={handleInputChange} />
        </ListBox>
      ))}

      <ActionBox>
        <Button
          variant="text"
          color="primary"
          sx={{ m: '10px 0 20px' }}
          endIcon={expandedOptionsShown ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          onClick={expandMoreOptions}
        >
          {expandedOptionsShown ? 'Show less options' : 'Show more options'}
        </Button>
      </ActionBox>
      {expandedOptionsShown &&
        getCharacteristics(false).map((item: DiamondCharacteristic) => (
          <ListBox key={item.id}>
            <CharacteristicField characteristic={item} inputValue={inputValues[item.id]} errorShown={errorShown} handleInputChange={handleInputChange} />
          </ListBox>
        ))}
      {priceData && <ResultedData>Calculated price: {formatPrice(priceData.price)}</ResultedData>}
      <ActionBox>
        <Button
          variant="contained"
          color="primary"
          disabled={(errorShown && formHasErrors) || priceLoading || similarProductsLoading}
          endIcon={priceLoading && <CircularProgress size={20} />}
          onClick={calculatePrice}
        >
          Calculate price
        </Button>
        {priceData && priceData.price && inputValues.cut.value && (
          <SimilarProducts cut={inputValues.cut.value} errorShown={errorShown} formHasErrors={formHasErrors} />
        )}
      </ActionBox>
      {(priceError || similarProductsError) && <ResultedData color="error">{priceError || similarProductsError}</ResultedData>}
    </>
  );
};

export default DiamondCalculator;
