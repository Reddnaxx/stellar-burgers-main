import {
  fetchIngredientsAction,
  fetchOrderByIdAction,
  selectIngredients,
  selectOrderModalData,
  selectOrderModalRequest
} from '@slices';
import { TIngredient } from '@utils-types';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui/preloader';

export const OrderInfo: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();

  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = useSelector(selectOrderModalData);
  const isLoading = useSelector(selectOrderModalRequest);

  const ingredients: TIngredient[] = useSelector(selectIngredients);

  useEffect(() => {
    const id = params.number;
    if (!id) return;
    dispatch(fetchOrderByIdAction(+id));
    dispatch(fetchIngredientsAction());
  }, [dispatch, params]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
