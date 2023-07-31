import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculatePriceThunk, getSimilarProductsThunk } from './thunks';
import { IErrorResponseData } from '../../../types/error';

interface IDiamondState {
  price: {
    loading: boolean;
    data: IDiamondPriceData | null;
    error: string;
  };
  similarProducts: {
    loading: boolean;
    data: ISimilarDiamondData[];
    error: string;
  };
}
const initialState: IDiamondState = {
  price: {
    loading: false,
    data: null,
    error: '',
  },
  similarProducts: {
    loading: false,
    data: [],
    error: '',
  },
};

export interface IDiamondPriceData {
  price: number;
  min: number;
  max: number;
  avg: number;
  count: number;
}

export interface ISimilarDiamondData {
  id: string;
  shape: string;
  price: number;
  carat: string;
  clarity: string;
  imgUrl: string;
}

export const diamondSlice = createSlice({
  name: 'diamond',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IDiamondState>) => {
    builder.addCase(calculatePriceThunk.pending, (state: IDiamondState) => {
      state.price.loading = true;
      state.price.error = '';
      state.price.data = null;
    });
    builder.addCase(calculatePriceThunk.fulfilled, (state: IDiamondState, { payload }: PayloadAction<IDiamondPriceData>) => {
      state.price.loading = false;
      state.price.data = payload;
    });
    builder.addCase(calculatePriceThunk.rejected, (state: IDiamondState, { payload }) => {
      const errorResponseData = payload as IErrorResponseData;
      state.price.loading = false;
      state.price.error = errorResponseData?.message ?? 'Something went wrong, please try again later';
    });
    builder.addCase(getSimilarProductsThunk.pending, (state: IDiamondState) => {
      state.similarProducts.loading = true;
      state.similarProducts.error = '';
      state.similarProducts.data = [];
    });
    builder.addCase(getSimilarProductsThunk.fulfilled, (state: IDiamondState, { payload }: PayloadAction<ISimilarDiamondData[]>) => {
      state.similarProducts.loading = false;
      state.similarProducts.data = payload;
    });
    builder.addCase(getSimilarProductsThunk.rejected, (state: IDiamondState, { payload }) => {
      const errorResponseData = payload as IErrorResponseData;
      state.similarProducts.loading = false;
      state.similarProducts.error = errorResponseData?.message ?? 'Something went wrong, please try again later';
    });
  },
});

export default diamondSlice.reducer;
