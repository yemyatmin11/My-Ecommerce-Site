import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeContextProvider } from './contexts/ThemeContext.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import Routes from './routes/index.jsx';
import { CartContextProvider } from './contexts/CartContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <AuthContextProvider>
    <ThemeContextProvider>
      <CartContextProvider>
        <Routes/>
      </CartContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
  
)
