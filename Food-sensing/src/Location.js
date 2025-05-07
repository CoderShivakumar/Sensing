import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Location = () => {
  const [username, setUsername] = useState('DummyUser');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  const cities = [
    'Chennai (Capital city)', 'Coimbatore', 'Madurai', 'Trichy (Tiruchirapalli)', 'Salem',
    'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Dindigul', 'Tuticorin (Thoothukudi)',
    'Cuddalore', 'Kanchipuram', 'Karur', 'Tiruppur', 'Chengalpattu', 'Hosur', 'Nagercoil',
    'Kovilpatti', 'Pollachi', 'Ramanathapuram', 'Perambalur', 'Pudukottai', 'Sivakasi', 'Villupuram'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCity) {
      alert('Please select a city');
      return;
    }
    console.log(`Selected city: ${selectedCity}`);
    navigate('/somewhere');
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-10 pb-20">
      <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Hello, {username}!
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select your city
                </label>
                <select
                  name="city"
                  id="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
