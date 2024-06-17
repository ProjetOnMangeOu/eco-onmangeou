import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/inter';
import './assets/styles/index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { ErrorPage } from './pages/ErrorPage';
import Layout from './components/Layout';
import Session from './pages/Session';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/session",
        element: <Session />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
