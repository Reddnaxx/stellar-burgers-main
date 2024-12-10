import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info/order-info';

export const OrderInfoModal: FC = memo(() => {
  const params = useParams();

  const onClose = () => {
    window.history.back();
  };

  return (
    <Modal title={`#${params.number ?? ''}`} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
});
