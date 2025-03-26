from flask import Flask, request, jsonify
from flask_cors import CORS

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from API_Flask.database import Database
from API_Flask.blueprints.test_database import test_db
from API_Flask.blueprints.cocktail import cocktail_api

app = Flask(__name__)
app.register_blueprint(test_db)
app.register_blueprint(cocktail_api)

# mdp: cocktail-db

cors = CORS(app, origins='*')

connexion_test = Database()
test_collection = connexion_test.get_database["test-collection"]

@app.route('/')
def home():
    return "<p>Cocktail API</p>"
