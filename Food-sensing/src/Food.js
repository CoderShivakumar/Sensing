import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = ({ notifications }) => {
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

export const Food = () => {
  const [climateBasedSuggestion, setClimateBasedSuggestion] = useState(null);
  const [city, setCity] = useState('Chennai');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const selectedLocation = localStorage.getItem('selectedLocation') || 'Chennai';
    setCity(selectedLocation);
    fetchClimateBasedFood(selectedLocation);
  }, []);

  const fetchClimateBasedFood = async (location) => {
    try {
      const response = await axios.get(`http://localhost:5000/food?location=${location}`);
      setClimateBasedSuggestion(response.data);

      // Push the suggestion as a notification
      setNotifications((prev) => [
        ...prev,
        `Suggested Food for ${location}: ${response.data.suggestion}`
      ]);
    } catch (error) {
      console.error('Failed to fetch food suggestion:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar notifications={notifications} />

      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🌦️ Recommended Food for Your City
          </h2>

          {climateBasedSuggestion ? (
            <div className="text-gray-800 dark:text-gray-300 space-y-2">
              <p><strong>City:</strong> {climateBasedSuggestion.location}</p>
              <p><strong>Temperature:</strong> {climateBasedSuggestion.temperature}°C</p>
              <p><strong>Weather:</strong> {climateBasedSuggestion.category}</p>
              <p><strong>Suggested Food:</strong> {climateBasedSuggestion.suggestion}</p>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Fetching your food recommendation...</p>
          )}
        </div>
      </div>
    </div>
  );
};
