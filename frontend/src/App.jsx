import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useTheme from "./hooks/useTheme";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  let { isDark } = useTheme();

  useEffect(() => {
    let body = document.body;
    if(isDark) {
      body.classList.add('bg-dbg')
    }
    else {
      body.classList.remove('bg-dbg')
    }
  }, [isDark])

  return (
    <div  className={`w-full flex flex-col min-h-screen  ${isDark ? 'bg-dbg' : 'bg-white'}`}>
      <ToastContainer />
      <Navbar/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </div>

  )
}

export default App;
