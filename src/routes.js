import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import StandUpNotesView from 'src/views/github/StandUpNotesView';
import AuthCallbackView from 'src/views/auth/AuthCallback';
import SettingsView from 'src/views/settings/SettingsView';

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
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'standups', element: <StandUpNotesView /> },
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
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
