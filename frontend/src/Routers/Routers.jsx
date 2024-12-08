import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminRoute } from './AdminRoute';
import { CustomerRouter } from './CustomerRouter';

export const Routers = () => {
    return (
        <Routes>
            <Route path="/admin/restaurants/*" element={<AdminRoute />} />
            <Route path="/*" element={<CustomerRouter />} />
        </Routes>
    )
}