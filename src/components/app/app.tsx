import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
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
  OrderInfoModal
} from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />}>
          <Route path='orders' element={<ProfileOrders />}>
            <Route path=':number' element={<OrderInfo />} />
          </Route>
        </Route>
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
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
          <Route path='/profile/orders/:number' element={<OrderInfoModal />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
