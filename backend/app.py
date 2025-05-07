from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

DB_NAME = 'users.db'

def init_db():
    # Remove the existing database file (for development only)
    if os.path.exists(DB_NAME):
        os.remove(DB_NAME)

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            username TEXT NOT NULL
        )
    ''')
    cursor.execute(
        "INSERT INTO users (email, password, username) VALUES (?, ?, ?)", 
        ('test@example.com', 'password123', 'DummyUser')
    )
    conn.commit()
    conn.close()

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

@app.route('/cities', methods=['GET'])
def get_cities():
    cities = [
        'Chennai (Capital city)', 'Coimbatore', 'Madurai', 'Trichy (Tiruchirapalli)', 'Salem',
        'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Dindigul', 'Tuticorin (Thoothukudi)',
        'Cuddalore', 'Kanchipuram', 'Karur', 'Tiruppur', 'Chengalpattu', 'Hosur', 'Nagercoil',
        'Kovilpatti', 'Pollachi', 'Ramanathapuram', 'Perambalur', 'Pudukottai', 'Sivakasi', 'Villupuram'
    ]
    return jsonify(cities)

if __name__ == '__main__':
    init_db()  # Recreate DB on each run (for development only)
    app.run(debug=True, port=5000)
