import { selectIsAuth, selectIsAuthLoading } from '@slices';
import { Preloader } from '@ui';
import { FC, memo, PropsWithChildren, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type TPrivateRouteProps = {
  toBeUnAuth?: boolean;
};

export const PrivateRoute: FC<PropsWithChildren<TPrivateRouteProps>> = memo(
  ({ toBeUnAuth, children }) => {
    const isAuth = useSelector(selectIsAuth);
    const isLoading = useSelector(selectIsAuthLoading);
    const location = useLocation();

    if (isLoading) {
      return <Preloader />;
    }

    if (isAuth && toBeUnAuth) {
      return <Navigate to={location.state ?? '/'} />;
    } else if (!isAuth && toBeUnAuth) {
      return children;
    }

    return isAuth && !toBeUnAuth ? (
      children
    ) : (
      <Navigate replace to='/login' state={location} />
    );
  }
);

export const withPrivateRoute = (
  Component: ReactNode,
  toBeUnAuth?: boolean
) => <PrivateRoute toBeUnAuth={toBeUnAuth}>{Component}</PrivateRoute>;
