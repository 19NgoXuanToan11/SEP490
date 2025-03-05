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
} from "@mui/icons-material";
import logo from "../../assets/pictures/logo/original.png";

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

  // Thay thế bằng trạng thái xác thực thực tế
  const isLoggedIn = true;
  const isAdmin = true;

  // Giả lập số lượng giỏ hàng và wishlist
  const cartQuantity = 3;
  const wishlistTotal = 5;

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    // Xử lý logic đăng xuất ở đây
    console.log("Logging out...");
    setProfileMenuOpen(false);
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

  const menuItems = [
    { text: "Home", path: "/", icon: HomeIcon },
    { text: "Products", path: "/products", icon: Category },
    { text: "Exchange", path: "/exchange", icon: SwitchHorizontalIcon },
    { text: "About", path: "/about", icon: InformationCircleIcon },
    { text: "Contact", path: "/contact", icon: SupportIcon },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full ml-24">
          <div className="flex items-center justify-between h-full">
            {/* Logo và Brand */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center transition-transform duration-300 hover:opacity-80"
            >
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

            {/* Menu trên desktop */}
            <div className="hidden md:flex items-center justify-center flex-1 px-8">
              {/* Thanh tìm kiếm */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative mr-8 flex-grow max-w-md"
              >
                <div
                  className={`flex items-center rounded-full transition-all duration-300 ${
                    searchFocused
                      ? "ring-2 ring-indigo-500 dark:ring-indigo-400"
                      : ""
                  } ${
                    scrolled
                      ? "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      : "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  } px-4 py-2`}
                >
                  <SearchIcon
                    className={`h-5 w-5 ${
                      searchFocused
                        ? "text-indigo-500 dark:text-indigo-400"
                        : "text-gray-500 dark:text-gray-400"
                    } transition-colors duration-300`}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`ml-2 bg-transparent border-none outline-none flex-grow ${
                      scrolled
                        ? "text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        : "text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    } transition-colors duration-300`}
                  />
                </div>
              </form>

              {/* Menu items */}
              <nav className="flex space-x-6 justify-center">
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

            {/* Right section */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {/* Cart, Wishlist, Notifications icons */}
                  <div className="hidden sm:flex items-center space-x-4">
                    {/* Wishlist */}
                    <Link
                      to="/wishlist"
                      className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                    >
                      <HeartIcon className="h-6 w-6" />
                      {wishlistTotal > 0 && (
                        <span
                          className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 text-white 
                                       text-xs rounded-full flex items-center justify-center"
                        >
                          {wishlistTotal}
                        </span>
                      )}
                    </Link>

                    {/* Cart */}
                    <Link
                      to="/cart"
                      className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700
                          rounded-lg hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 group"
                    >
                      <ShoppingCartIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
                      <span className="font-medium text-base whitespace-nowrap group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        Cart
                      </span>
                      {cartQuantity > 0 && (
                        <span
                          className="flex items-center justify-center w-6 h-6 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400
                              text-sm font-semibold rounded-full group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors duration-300"
                        >
                          {cartQuantity}
                        </span>
                      )}
                    </Link>

                    {/* Notifications dropdown */}
                    <div className="relative">
                      <button
                        onClick={toggleNotifications}
                        className={`p-2 rounded-full relative group ${
                          scrolled
                            ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        } transition-colors duration-300 ${
                          notificationsOpen
                            ? "text-indigo-600 dark:text-indigo-400"
                            : ""
                        }`}
                      >
                        <BellIcon className="h-6 w-6" />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                          7
                        </span>
                      </button>

                      {notificationsOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden transform transition-all duration-300 ease-out">
                          <div className="py-1">
                            <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500">
                              <h3 className="text-sm font-semibold text-white">
                                Notifications
                              </h3>
                              <button className="text-xs text-white/80 hover:text-white transition-colors duration-300">
                                Mark all as read
                              </button>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                              {[
                                {
                                  id: 1,
                                  type: "message",
                                  time: "5 min ago",
                                  text: "New message from Sarah",
                                  read: false,
                                },
                                {
                                  id: 2,
                                  type: "order",
                                  time: "1 hour ago",
                                  text: "Your order has been shipped",
                                  read: false,
                                },
                                {
                                  id: 3,
                                  type: "system",
                                  time: "1 day ago",
                                  text: "System maintenance scheduled",
                                  read: true,
                                },
                              ].map((notification) => (
                                <div
                                  key={notification.id}
                                  className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 ${
                                    notification.read
                                      ? ""
                                      : "border-l-4 border-indigo-500"
                                  }`}
                                >
                                  <div className="flex items-start">
                                    <div
                                      className={`flex-shrink-0 rounded-full p-2 ${
                                        notification.type === "message"
                                          ? "bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 text-indigo-600 dark:text-indigo-400"
                                          : notification.type === "order"
                                          ? "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-600 dark:text-green-400"
                                          : "bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40 text-amber-600 dark:text-amber-400"
                                      }`}
                                    >
                                      {notification.type === "message" ? (
                                        <MailIcon className="h-5 w-5" />
                                      ) : notification.type === "order" ? (
                                        <ShoppingCartIcon className="h-5 w-5" />
                                      ) : (
                                        <InformationCircleIcon className="h-5 w-5" />
                                      )}
                                    </div>
                                    <div className="ml-3 w-0 flex-1">
                                      <p
                                        className={`text-sm ${
                                          notification.read
                                            ? "text-gray-600 dark:text-gray-400"
                                            : "font-medium text-gray-900 dark:text-white"
                                        }`}
                                      >
                                        {notification.text}
                                      </p>
                                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                        {notification.time}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700">
                              <Link
                                to="/notifications"
                                className="block text-center px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                              >
                                View all notifications
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* User menu dropdown */}
                  <div className="relative ml-1">
                    <button
                      onClick={toggleProfileMenu}
                      className={`flex items-center rounded-full ${
                        scrolled
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      } p-1 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300`}
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-indigo-500/30 dark:ring-indigo-400/30 transition-all duration-300">
                        <img
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <span className="hidden sm:flex ml-2 text-sm font-medium">
                        User
                      </span>
                      <ChevronDownIcon
                        className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                          profileMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {profileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden transform transition-all duration-300 ease-out">
                        <div className="px-4 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-indigo-500 transition-all duration-300">
                              <img
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                John Doe
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                john.doe@example.com
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors duration-300"
                          >
                            <UserCircleIcon className="mr-3 h-5 w-5 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                            Profile
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors duration-300"
                          >
                            <CogIcon className="mr-3 h-5 w-5 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                            Settings
                          </Link>
                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors duration-300"
                            >
                              <ViewGridIcon className="mr-3 h-5 w-5 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                              Admin Dashboard
                            </Link>
                          )}
                          <button
                            onClick={toggleDarkMode}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left group transition-colors duration-300"
                          >
                            {darkMode ? (
                              <SunIcon className="mr-3 h-5 w-5 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                            ) : (
                              <MoonIcon className="mr-3 h-5 w-5 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                            )}
                            {darkMode ? "Light Mode" : "Dark Mode"}
                          </button>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left group transition-colors duration-300"
                          >
                            <LogoutIcon className="mr-3 h-5 w-5 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform duration-300" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`flex items-center space-x-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
                             transition-colors duration-300 whitespace-nowrap text-base font-medium`}
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    <span>Login/Register</span>
                  </Link>
                </>
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
          <div
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
                            {wishlistTotal}
                          </span>
                        </div>
                        Wishlist
                      </Link>
                      <Link
                        to="/messages"
                        className="flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 group transition-colors duration-300"
                      >
                        <div className="relative mr-4">
                          <MailIcon className="h-6 w-6 flex-shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full">
                            5
                          </span>
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
