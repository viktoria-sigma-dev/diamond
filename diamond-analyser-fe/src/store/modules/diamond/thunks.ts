import { createAsyncThunk } from '@reduxjs/toolkit';
import { moduleName } from './constants';
import diamond from '../../../api/diamond';
import { IDiamondCharacteristicRequestData, ISimilarDiamondsRequestData } from '../../../types/diamond-characteristics';
import { IErrorResponse } from '../../../types/error';

export const calculatePriceThunk = createAsyncThunk(`${moduleName}/calculatePrice`, async (data: IDiamondCharacteristicRequestData, { rejectWithValue }) => {
  try {
    const response = await diamond.calculate(data);
    return response;
  } catch (err: unknown) {
    const error = err as IErrorResponse;
    return rejectWithValue(error.response.data);
  }
});

export const getSimilarProductsThunk = createAsyncThunk(`${moduleName}/getSimilarProducts`, async (data: ISimilarDiamondsRequestData, { rejectWithValue }) => {
  try {
    const response = await diamond.getSimilar(data);
    return response;
  } catch (err: unknown) {
    const error = err as IErrorResponse;
    return rejectWithValue(error.response.data);
  }
});
