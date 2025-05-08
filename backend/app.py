from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import requests
import random

app = Flask(__name__)
CORS(app)

DB_NAME = 'users.db'
WEATHER_API_KEY = "dffaccbef5bb4312a1950640252404"

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

# === Database Initialization ===
def init_db():
    if os.path.exists(DB_NAME):
        os.remove(DB_NAME)
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # Users table
    cursor.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            username TEXT NOT NULL
        )
    ''')

    # Locations table
    cursor.execute('''
        CREATE TABLE locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            location TEXT NOT NULL
        )
    ''')

    # Dummy user
    cursor.execute(
        "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
        ('test@example.com', 'password123', 'DummyUser')
    )

    conn.commit()
    conn.close()

# === Signin Route ===
@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email=? AND password=?", (email, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({'message': 'Login successful', 'username': user[3]}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# === Save Location (NEW) ===
@app.route('/save_location', methods=['POST'])
def save_location():
    data = request.get_json()
    username = data.get('username')
    location = data.get('location')

    if not username or not location:
        return jsonify({'error': 'Missing username or location'}), 400

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO locations (username, location) VALUES (?, ?)", (username, location))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Location saved successfully'}), 200

# === Cities List ===
@app.route('/location', methods=['GET'])
def get_cities():
    cities = [
        'Chennai (Capital city)', 'Coimbatore', 'Madurai', 'Trichy (Tiruchirapalli)', 'Salem',
        'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Dindigul', 'Tuticorin (Thoothukudi)',
        'Cuddalore', 'Kanchipuram', 'Karur', 'Tiruppur', 'Chengalpattu', 'Hosur', 'Nagercoil',
        'Kovilpatti', 'Pollachi', 'Ramanathapuram', 'Perambalur', 'Pudukottai', 'Sivakasi', 'Villupuram'
    ]
    return jsonify(cities)

# === Weather Utility Functions ===
def get_current_temperature(location):
    try:
        url = f"http://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={location}"
        response = requests.get(url)
        data = response.json()
        temperature = data["current"]["temp_c"]
        return temperature
    except Exception as e:
        print(f"Error fetching weather: {e}")
        return None

def get_temperature_category(temperature):
    
    if temperature is None:
        category="moderate"
    elif temperature >= 30:
        category="hot"
    elif temperature <= 15:
        category="cold"
    else:
        category="moderate"
    return category

def get_food_suggestion(category):
    return random.choice(FOOD_DATABASE[category])

# === Climate-Based Food Suggestion ===
@app.route('/food', methods=['GET'])
def suggest_food():
    location = request.args.get('location')
    if not location:
        return jsonify({'error': 'Location is required'}), 400

    temperature = get_current_temperature(location)
    category = get_temperature_category(temperature)
    suggestion = get_food_suggestion(category)

    return jsonify({
        'location': location,
        'temperature': temperature,
        'category': category,
        'suggestion': suggestion
    })

# === Main Run ===
if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
