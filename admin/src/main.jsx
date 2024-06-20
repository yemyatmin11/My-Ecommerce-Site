import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Add from './pages/Add.jsx';
import List from './pages/List.jsx';
import Order from './pages/Order.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import User from './pages/User.jsx';
import AddUser from './pages/AddUser.jsx';

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : '/add',
        element : <Add/>
      },
      {
        path : "/list/products/edit/:id",
        element : <Add/>
      },
      {
        path : "/users/create",
        element : <AddUser/>
      },
      {
        path : "/users/edit/:id",
        element : <AddUser/>
      },
      {
        path : '/list',
        element : <List/>
      },
      {
        path : '/order',
        element : <Order/>
      },
      {
        path : '/users',
        element : <User/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)
