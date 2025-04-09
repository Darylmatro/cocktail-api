from flask import Flask, request, jsonify
from flask_cors import CORS

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from API_Flask.database import Database
from API_Flask.blueprints.cocktail import cocktail_api

app = Flask(__name__)
app.register_blueprint(cocktail_api)

# mdp: cocktail-db

cors = CORS(app, origins='*')

@app.route('/')
def home():
    return "<p>Cocktail API</p><a href='http://localhost:5000/api/cocktail/list'>Liste des cocktails</a>" 
