import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Loading from '../pages/common/Loading.component';
import { Auth, selectAuth } from '../store/authReducer';

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth: Auth = useSelector(selectAuth);

  if (!auth.logged) {
    if (auth.isLoading) {
      return <Loading />;
    }
    return <Login />;
  }

  return <React.Suspense fallback={<Loading />}>{children}</React.Suspense>;
}

const Login = React.lazy(() => import('../pages/auth/Login.component'));
const Home = React.lazy(() => import('../pages/home/Home.component'));

function RootRouter() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="*"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default RootRouter;
