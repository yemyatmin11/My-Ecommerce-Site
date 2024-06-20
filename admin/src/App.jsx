
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
