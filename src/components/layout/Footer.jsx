import React from "react";
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-300 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Column 1 */}
        <div>
          <h4 className="text-xl font-bold text-blue-300">ReTech</h4>
          <p className="text-sm mt-2">Your trusted platform for buying and selling used electronics.</p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-xl font-bold text-blue-300">Quick Links</h4>
          <ul className="space-y-2 mt-2 text-sm">
            <li><a href="#terms" className="hover:text-blue-300 transition duration-300">Terms of Service</a></li>
            <li><a href="#privacy" className="hover:text-blue-300 transition duration-300">Privacy Policy</a></li>
            <li><a href="#faq" className="hover:text-blue-300 transition duration-300">FAQ</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-xl font-bold text-blue-300">Contact Us</h4>
          <p className="text-sm mt-2">Email: <a href="mailto:support@retech.com" className="hover:text-blue-300 transition duration-300">support@retech.com</a></p>
          <p className="text-sm">Phone: <span className="hover:text-blue-300 transition duration-300">+84 708 888 880</span></p>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-xl font-bold text-blue-300">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-blue-300 transition duration-300">
              <FacebookOutlined className="h-7 w-7" />
            </a>
            <a href="#" className="hover:text-blue-300 transition duration-300">
              <TwitterOutlined className="h-7 w-7" />
            </a>
            <a href="#" className="hover:text-blue-300 transition duration-300">
              <LinkedinOutlined className="h-7 w-7" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <p className="text-sm">© {new Date().getFullYear()} ReTech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
