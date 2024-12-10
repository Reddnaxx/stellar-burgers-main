import { getFeedsApi } from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TFeed } from '@utils-types';

type TFeedSliceState = {
  feed: TFeed | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedSliceState = {
  feed: null,
  isLoading: false,
  error: null
};

export const fetchFeedAction = createAsyncThunk(
  'feed/fetchFeed',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeedAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFeedAction.fulfilled, (state, action) => {
      state.feed = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchFeedAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Ошибка получения заказов';
    });
  },
  selectors: {
    selectFeed: (state) => state.feed,
    selectFeedLoading: (state) => state.isLoading,
    selectFeedError: (state) => state.error
  }
});

export const { selectFeed, selectFeedLoading, selectFeedError } =
  feedSlice.selectors;

export const selectFeedOrders = createSelector(
  [selectFeed],
  (feed) => feed?.orders ?? []
);

export const feedReducer = feedSlice.reducer;

export default feedSlice;
