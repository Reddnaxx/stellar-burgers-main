import { fetchIngredientsAction, selectIngredients } from '@slices';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredients = useSelector(selectIngredients);
  const ingredientData = useMemo(
    () => ingredients.find((i) => i._id === params.id),
    [ingredients]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredientsAction());
    }
  }, [ingredients]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
