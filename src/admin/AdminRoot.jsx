import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import AdminDashboard from './AdminDashboard';

const AdminRoot = () => {
    return (
        <div className='flex'>
            <AdminMenu></AdminMenu>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminRoot;