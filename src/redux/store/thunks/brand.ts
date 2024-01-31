import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from './resetSlice';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
  IRequest,
} from 'src/utils/axios';

export interface IAnalyticsForm extends IRequest {
  name: string;
  balance: number;
  // examples
}
export const fetchAllBrands = createAsyncThunk('brands/fetchAll', async () => {
  const response = await getRequest(endpoints.brand.list, defaultConfig());

  return response;
});
export const deleteBrand = createAsyncThunk('brands/delete', async (id: any) => {
  const response = await deleteRequest(`${endpoints.brand.search}/${id}`, defaultConfig());
  return response;
});
export const createBrand = createAsyncThunk('brands/create', async (data: any) => {
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.brand.search, data, headersObj);
  return response.data;
});
//

// export const fetchAnalyticsSummary = createAsyncThunk(
//   'analytics/fetchSummary',
//   async (analyticsId: number) => {
//     const response = await getRequest(
//       `${endpoints.analytic.summary}/${analyticsId}`,
//       defaultConfig()
//     );

//     return response.data;
//   }
// );

// export const fetchAnalyticsVouchers = createAsyncThunk(
//   'analytics/fetchVouchers',
//   async (data: IAnalyticsForm) => {
//     const response = await postRequest(endpoints.analytic.vouchers, data, defaultConfig());

//     return response.data;
//   }
// );

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    list: [],
    brand: null,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setBrands: (state, action: PayloadAction<any>) => {
      state.brand = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })
      .addCase(fetchAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setBrands } = analyticsSlice.actions;
export default analyticsSlice.reducer;
