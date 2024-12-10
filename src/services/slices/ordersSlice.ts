import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderSliceState = {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TOrderSliceState = {
  orders: [],
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const fetchOrdersAction = createAsyncThunk(
  'orders/fetchOrders',
  async () => getOrdersApi()
);

export const fetchOrderByIdAction = createAsyncThunk(
  'orders/fetchOrderById',
  async (id: number) => (await getOrderByNumberApi(id)).orders[0]
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersAction.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(fetchOrdersAction.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.orderRequest = false;
      state.error = null;
    });
    builder.addCase(fetchOrdersAction.rejected, (state, action) => {
      state.orderRequest = false;
      state.error = action.error.message ?? 'Ошибка получения заказов';
    });
    builder.addCase(fetchOrderByIdAction.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(fetchOrderByIdAction.fulfilled, (state, action) => {
      state.orderModalData = action.payload;
      state.orderRequest = false;
      state.error = null;
    });
    builder.addCase(fetchOrderByIdAction.rejected, (state, action) => {
      state.orderRequest = false;
      state.error = action.error.message ?? 'Ошибка получения заказа';
    });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  }
});

export const { selectOrderModalData, selectOrderRequest, selectOrders } =
  ordersSlice.selectors;

export const ordersReducer = ordersSlice.reducer;
export default ordersSlice;
