import {
  fetchFeedAction,
  fetchIngredientsAction,
  selectFeedLoading,
  selectFeedOrders
} from '@slices';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const dispatch = useDispatch();

  const getFeeds = () => {
    dispatch(fetchFeedAction());
    dispatch(fetchIngredientsAction());
  };

  useEffect(() => {
    if (!orders.length) {
      getFeeds();
    }
  }, []);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
