from flask import Flask, request, jsonify
from flask_cors import CORS

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from API_Flask.database import Database
from API_Flask.blueprints.cocktail import cocktail_api
from API_Flask.blueprints.auth import auth_api

app = Flask(__name__)

# Configuration de CORS
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],  # URL de votre frontend
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Enregistrer les blueprints
app.register_blueprint(cocktail_api)
app.register_blueprint(auth_api)

# mdp: cocktail-db

@app.route('/')
def home():
    return "<p>Cocktail API</p><a href='http://localhost:5000/api/cocktail/list'>Liste des cocktails</a>" 

if __name__ == '__main__':
    app.run(debug=True) 