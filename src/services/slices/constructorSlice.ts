import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TConstructorItems,
  TIngredient
} from '@utils-types';

type TConstructorSliceState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorSliceState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = { ...action.payload, id: action.payload._id };

      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== action.payload
      );
    },
    swapIngredient: (
      state,
      action: PayloadAction<{ first: number; second: number }>
    ) => {
      const { first, second } = action.payload;
      const temp = state.ingredients[first];
      state.ingredients[first] = state.ingredients[second];
      state.ingredients[second] = temp;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectConstructorBun: (state) => state.bun,
    selectConstructorIngredients: (state) => state.ingredients
  }
});

export const { selectConstructorBun, selectConstructorIngredients } =
  constructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  swapIngredient,
  clearConstructor
} = constructorSlice.actions;

export const selectConstructorItems = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients) =>
    ({
      bun,
      ingredients
    }) as TConstructorItems
);

export const constructorReducer = constructorSlice.reducer;

export default constructorSlice.reducer;
