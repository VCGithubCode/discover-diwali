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


@app.route('/discover')
def discover():
    return render_template("discover.html")


@app.route('/play')
def play():
    return render_template("play.html")


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


#SECURITY WARNING: Don't run with debug turned on in production!
if __name__ == '__main__':
    app.run(
            host=os.environ.get("IP", "0.0.0.0"),
            port=int(os.environ.get("PORT", "5001")),
            debug="DEVELOPMENT" in os.environ
    )