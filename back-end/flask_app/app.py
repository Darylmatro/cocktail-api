from flask import Flask, jsonify, request
# from flask import render_template, url_for, redirect
from flask_cors import CORS
# from pymongo import MongoClient
from flask_app.api.crud_db import create_data, read_data, update_data, delete_data

from flask_app.api.display_test import display_test

app = Flask(__name__)
cors = CORS(app, origins='*')
#app.config["CORS_HEADERS"] = "Content-Type"

'''client = MongoClient('localhost', 27017)
db = client['test_database']
coll = db['test_collection']'''



@app.route("/")
def home():
    return "<p>homepage</p>"



# Routes CRUD
@app.route("/create", methods=['GET', 'POST'])
def create():
    return create_data()

@app.route("/update", methods=['GET', 'POST'])
def update():
    return update_data

@app.route("/delete", methods=['GET', 'POST'])
def delete():
    return delete_data()

@app.route("/read", methods=['GET', 'POST'])
def read():
    return read_data()



# TESTS
@app.route("/display")
def display():
    retour = display_test()
    print(retour)
    return retour
