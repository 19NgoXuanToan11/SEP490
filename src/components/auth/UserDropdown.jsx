import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Person as UserOutlined,
  Logout as LogoutOutlined,
  ShoppingBag as ShoppingOutlined,
  Favorite as HeartOutlined,
  Settings as SettingOutlined,
  Dashboard as ViewGridIcon,
  History as HistoryOutlined,
} from "@mui/icons-material";

const UserDropdown = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "User",
    email: "user@example.com",
    avatar: null,
  });

  // Kiểm tra vai trò admin
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch user info from localStorage on mount
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUserInfo({
          name: userData.name || userData.email?.split("@")[0] || "User",
          email: userData.email || "user@example.com",
          avatar: userData.avatar || null,
        });

        // Kiểm tra vai trò admin
        setIsAdmin(userData.isAdmin || false);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === "logout_event" || e.key === null) {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          try {
            const userData = JSON.parse(userStr);
            setUserInfo({
              name: userData.name || userData.email?.split("@")[0] || "User",
              email: userData.email || "user@example.com",
              avatar: userData.avatar || null,
            });
            setIsAdmin(userData.isAdmin || false);
          } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Split name into parts for avatar
  const nameParts = userInfo.name.split(" ");
  const firstName = nameParts[0] || "";

  const menuItems = [
    {
      icon: <UserOutlined />,
      label: "Profile",
      path: "/profile",
    },
    {
      icon: <ShoppingOutlined />,
      label: "Orders",
      path: "/orders",
    },
    {
      icon: <HistoryOutlined />,
      label: "Exchange History",
      path: "/exchange-history",
    },
  ];

  // Thêm tùy chọn Admin Dashboard nếu là admin
  if (isAdmin) {
    menuItems.push({
      icon: <ViewGridIcon />,
      label: "Admin Dashboard",
      path: "/admin",
    });
  }

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Trigger logout event for other tabs
    const logoutEvent = new Date().getTime();
    localStorage.setItem("logout_event", logoutEvent);

    onClose && onClose();
    navigate("/");
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" onClick={onClose}>
          <div
            className="absolute right-0 top-[72px] mr-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden w-[280px] border border-gray-100 dark:border-gray-700"
            >
              {/* User Info Section */}
              <div className="p-4 bg-gradient-to-r from-indigo-600 to-blue-500">
                <div className="flex items-center space-x-3">
                  {userInfo.avatar ? (
                    <img
                      src={userInfo.avatar}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-600 text-xl font-bold">
                      {firstName.charAt(0) || "U"}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {userInfo.name}
                    </h4>
                    <p className="text-xs text-indigo-100">{userInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <button
                      onClick={() => {
                        navigate(item.path);
                        onClose && onClose();
                      }}
                      className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 
                        hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <span
                        className="w-9 h-9 flex items-center justify-center rounded-full 
                        bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 mr-3"
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 dark:bg-gray-700 mx-4"></div>

              {/* Logout Button */}
              <div className="py-2">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * (menuItems.length + 1) }}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-red-600 dark:text-red-400
                      hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
                  >
                    <span
                      className="w-9 h-9 flex items-center justify-center rounded-full 
                      bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 mr-3"
                    >
                      <LogoutOutlined />
                    </span>
                    <span className="font-medium">Đăng xuất</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserDropdown;
