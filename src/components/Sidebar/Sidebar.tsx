import React, { useState } from 'react';

const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 text-blue-800"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-blue-800 text-white p-4 ${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block`}
      >
        <div className="text-2xl font-semibold">My Sidebar</div>
        <nav className="mt-5">
          <ul>
            <li className="my-2">
              <a href="#" className="block p-2 rounded hover:bg-blue-700">
                Home
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="block p-2 rounded hover:bg-blue-700">
                About
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="block p-2 rounded hover:bg-blue-700">
                Services
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="block p-2 rounded hover:bg-blue-700">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="text-3xl font-bold mb-4">Dashboard</div>
        <p className="text-gray-700">
          This is the main content area. You can add your own content and components here.
        </p>
      </div>
    </div>
  );
};

export default SidebarLayout;
