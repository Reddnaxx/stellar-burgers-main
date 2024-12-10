import {
  clearConstructor,
  closeOrderModal as closeModal,
  createOrderAction,
  selectConstructorItems,
  selectIsAuth,
  selectOrderModalData,
  selectOrderModalRequest
} from '@slices';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderModalRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      navigate('/login');
    }

    dispatch(
      createOrderAction([
        constructorItems.bun.id,
        ...constructorItems.ingredients.map((v) => v.id)
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(closeModal());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
