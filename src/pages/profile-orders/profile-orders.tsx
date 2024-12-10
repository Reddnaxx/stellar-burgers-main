import { fetchOrdersAction, selectOrderRequest, selectOrders } from '@slices';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const isLoading = useSelector(selectOrderRequest);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
