import { removeIngredient, swapIngredient } from '@slices';
import { BurgerConstructorElementUI } from '@ui';
import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(swapIngredient({ first: index, second: index + 1 }));
    };

    const handleMoveUp = () => {
      dispatch(swapIngredient({ first: index, second: index - 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
