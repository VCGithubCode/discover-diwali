import os
from flask import Flask, render_template, redirect, request, url_for, flash, session, jsonify
from pymongo import MongoClient
from pathlib import Path
from urllib.parse import unquote
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import atexit

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

AVATARS = [
    "avatar1.jpg", "avatar2.jpg", "avatar3.jpg", "avatar4.jpg", "avatar5.jpg", "avatar6.jpg", "avatar7.jpg", "avatar8.jpg", "avatar9.jpg", "avatar10.jpg", "avatar11.jpg", "avatar12.jpg", "avatar13.jpg", "avatar14.jpg", "avatar15.jpg"
]
STATES = [
    "Punjab", "Rajastan", "Uttar Pradesh", "Gujarat", "Maharashtra", "Karnataka", "Kerala", "Tamil Nadu", "West Bengal"
]

@app.route("/profile", methods=["GET", "POST"])
def profile():
    if "user" not in session:
        flash("Please log in to access your profile.", "error")
        return redirect(url_for("login"))

    username = session["user"]  # Logged-in user's username

    if request.method == "POST":
        # Handle avatar selection and save to MongoDB
        selected_avatar = request.form.get("avatar")
        if selected_avatar:
            users_collection.update_one(
                {"username": username},
                {"$set": {"avatar": selected_avatar}}
            )
            session["avatar"] = selected_avatar  # Update the session with the avatar

        return redirect(url_for("profile"))

    # Fetch user data, including selected avatar and visited states
    user = users_collection.find_one({"username": username})
    selected_avatar = user.get("avatar", "")

    # Get the user's visited states from the user's document
    visited_states = user.get("visited_states", [])
    total_states = len(STATES)  # Total available states in the system
    visited_states_count = len(visited_states)  # Count of states visited by the user
    remaining_states = total_states - visited_states_count  # Calculate remaining states

    return render_template(
        "profile.html",
        avatars=AVATARS,
        selected_avatar=selected_avatar,
        visited_states=visited_states_count,
        remaining_states=remaining_states,
        total_states=total_states,
        visited_states_list=visited_states  # Pass the full list of visited states
    )




@app.route('/')
def index():
    return render_template("index.html")


@app.route('/map')
def map():
    return render_template("map.html")


@app.route('/state/<state_name>')
def state_details(state_name):
    if "user" in session:
        decoded_name = unquote(state_name)
        state = states_collection.find_one({"state": decoded_name}, {"_id": 0})
        
        if state:
            # Update visited states for the logged-in user
            users_collection.update_one(
                {"username": session["user"]}, 
                {"$addToSet": {"visited_states": decoded_name}}  # Add the state to visited_states array
            )
            return render_template("state_details.html", state=state)
        else:
            return render_template("404.html"), 404
    else:
        flash("Please log in to view state details.", "error")
        return redirect(url_for("login"))


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


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def server_error(error):
    return render_template('500.html'), 500

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
            session["user"] = username  # Set session.user
            flash("Login successful!", "success")
            return redirect(url_for("quiz"))
        else:
            flash("Invalid credentials.", "error")
    
    return render_template("login.html")


# User logout
@app.route('/logout')
def logout():
    session.pop("user", None)  # Remove session.user
    flash("You have been logged out.", "success")
    return redirect(url_for("index"))
    

# Quiz completion endpoint
@app.route('/quiz_complete', methods=["POST"])
def quiz_complete():
    if "user" not in session:
        return jsonify({"success": False, "error": "User not logged in"}), 401

    try:
        score = int(request.form.get("score", 0))
        if score < 0 or score > 10:
            return jsonify({"success": False, "error": "Invalid score"}), 400
    except ValueError:
        return jsonify({"success": False, "error": "Invalid score format"}), 400

    user = users_collection.find_one({"username": session["user"]})
    if not user:
        return jsonify({"success": False, "error": "User not found"}), 404

    try:
        result = users_collection.update_one(
            {"username": session["user"]}, 
            {"$set": {"score": score, "last_score_date": datetime.utcnow()}}
        )
        print(f"Query Result: Matched {result.matched_count}, Modified {result.modified_count}")
    except Exception as e:
        print(f"Error updating user score: {e}")
        return jsonify({"success": False, "error": "Database update failed"}), 500

    if result.modified_count > 0:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "error": "Score not updated"}), 400


# Leaderboard route
@app.route('/leaderboard')
def leaderboard():
    # Fetch top 10 users, including the avatar field
    top_users = list(users_collection.find(
        {}, {"username": 1, "score": 1, "last_score_date": 1, "avatar": 1}
    ).sort([("score", -1), ("username", 1)]).limit(10))

    return render_template("leaderboard.html", users=top_users)


# SECURITY WARNING: Don't run with debug turned on in production!
if __name__ == '__main__':
    app.run(
            host=os.environ.get("IP", "0.0.0.0"),
            port=int(os.environ.get("PORT", "5001")),
            debug="DEVELOPMENT" in os.environ
    )


def close_db_connection():
    if client:
        client.close()

# Register cleanup function to close DB connections on exit
atexit.register(close_db_connection)
