import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import NestedFollowersView from 'src/views/github/NestedFollowersView';
import AuthCallbackView from 'src/views/auth/AuthCallback';

const routes = [
  {
    path: '/',
    element: <LoginView />
  },
  {
    path: 'auth',
    element: <AuthCallbackView />
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'nestedFollowers', element: <NestedFollowersView /> },
      { path: '/', element: <Navigate to="/app/nestedFollowers" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/404',
    element: <NotFoundView />
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  }
];

export default routes;
