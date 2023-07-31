import React from 'react';
import { Autocomplete, Box, styled, TextField, Theme, Typography } from '@mui/material';
import {
  AUTOCOMPLETE_TYPE,
  DiamondCharacteristic,
  IAutocompleteDiamondCharacteristic,
  INumericDiamondCharacteristic,
  NUMBER_TYPE,
} from '../types/diamond-characteristics';

interface IItemFieldProps {
  characteristic: DiamondCharacteristic;
  inputValue: { value: string | null; errorText: string };
  errorShown: boolean;
  handleInputChange: (item: DiamondCharacteristic, value: string) => void;
}

const TextFieldBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  gap: '20px',
}));
const TextFieldLabel = styled(Typography)(() => ({
  flex: 1,
}));
const StyledAutocomplete = styled(Autocomplete)(({ theme }: { theme: Theme }) => ({
  flex: 2,
  backgroundColor: theme.palette.common.white,
}));
const StyledTextField = styled(TextField)(({ theme }: { theme: Theme }) => ({
  flex: 2,
  backgroundColor: theme.palette.common.white,
}));
export const CharacteristicField = ({ characteristic, inputValue, errorShown, handleInputChange }: IItemFieldProps) => {
  return (
    <TextFieldBox>
      <TextFieldLabel variant="subtitle1">{characteristic.title + (characteristic.required ? ' *' : '')}</TextFieldLabel>
      {characteristic.type === AUTOCOMPLETE_TYPE && inputValue && (
        <StyledAutocomplete
          value={inputValue.value}
          onInputChange={(e, value) => handleInputChange(characteristic, value)}
          options={(characteristic as IAutocompleteDiamondCharacteristic).options}
          renderInput={(params) => (
            <TextField
              {...params}
              error={errorShown && !!inputValue?.errorText}
              helperText={errorShown && inputValue?.errorText}
              label={`Specify ${characteristic.title.toLowerCase()}`}
            />
          )}
        />
      )}
      {characteristic.type === NUMBER_TYPE && inputValue && (
        <StyledTextField
          type="number"
          label={`Specify ${characteristic.title.toLowerCase()}`}
          value={inputValue.value}
          error={errorShown && !!inputValue?.errorText}
          helperText={errorShown && inputValue?.errorText}
          inputProps={{
            step: (characteristic as INumericDiamondCharacteristic).step,
            min: (characteristic as INumericDiamondCharacteristic).minValue,
            max: (characteristic as INumericDiamondCharacteristic).maxValue,
          }}
          onChange={(e) => handleInputChange(characteristic, e.target.value)}
        />
      )}
    </TextFieldBox>
  );
};
