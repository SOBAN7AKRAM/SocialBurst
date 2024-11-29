import { Link } from "react-router-dom";
import { MdOutlinePublish } from "react-icons/md";
import { SiGoogleanalytics, SiGooglemessages } from "react-icons/si";
import { FiPenTool } from "react-icons/fi";
import { MenuIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Logo from './Logo.png'


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex pr-4 justify-between items-center w-full">
      <Link to="/" className="w-24">
      <img src={Logo} alt="logo" className="w-24" />
      
      </Link>
      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-12 text-lg">
        <div
          className="relative"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <button className="text-gray-700">Actions</button>
          {menuOpen && (
            <div className="absolute bg-white shadow-lg rounded w-64">
              <div className="p-3 flex items-start gap-2 hover:bg-gray-100">
                <MdOutlinePublish size={26} />
                <div>
                  <h3 className="text-sm font-semibold">Publishing</h3>
                  <p className="text-sm text-gray-600">
                    Plan, Collaborate, and publish thumb-stopping content
                  </p>
                </div>
              </div>
              <div className="p-3 flex items-start gap-2 hover:bg-gray-100">
                <SiGoogleanalytics size={26} />
                <div>
                  <h3 className="text-sm font-semibold">Analytics</h3>
                  <p className="text-sm text-gray-600">
                    Analyze social media performance and create reports
                  </p>
                </div>
              </div>
              <div className="p-3 flex items-start gap-2 hover:bg-gray-100">
                <SiGooglemessages size={26} />
                <div>
                  <h3 className="text-sm font-semibold">Engagement</h3>
                  <p className="text-sm text-gray-600">
                    Quickly navigate your comments and engage with your audience
                  </p>
                </div>
              </div>
              <div className="p-3 flex items-start gap-2 hover:bg-gray-100">
                <FiPenTool size={26} />
                <div>
                  <h3 className="text-sm font-semibold">Start Page</h3>
                  <p className="text-sm text-gray-600">
                    Build a customized landing page in minutes
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <Link to="/pricing" className="text-gray-700">
          Pricing
        </Link>
        <Link to="/blog" className="text-gray-700">
          Blog
        </Link>
        <Link to="/about" className="text-gray-700">
          About
        </Link>
        <Link to="/customers" className="text-gray-700">
          Customers
        </Link>
      </div>
      {/* Mobile Menu Button */}
      <div className="flex items-center gap-5 lg:hidden">
        <MenuIcon
          className="w-8 h-8 text-gray-700 cursor-pointer"
          onClick={() => setShowModal(!showModal)}
        />
      </div>
      {/* Desktop Buttons */}
      <div className="hidden lg:flex items-center gap-5">
        <Link to="/login" className="text-blue-500 text-lg">
          Login
        </Link>
        <Link to="/SignUp">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Get started now
          </button>
        </Link>
      </div>
      {/* Mobile Dropdown Menu */}
      {showModal && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded w-64 p-5 lg:hidden">
          <Link to="/pricing" className="block py-2 text-gray-700">
            Pricing
          </Link>
          <Link to="/blog" className="block py-2 text-gray-700">
            Blog
          </Link>
          <Link to="/about" className="block py-2 text-gray-700">
            About
          </Link>
          <Link to="/customers" className="block py-2 text-gray-700">
            Customers
          </Link>
          <Link to="/login" className="block py-2 text-blue-500">
            Login
          </Link>
          <Link to="/publishing" className="block py-2">
            <button className="bg-blue-500 text-white w-full py-2 rounded">
              Get started now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
