import {
  fetchFeedAction,
  fetchIngredientsAction,
  selectFeedOrders
} from '@slices';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const dispatch = useDispatch();

  const getFeeds = () => {
    dispatch(fetchFeedAction());
    dispatch(fetchIngredientsAction());
  };

  useEffect(() => {
    getFeeds();
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
