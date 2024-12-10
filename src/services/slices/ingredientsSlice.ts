import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsSliceState = {
  ingredients: TIngredient[];
  ingredientsModalData: TIngredient | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsSliceState = {
  ingredients: [],
  ingredientsModalData: null,
  isLoading: false,
  error: null
};

export const fetchIngredientsAction = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredientsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIngredientsAction.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchIngredientsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Ошибка загрузки ингредиентов';
    });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectMainsIngredients: (state) =>
      state.ingredients.filter((item) => item.type === 'main'),
    selectSaucesIngredients: (state) =>
      state.ingredients.filter((item) => item.type === 'sauce'),
    selectIsIngredientsLoading: (state) => state.isLoading,
    selectIngredientsError: (state) => state.error
  }
});

export const selectBunsIngredients = createSelector(
  [ingredientsSlice.selectors.selectIngredients],
  (ingredients) => ingredients.filter((item) => item.type === 'bun')
);

export const selectMainsIngredients = createSelector(
  [ingredientsSlice.selectors.selectIngredients],
  (ingredients) => ingredients.filter((item) => item.type === 'main')
);

export const selectSaucesIngredients = createSelector(
  [ingredientsSlice.selectors.selectIngredients],
  (ingredients) => ingredients.filter((item) => item.type === 'sauce')
);

export const {
  selectIngredients,
  selectIngredientsError,
  selectIsIngredientsLoading
} = ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;

export default ingredientsSlice.reducer;
