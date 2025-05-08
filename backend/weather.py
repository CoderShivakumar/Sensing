import requests
import random

# === API Keys and Configuration ===
WEATHER_API_KEY = "dffaccbef5bb4312a1950640252404" 

# Food suggestion databases based on temperature
FOOD_DATABASE = {
    "hot": [
        "Chilled Fruit Bowl - Start your day cool",
        "Yogurt Parfait - Light and refreshing",
        "Cold Brew Coffee - Smooth and energizing",
        "Fruit Smoothie - Icy and rejuvenating"
    ],
    "cold": [
        "Hot Oatmeal - Warming start to the day",
        "Masala Chai - Spiced warmth in a cup",
        "Poha - Light Indian breakfast",
        "Scrambled Eggs - Protein-rich start"
    ],
    "moderate": [
        "Avocado Toast - Trendy breakfast choice",
        "Vegetable Omelette - Protein-packed start",
        "Banana Pancakes - Sweet morning treat",
        "Green Smoothie - Nutritious energy booster"
    ]
}

# Function to fetch the current temperature based on location
def get_current_temperature(location):
    try:
        # API request to fetch weather data
        url = f"http://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={location}"
        response = requests.get(url)
        data = response.json()
        
        # Extract temperature and weather condition
        temperature = data["current"]["temp_c"]
        condition = data["current"]["condition"]["text"]
        
        print(f"\nWeather in {location}: {condition}, Temperature: {temperature}°C")
        return temperature
    except Exception as e:
        print(f"⚠️ Error fetching weather data: {e}")
        return None

# Function to categorize the temperature
def get_temperature_category(temp):
    if temp is None:
        return "moderate"  # Default fallback if no temperature is fetched
    
    if temp >= 30:
        return "hot"
    elif temp <= 15:
        return "cold"
    else:
        return "moderate"

# Function to get a food suggestion based on temperature category
def get_food_suggestion(category):
    return random.choice(FOOD_DATABASE[category])

# Main function to drive the program
def suggest_food_based_on_weather():
    # Get user location (city name)
    location = input("Enter your location (city): ")

    # Get current temperature based on location
    temperature = get_current_temperature(location)
    
    # Categorize the temperature
    category = get_temperature_category(temperature)

    # Get a food suggestion based on the category
    food_suggestion = get_food_suggestion(category)
    
    # Show the suggestion
    print(f"\nBased on the current weather in {location} ({temperature}°C), we suggest: {food_suggestion}")

    # Optionally, save the suggestion to a file
    with open("food_suggestion.txt", "w") as file:
        file.write(f"Weather in {location}: {temperature}°C\n")
        file.write(f"Suggested Food: {food_suggestion}\n")

    print("\nThe food suggestion has been saved to 'food_suggestion.txt'.")

# Run the script
if __name__ == "__main__":
    suggest_food_based_on_weather()
