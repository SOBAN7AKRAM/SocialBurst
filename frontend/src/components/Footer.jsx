import React from 'react';
import { BsPinterest, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaFacebookF, FaTiktok, FaGooglePlay, FaApple } from "react-icons/fa";

const Footer = () => (
  <div className="p-8 bg-pink-500 text-white">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      
      {/* Column 1: Logo and Social Icons */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Buffer</h2>
        <div className="flex gap-4 text-2xl text-black">
          <BsInstagram color='white'/>
          <FaFacebookF color='white'/>
          <BsTwitter color='white'/>
          <FaTiktok color='white'/>
          <BsLinkedin color='white'/>
          <BsPinterest color='white'/>
        </div>
        <p className="font-semibold">Download</p>
        <div className="flex gap-4 mt-2">
          <button className="flex items-center gap-1 px-3 py-2 border rounded-lg border-white ">
            <FaGooglePlay color='white' /> <span className="text-xs text-white">Google Store</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-2 border rounded-lg border-white ">
            <FaApple color='white'/> <span className="text-xs text-white">App Store</span>
          </button>
        </div>
        <p className="text-xs">Copyright ©2022</p>
        <p className="text-xs">Buffer | Privacy | Terms | Security</p>
      </div>

      {/* Column 2: Tools */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tools</h3>
        <p>Publishing</p>
        <p>Analytics</p>
        <p>Engagement</p>
        <p>Start Page</p>
        <p>Extras</p>
      </div>

      {/* Column 3: Resources */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Resources</h3>
        <p>Blog</p>
        <p>Content Library</p>
        <p>Browser Extension</p>
        <p>Free Image Editor</p>
      </div>

      {/* Column 4: Support */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Support</h3>
        <p>Help Center</p>
        <p>Status</p>
        <p>Changelog</p>
        <p>Product Roadmap</p>
      </div>

      {/* Column 5: Company */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Company</h3>
        <p>About</p>
        <p>Transparency</p>
        <p>Careers</p>
        <p>Accessibility</p>
        <p>Press</p>
        <p>Sitemap</p>
      </div>
    </div>
  </div>
);

export default Footer;
