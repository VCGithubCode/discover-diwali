import os
from flask import Flask, render_template, redirect, request, url_for, flash, session, jsonify
from pymongo import MongoClient
from pathlib import Path
from urllib.parse import unquote
from werkzeug.security import generate_password_hash, check_password_hash

if os.path.exists("env.py"):
    import env

# Flask App Initialization
app = Flask(__name__)

# SECURITY WARNING: Keep the secret key used in production secret!
app.secret_key = os.environ.get("SECRET_KEY")

# MongoDB Connection
MONGO_URI = os.environ.get("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI is not set. Please check your env.py or environment variables.")

try:
    client = MongoClient(MONGO_URI)
    db = client["diwali-discovery"]
    states_collection = db["states"]
    users_collection = db["users"]
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    states_collection = None  # Prevent the app from crashing if MongoDB fails
    users_collection = None


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/map')
def map():
    return render_template("map.html")


@app.route('/state/<state_name>')
def state_details(state_name):
    # Handle URL decoding and special characters
    state_name = unquote(state_name).replace("-", " ").strip().lower()
    
    # Debug statement to see what the normalized state name looks like
    print(f"Searching for state: {state_name}")
    
    state = states_collection.find_one({"state": state_name}, {"_id": 0}) if states_collection is not None else None
    
    if state:
        return render_template("state_details.html", state=state)
    else:
        return render_template("404.html"), 404



@app.route('/quiz')
def quiz():
    if 'user' not in session:
        flash("Please log in to play the quiz.", "error")
        return redirect(url_for('login'))
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


# User registration
@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        
        if users_collection.find_one({"username": username}):
            flash("Username already exists.", "error")
            return redirect(url_for("register"))
        
        hashed_password = generate_password_hash(password)
        users_collection.insert_one({"username": username, "password": hashed_password, "score": 0})
        flash("Registration successful. Please log in.", "success")
        return redirect(url_for("login"))
    
    return render_template("register.html")


# User login
@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        
        user = users_collection.find_one({"username": username})
        if user and check_password_hash(user["password"], password):
            session["user"] = username
            flash("Login successful!", "success")
            return redirect(url_for("quiz"))
        else:
            flash("Invalid credentials.", "error")
    
    return render_template("login.html")


# User logout
@app.route('/logout')
def logout():
    session.pop("user", None)
    flash("You have been logged out.", "success")
    return redirect(url_for("index"))


# Quiz completion endpoint
@app.route('/quiz_complete', methods=["POST"])
def quiz_complete():
    score = request.form.get("score")
    if "user" in session:
        users_collection.update_one(
            {"username": session["user"]}, 
            {"$set": {"score": int(score)}}
        )
    return redirect(url_for("leaderboard"))


# Leaderboard route
@app.route('/leaderboard')
def leaderboard():
    top_users = list(users_collection.find().sort("score", -1).limit(10))
    return render_template("leaderboard.html", users=top_users)


# SECURITY WARNING: Don't run with debug turned on in production!
if __name__ == '__main__':
    app.run(
            host=os.environ.get("IP", "0.0.0.0"),
            port=int(os.environ.get("PORT", "5001")),
            debug="DEVELOPMENT" in os.environ
    )
