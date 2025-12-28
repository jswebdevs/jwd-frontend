import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const AdminRoot = () => {
    return (
        <div>
            <AdminMenu></AdminMenu>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminRoot;