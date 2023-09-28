import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DeliveriesPage from './components/deliveries/deliveriesPage';
import UserProvider from './components/context/userContext';
import axios from 'axios';
import LoginPage from './components/login/loginPage';
import SignupPage from './components/signup/signupPage';
import StatisticsPage from './components/statistics/statisticsPage';
import RestaurantPage from './components/restaurants/restaurantsPage';
import DeliveryDetails from './components/deliveries/deliveryDetails';
import HomePage from './components/homepage/homepage';
import Notification from './components/notification/notification';


axios.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/deliveries',
        element: <DeliveriesPage />
      },
      {
        path:'/deliveries/:deliveryId',
        element: <DeliveryDetails />

      },
      {
        path: '/statistics',
        element: <StatisticsPage />
      },
      {
        path: '/restaurant',
        element: <RestaurantPage />
      }
    ]
  }, 
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Notification>
  <UserProvider>
<RouterProvider router={router} />
  </UserProvider>
  </Notification>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();