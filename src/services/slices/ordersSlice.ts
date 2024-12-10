import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderSliceState = {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TOrderSliceState = {
  orders: [],
  orderRequest: false,
  orderModalRequest: false,
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

export const createOrderAction = createAsyncThunk(
  'orders/createOrder',
  async (ingredientsIds: string[]) => orderBurgerApi(ingredientsIds)
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
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
      state.orderModalRequest = true;
    });
    builder.addCase(fetchOrderByIdAction.fulfilled, (state, action) => {
      state.orderModalData = action.payload;
      state.orderModalRequest = false;
      state.error = null;
    });
    builder.addCase(fetchOrderByIdAction.rejected, (state, action) => {
      state.orderModalRequest = false;
      state.error = action.error.message ?? 'Ошибка получения заказа';
    });

    builder.addCase(createOrderAction.pending, (state) => {
      state.orderModalRequest = true;
    });
    builder.addCase(createOrderAction.fulfilled, (state, action) => {
      state.orders.push(action.payload.order);
      state.orderModalRequest = false;
      state.orderModalData = action.payload.order;
      state.error = null;
    });
    builder.addCase(createOrderAction.rejected, (state, action) => {
      state.orderModalRequest = false;
      state.error = action.error.message ?? 'Ошибка создания заказа';
    });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalRequest: (state) => state.orderModalRequest,
    selectOrderModalData: (state) => state.orderModalData
  }
});

export const {
  selectOrderModalData,
  selectOrderRequest,
  selectOrders,
  selectOrderModalRequest
} = ordersSlice.selectors;

export const { closeOrderModal } = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
export default ordersSlice;
