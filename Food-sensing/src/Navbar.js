import React, { useState } from 'react';

export const Navbar = ({ notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center relative shadow-md">
      <div className="text-xl font-bold"></div>

      <div className="relative">
        <button
          onClick={toggleNotifications}
          className="relative text-2xl focus:outline-none"
        >
          🔔
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
              {notifications.length}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50">
            {notifications.length > 0 ? (
              notifications.map((note, index) => (
                <div
                  key={index}
                  className="px-4 py-2 border-b last:border-none hover:bg-gray-100"
                >
                  {note}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No new notifications
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
