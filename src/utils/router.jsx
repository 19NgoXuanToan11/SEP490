import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Profile from "../pages/Profile";
import Message from "../pages/Message";
import Cart from "../pages/Cart";
import Exchange from "../pages/Exchange";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ProductForm from "../components/product/ProductForm";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import AdminUsers from "../pages/admin/Users";
import AdminExchanges from "../pages/admin/Exchanges";
import AdminSettings from "../pages/admin/Settings";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Authentication Routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Product Routes */}
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/products/new" element={<ProductForm />} />
      <Route
        path="/products/edit/:id"
        element={<ProductForm editMode={true} />}
      />

      {/* User Routes */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/messages" element={<Message />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/exchange" element={<Exchange />} />
      <Route path="/exchange/:id" element={<Exchange />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/exchanges" element={<AdminExchanges />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  );
};

export default AppRouter;
