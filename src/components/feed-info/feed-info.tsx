import { FC } from 'react';

import { selectFeed, selectFeedOrders } from '@slices';
import { Preloader } from '@ui';
import { TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const feed = useSelector(selectFeed);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  if (!feed) {
    return <Preloader />;
  }

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
