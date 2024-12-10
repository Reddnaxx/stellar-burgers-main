import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  OrderInfoModal,
  withPrivateRoute
} from '@components';
import { selectIsAuth, tokenAction } from '@slices';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    const token = getCookie('accessToken');

    if (token && !isAuth) {
      dispatch(tokenAction());
    }
  });

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>
        <Route path='/login' element={withPrivateRoute(<Login />, true)} />
        <Route
          path='/register'
          element={withPrivateRoute(<Register />, true)}
        />
        <Route
          path='/forgot-password'
          element={withPrivateRoute(<ForgotPassword />, true)}
        />
        <Route
          path='/reset-password'
          element={withPrivateRoute(<ResetPassword />, true)}
        />
        <Route path='/profile'>
          <Route index element={withPrivateRoute(<Profile />)} />
          <Route path='orders'>
            <Route index element={withPrivateRoute(<ProfileOrders />)} />
            <Route path=':number' element={withPrivateRoute(<OrderInfo />)} />
          </Route>
        </Route>
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='' onClose={() => window.history.back()}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='/feed/:number' element={<OrderInfoModal />} />
          <Route
            path='/profile/orders/:number'
            element={withPrivateRoute(<OrderInfoModal />)}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
