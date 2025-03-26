from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from API_Flask.database import Database

auth_api = Blueprint('auth', __name__)
db = Database()
users_collection = db.get_database["users"]

@auth_api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Missing required fields"}), 400
    
    username = data['username']
    email = data['email']
    password = data['password']
    
    # Vérifier si l'utilisateur existe déjà
    if users_collection.find_one({"$or": [{"username": username}, {"email": email}]}):
        return jsonify({"error": "Username or email already exists"}), 409
    
    # Créer le nouvel utilisateur
    hashed_password = generate_password_hash(password)
    user = {
        "username": username,
        "email": email,
        "password": hashed_password
    }
    
    users_collection.insert_one(user)
    return jsonify({"message": "User created successfully"}), 201

@auth_api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Missing required fields"}), 400
    
    username = data['username']
    password = data['password']
    
    # Vérifier si l'utilisateur existe
    user = users_collection.find_one({"username": username})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Vérifier le mot de passe
    if not check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid password"}), 401
    
    # Retourner les informations de l'utilisateur (sans le mot de passe)
    return jsonify({
        "message": "Login successful",
        "username": user['username'],
        "email": user['email']
    }), 200 