import React from 'react';
import { NavLink } from 'react-router-dom';
import addIcon from '../assets/addCircle.svg';
import listIcon from '../assets/listOrder.svg';
import productIcon from '../assets/product.svg';
import userIcon from '../assets/user.svg';
import AddUserIcon from '../assets/addUser.svg';

export default function Sidebar() {
  const getActiveClass = ({ isActive }) =>
    isActive
      ? 'flex items-center gap-3 border border-gray-400 p-2 border-r-0 rounded-sm bg-orange-600 text-white'
      : 'flex items-center gap-3 border border-gray-400 p-2 border-r-0 rounded-sm';

  return (
    <div className='w-60 border-2 border-gray-300 border-t-0 min-h-screen'>
      <div className='p-10 pr-0 flex flex-col gap-5'>
        <NavLink to='/add' className={getActiveClass}>
          <img src={addIcon} alt="Add Icon" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/users/create' className={getActiveClass}>
          <img src={AddUserIcon} alt="Add User Icon"/>
          <p>Add Users</p>
        </NavLink>

        <NavLink to='/list' className={getActiveClass}>
          <img src={productIcon} alt="List Icon" />
          <p>Products</p>
        </NavLink>

        <NavLink to='/order' className={getActiveClass}>
          <img src={listIcon} alt="Order Icon" />
          <p>Orders</p>
        </NavLink>

        <NavLink to='/users' className={getActiveClass} end>
          <img src={userIcon} alt="User Icon"/>
          <p>Users</p>
        </NavLink>
      </div>
    </div>
  );
}
