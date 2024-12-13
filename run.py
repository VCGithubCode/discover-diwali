import os
from flask import Flask, render_template, redirect, request, url_for, flash, session
from pathlib import Path
if os.path.exists("env.py"):
    import env


# SECURITY WARNING: Keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/map')
def map():
    return render_template("map.html")


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


@app.route('/state/<state_name>')
def state_details(state_name):
    # Fetch state details from the MongoDB collection
    state = db["states"].find_one({"state": state_name}, {"_id": 0})
    if state:
        return render_template("state_details.html", state=state)
    else:
        return render_template("404.html"), 404



#SECURITY WARNING: Don't run with debug turned on in production!
if __name__ == '__main__':
    app.run(
            host=os.environ.get("IP", "0.0.0.0"),
            port=int(os.environ.get("PORT", "5001")),
            debug="DEVELOPMENT" in os.environ
    )