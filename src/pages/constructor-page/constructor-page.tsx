import { useDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import {
  fetchIngredientsAction,
  selectIngredients,
  selectIsIngredientsLoading
} from '@slices';
import { FC, useEffect } from 'react';
import { BurgerConstructor, BurgerIngredients } from '../../components';
import { Preloader } from '../../components/ui';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(selectIsIngredientsLoading);
  const ingredients = useSelector(selectIngredients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredientsAction());
    }
  }, [ingredients]);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
