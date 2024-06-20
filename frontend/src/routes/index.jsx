import React, { useContext } from 'react';
import App from '../App.jsx';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import '../index.css';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import ProductForm from '../pages/ProductForm.jsx';
import SignUpForm from '../pages/SignUpForm.jsx';
import SignInForm from '../pages/SignInForm.jsx';
import ProductDetails from '../pages/ProductDetails.jsx';
import CartPage from '../pages/CartPage.jsx';
import SearchResults from '../pages/SearchResults.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import UserProfile from '../pages/UserProfile.jsx';
import UserForm from '../pages/UserForm.jsx';
import PlaceOrder from '../pages/PlaceOrder.jsx';
import Verify from '../pages/Verify.jsx';
import MyOrders from '../pages/MyOrders.jsx';
import NotFound from '../pages/NotFound.jsx';

export default function Index() {

  let { user } = useContext(AuthContext)

  const router = createBrowserRouter([
    {
      path : "/",
      element : <App/>,
      children : [
        {
          path : "",
          element : user ? <Home/> : <Navigate to={'/sign-in'}/> // localhost:4000
        },
        {
          path : "/search/:term",
          element : user ? <SearchResults/> : <Navigate to={'/sign-in'}/>  // localhost:4000/search/:term
        },
        {
          path : "/about",
          element : <About/> // localhost:4000/about
        },
        {
          path : "/contact",
          element : <Contact/> // localhost:4000/contact
        },
        {
          path : "/profile/:id",
          element : <UserProfile/> // localhost:4000/profile/:id
        },
        {
          path : "/users/edit/:id",
          element : <UserForm/> // localhost:4000/profile/:id
        },
        {
          path : "/cart",
          element : user ? <CartPage/> : <Navigate to={'/'}/> // localhost:4000/cart
        },
        {
          path : "/order",
          element : <PlaceOrder/> // localhost:4000/order
        },
        {
          path : "/verify",
          element : <Verify/> // localhost:4000/verify
        },
        {
          path : "/myorders",
          element : <MyOrders/> // localhost:4000/myorders
        },
        {
          path : "/products/:id",
          element : <ProductDetails/> // localhost:4000/products/:id
        },
        {
          path : "/products/create",
          element : user ? <ProductForm/> : <Navigate to={'/sign-in'}/>// localhost:4000/products/create
        },
        {
          path : "/products/edit/:id",
          element : <ProductForm/> // localhost:4000/products/edit
        },
        {
          path : "/sign-up",
          element : !user ? <SignUpForm/> : <Navigate to={'/'}/> // localhost:4000/sign-up
        },
        {
          path : "/sign-in",
          element : !user ? <SignInForm/> : <Navigate to={'/'}/>  // localhost:4000/sign-in
        },
        {
          path : "*",
          element : <NotFound/> // localhost:4000/NotFound
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}
