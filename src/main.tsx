import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import RootLayout from './routes/RootLayout';
import ErrorPage from './routes/ErrorPage';
import ZustandPage from './routes/ZustandPage';
import ReactContextPage from './routes/ReactContextPage';
import RootPage from './routes/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <RootPage />,
      },
      {
        path: 'zustand',
        element: <ZustandPage />,
      },
      {
        path: 'react-context',
        element: <ReactContextPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
