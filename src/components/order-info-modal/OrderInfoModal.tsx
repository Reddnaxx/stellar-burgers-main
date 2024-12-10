import { closeOrderModal } from '@slices';
import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info/order-info';

export const OrderInfoModal: FC = memo(() => {
  const params = useParams();
  const dispatch = useDispatch();

  const onClose = () => {
    window.history.back();
    dispatch(closeOrderModal());
  };

  return (
    <Modal title={`#${params.number ?? ''}`} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
});
