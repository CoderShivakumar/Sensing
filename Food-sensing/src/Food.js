import React, { useState, useEffect } from 'react';

export const Food = () => {
  const [recommendedFood, setRecommendedFood] = useState(['Idli', 'Dosa', 'Pongal']);
  const [climateBasedFood, setClimateBasedFood] = useState(['Rasam', 'Lemon Rice', 'Buttermilk']);
  const [selectedOption, setSelectedOption] = useState('');
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Simulate food items fetching (could be based on selected option later)
    if (selectedOption === 'Lunch') {
      setFoodItems(['Sambar Rice', 'Curd Rice', 'Vegetable Poriyal']);
    } else if (selectedOption === 'Dinner') {
      setFoodItems(['Chapati', 'Upma', 'Vegetable Kurma']);
    } else if (selectedOption === 'Snacks') {
      setFoodItems(['Vadai', 'Sundal', 'Bajji']);
    } else {
      setFoodItems([]);
    }
  }, [selectedOption]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended Food</h2>
        
        <h2 className="text-2xl font-thin text-gray-900 dark:text-white">Based on your location's climate suggested food option</h2>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Meal Type</label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="">-- Select an Option --</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>

        {selectedOption && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {selectedOption} Options
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {foodItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
