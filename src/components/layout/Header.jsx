import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu as MenuIcon,
  Close as XIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Mail as MailIcon,
  Notifications as BellIcon,
  Person as UserCircleIcon,
  Home as HomeIcon,
  Info as InformationCircleIcon,
  ContactSupport as SupportIcon,
  Logout as LogoutIcon,
  Settings as CogIcon,
  Dashboard as ViewGridIcon,
  CompareArrows as SwitchHorizontalIcon,
  ArrowDropDown as ChevronDownIcon,
  DarkMode as MoonIcon,
  LightMode as SunIcon,
  Category,
  Favorite as HeartIcon,
  Person as UserOutlined,
  Badge,
} from "@mui/icons-material";
import logo from "../../assets/pictures/logo/original.png";
import UserDropdown from "../auth/UserDropdown";
import { Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useChat } from "../../context/ChatContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const userMenuOpen = Boolean(userMenuAnchorEl);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Thay thế bằng trạng thái xác thực thực tế
  const isLoggedIn = true;
  const isAdmin = true;

  // Giả lập số lượng giỏ hàng và wishlist
  const cartQuantity = 3;
  const wishlistTotal = 5;

  // Get wishlist items from Redux store
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const { unreadCount } = useChat();

  useEffect(() => {
    // Debounce scroll handler để tránh gọi quá nhiều lần
    let timeoutId = null;
    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const offset = window.scrollY;
        if (offset > 20) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }, 50); // Chỉ cập nhật sau 50ms kể từ lần scroll cuối cùng
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Đóng drawer khi đường dẫn thay đổi
    setDrawerOpen(false);
  }, [location.pathname]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery("");
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Trigger logout event for other tabs
    const logoutEvent = new Date().getTime();
    localStorage.setItem("logout_event", logoutEvent);

    console.log("Logging out...");
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Thêm logic chuyển đổi theme ở đây
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const closeUserDropdown = () => {
    setUserDropdownOpen(false);
  };

  const menuItems = [
    { text: "Home", path: "/", icon: HomeIcon },
    { text: "Products", path: "/products", icon: Category },
    { text: "Exchange", path: "/exchange", icon: SwitchHorizontalIcon },
    { text: "Messages", path: "/messages", icon: MailIcon },
    // { text: "About", path: "/about", icon: InformationCircleIcon },
    // { text: "Contact", path: "/contact", icon: SupportIcon },
  ];

  // NavLink Component với animation tinh tế
  const NavLink = ({ to, icon: Icon, text }) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className="flex flex-col items-center text-gray-600 hover:text-gray-900 px-4 py-2 
                  relative group transition-colors duration-300 text-center whitespace-nowrap"
      >
        <span
          className={`flex items-center justify-center w-6 h-6 mb-1.5 ${
            isActive
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-gray-500 dark:text-gray-400"
          } group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300`}
        >
          <Icon className="text-xl" />
        </span>
        <span
          className={`text-base font-medium ${
            isActive
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-gray-700 dark:text-gray-300"
          } group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300`}
        >
          {text}
        </span>
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400
                     transform ${
                       isActive ? "scale-x-100" : "scale-x-0"
                     } group-hover:scale-x-100 
                     transition-transform duration-300 origin-left`}
        ></span>
      </Link>
    );
  };

  return (
    <>
      {/* Header chính */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100/50 dark:border-gray-800/50 shadow-sm h-[80px]"
            : "bg-white dark:bg-gray-900 h-[120px]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo và Brand */}
            <div className="flex-shrink-0 flex items-center transition-transform duration-300 hover:opacity-80 w-1/4">
              <Link to="/" className="flex items-center">
                <img
                  className={`transition-all duration-300 ${
                    scrolled ? "h-14 w-auto" : "h-20 w-auto"
                  }`}
                  src={logo || "https://via.placeholder.com/40?text=RT"}
                  alt="ReTech Logo"
                />
                <span
                  className={`ml-2 text-2xl font-bold transition-all duration-300 ${
                    scrolled
                      ? "text-gray-800 dark:text-white"
                      : "text-gray-800 dark:text-white"
                  } hidden sm:block`}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                    Re
                  </span>
                  <span className="text-gray-800 dark:text-white">Tech</span>
                </span>
              </Link>
            </div>

            {/* Menu trên desktop - Điều chỉnh để chiếm không gian giữa */}
            <div className="hidden md:flex items-center justify-center flex-1 w-2/4">
              {/* Menu items - Điều chỉnh space-x và justify-content */}
              <nav className="flex space-x-16 justify-center w-full">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.text}
                    to={item.path}
                    icon={item.icon}
                    text={item.text}
                  />
                ))}
              </nav>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={toggleSearch}
                className={`p-2 rounded-full ${
                  scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition-colors duration-300`}
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Right section - Điều chỉnh để chiếm không gian bên phải */}
            <div className="flex items-center justify-end space-x-4 w-1/4">
              {isLoggedIn ? (
                <>
                  {/* Wishlist icon */}
                  <Link
                    to="/wishlist"
                    className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                  >
                    <HeartIcon className="h-6 w-6" />
                    {wishlistItems.length > 0 && (
                      <span
                        className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 text-white 
                                   text-xs rounded-full flex items-center justify-center"
                      >
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>

                  {/* Cart */}
                  <Link
                    to="/cart"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700
                        rounded-lg hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 group"
                  >
                    <ShoppingCartIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
                    <span className="font-medium text-sm whitespace-nowrap group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      Cart
                    </span>
                    {cartQuantity > 0 && (
                      <span
                        className="flex items-center justify-center w-5 h-5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400
                            text-xs font-semibold rounded-full group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors duration-300"
                      >
                        {cartQuantity}
                      </span>
                    )}
                  </Link>

                  {/* User profile button - Thay đổi để mở UserDropdown */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleUserDropdown}
                    className="relative flex items-center p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-medium">
                      {localStorage.getItem("user")
                        ? JSON.parse(
                            localStorage.getItem("user")
                          )?.name?.charAt(0) ||
                          JSON.parse(
                            localStorage.getItem("user")
                          )?.email?.charAt(0) ||
                          "U"
                        : "U"}
                    </div>
                  </motion.button>

                  {/* UserDropdown component */}
                  <UserDropdown
                    open={userDropdownOpen}
                    onClose={closeUserDropdown}
                  />
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                >
                  <UserOutlined />
                  <span>Đăng nhập</span>
                </motion.button>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={toggleDrawer}
                className={`md:hidden p-2 rounded-full ${
                  scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition-colors duration-300`}
              >
                <span className="sr-only">Open main menu</span>
                {drawerOpen ? (
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="fixed top-[80px] left-0 right-0 z-40 bg-white dark:bg-gray-900 shadow-lg p-3 rounded-b-xl transform transition-transform duration-300 ease-out">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <SearchIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400 ml-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="ml-2 flex-grow bg-transparent border-none outline-none text-gray-800 dark:text-white"
              autoFocus
            />
            <button
              type="button"
              onClick={toggleSearch}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <diva
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
            onClick={toggleDrawer}
          />

          {/* Drawer panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-900 shadow-xl transform transition-all duration-300 ease-out rounded-r-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src={logo || "https://via.placeholder.com/40?text=RT"}
                  alt="ReTech Logo"
                />
                <span className="ml-2 text-xl font-bold text-white">
                  ReTech
                </span>
              </div>
              <button
                type="button"
                onClick={toggleDrawer}
                className="rounded-md p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pt-2 pb-4">
              <div className="px-2 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.text}
                      to={item.path}
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-lg relative group overflow-hidden ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                      } transition-colors duration-300`}
                    >
                      {isActive && (
                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-opacity duration-300"></span>
                      )}
                      <span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400
                                      transform scale-x-0 group-hover:scale-x-100 
                                      transition-transform duration-300 origin-left"
                      ></span>
                      <Icon
                        className={`mr-4 h-6 w-6 flex-shrink-0 relative z-10 ${
                          isActive
                            ? "text-white"
                            : "text-indigo-500 dark:text-indigo-400"
                        } group-hover:scale-110 transition-all duration-300`}
                      />
                      <span className="relative z-10">{item.text}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="px-2 space-y-1">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 group transition-colors duration-300"
                      >
                        <UserCircleIcon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                        Profile
                      </Link>
                      <Link
                        to="/cart"
                        className="flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 group transition-colors duration-300"
                      >
                        <div className="relative mr-4">
                          <ShoppingCartIcon className="h-6 w-6 flex-shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full">
                            {cartQuantity}
                          </span>
                        </div>
                        Cart
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 group transition-colors duration-300"
                      >
                        <div className="relative mr-4">
                          <HeartIcon className="h-6 w-6 flex-shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full">
                            {wishlistItems.length}
                          </span>
                        </div>
                        Wishlist
                      </Link>
                      <Link
                        to="/messages"
                        className="flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 group transition-colors duration-300"
                      >
                        <div className="relative mr-4">
                          <Badge badgeContent={unreadCount} color="error">
                            <MailIcon className="h-6 w-6 flex-shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                          </Badge>
                        </div>
                        Messages
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 group transition-colors duration-300"
                        >
                          <ViewGridIcon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={toggleDarkMode}
                        className="flex w-full items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 group transition-colors duration-300"
                      >
                        {darkMode ? (
                          <SunIcon className="mr-4 h-6 w-6 flex-shrink-0 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                        ) : (
                          <MoonIcon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                        )}
                        {darkMode ? "Light Mode" : "Dark Mode"}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400 group transition-colors duration-300"
                      >
                        <LogoutIcon className="mr-4 h-6 w-6 flex-shrink-0 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform duration-300" />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 group transition-colors duration-300"
                      >
                        <UserCircleIcon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 group transition-colors duration-300"
                      >
                        <UserCircleIcon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer để tránh nội dung bị che bởi header */}
      <div
        className={`transition-all duration-500 ${
          scrolled ? "h-[80px]" : "h-[120px]"
        }`}
      ></div>
    </>
  );
};

export default Header;
