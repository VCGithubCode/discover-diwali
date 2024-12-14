import os
from flask import Flask, render_template, redirect, request, url_for, flash, session, jsonify
from pymongo import MongoClient
from pathlib import Path
if os.path.exists("env.py"):
    import env

# Flask App Initialization
app = Flask(__name__)

# SECURITY WARNING: Keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

# MongoDB Connection
MONGO_URI = os.environ.get("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI is not set. Please check your env.py or environment variables.")

try:
    client = MongoClient(MONGO_URI)
    db = client["diwali-discovery"]
    states_collection = db["states"]
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    states_collection = None  # Prevent the app from crashing if MongoDB fails

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/map')
def map():
    return render_template("map.html")

@app.route('/state/<state_name>')
def state_details(state_name):
    # Fetch state details from the MongoDB collection
    state = states_collection.find_one({"state": state_name}, {"_id": 0}) if states_collection is not None else None
    
    if state:
        return render_template("state_details.html", state=state)
    else:
        return render_template("404.html"), 404

@app.route('/quiz')
def quiz():
    return render_template("quiz.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/contact')
def contact():
    return render_template("contact.html")

@app.route('/thank-you')
def thankyou():
    return render_template("thank-you.html")

@app.route('/404')
def error():
    return render_template("404.html")

@app.route('/500')
def error500():
    return render_template("500.html")

# Endpoint to fetch states data
@app.route("/api/states", methods=["GET"])
def get_states():
    states = list(states_collection.find({}, {"_id": 0}))
    return jsonify(states)

# SECURITY WARNING: Don't run with debug turned on in production!
if __name__ == '__main__':
    app.run(
            host=os.environ.get("IP", "0.0.0.0"),
            port=int(os.environ.get("PORT", "5001")),
            debug="DEVELOPMENT" in os.environ
    )