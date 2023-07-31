import { Box, CircularProgress, styled, Typography } from '@mui/material';
import React from 'react';
import { getSimilarProductsThunk } from '../store/modules/diamond/thunks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { IDiamondPriceData, ISimilarDiamondData } from '../store/modules/diamond/diamondSlice';
import { RootState } from '../store/modules/store';
import { BasicModal } from '../shared/Modal';
import { formatPrice } from './helper/price';

interface ISimilarProductsProps {
  cut: string;
  errorShown: boolean;
  formHasErrors: boolean;
}

const StyledCircularProgress = styled(CircularProgress)(() => ({
  display: 'flex',
  margin: '0 auto',
}));
const SimilarProductBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  margin: '10px 0',
  gap: '20px',
}));
const StyledImg = styled('img')(() => ({
  maxWidth: '100px',
  maxHeight: '100px',
  borderRadius: '10px',
}));
export const SimilarProducts = ({ cut, errorShown, formHasErrors }: ISimilarProductsProps) => {
  const dispatch = useAppDispatch();

  const priceData = useAppSelector<IDiamondPriceData | null>((state: RootState) => state.diamond.price.data);
  const priceLoading = useAppSelector<boolean>((state: RootState) => state.diamond.price.loading);
  const priceError = useAppSelector<string>((state: RootState) => state.diamond.price.error);
  const similarProductsData = useAppSelector<ISimilarDiamondData[]>((state: RootState) => state.diamond.similarProducts.data);
  const similarProductsLoading = useAppSelector<boolean>((state: RootState) => state.diamond.similarProducts.loading);
  const similarProductsError = useAppSelector<string>((state: RootState) => state.diamond.similarProducts.error);

  const displaySimilar = () => {
    if (cut && priceData?.price) {
      dispatch(getSimilarProductsThunk({ cut: cut.toLowerCase(), budget: priceData?.price }));
    }
  };

  return (
    <BasicModal
      buttonContent={<Typography>Display similar products</Typography>}
      buttonCB={displaySimilar}
      buttonProps={{
        variant: 'contained',
        color: 'primary',
        disabled: (errorShown && formHasErrors) || priceLoading || similarProductsLoading || !!priceError,
        endIcon: similarProductsLoading && <CircularProgress size={20} />,
      }}
    >
      <>
        {similarProductsLoading && <StyledCircularProgress size={20} />}
        {similarProductsError && <Typography color="error">{similarProductsError}</Typography>}
        {similarProductsData.map((product) => (
          <SimilarProductBox key={product.id}>
            <StyledImg src={product.imgUrl} alt="Product placeholder" />
            <Box>
              <Typography variant="h6">Price: {formatPrice(product.price)}</Typography>
              <Typography variant="h6">Carat: {product.carat}</Typography>
              <Typography variant="h6">Clarity: {product.clarity}</Typography>
            </Box>
          </SimilarProductBox>
        ))}
      </>
    </BasicModal>
  );
};
