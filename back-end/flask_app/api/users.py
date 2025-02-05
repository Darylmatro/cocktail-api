from pymongo import MongoClient
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client['TEST_cocktail_db']
users_coll = db['users']

# Création d'un utilisateur
def create_user():
    data = request.json
    hashed_password = generate_password_hash(data["password"])
    user = {
        "username": data["username"],
        "email": data["email"],
        "password": hashed_password,
        "role": "user",
        "created_at": datetime.utcnow()
    }
    users_coll.insert_one(user)
    return jsonify({"message": "Utilisateur créé !"}), 201

# Vérification d'un utilisateur (login)
def login():
    data = request.json
    user = users_coll.find_one({"email": data["email"]})
    if user and check_password_hash(user["password"], data["password"]):
        return jsonify({"message": "Connexion réussie !", "username": user["username"]})
    return jsonify({"error": "Identifiants incorrects"}), 401
# Recuperation de la listes des utilisateurs 
def get_users():
    users = list(users_coll.find({}, {"password": 0}))  # Exclure le mot de passe pour la sécurité
    for user in users:
        user["_id"] = str(user["_id"])  # Convertir l'ObjectId en string pour React
    return jsonify(users)

# Pour supprimer un utilisateur
def delete_user():
    data = request.json
    result = users_coll.delete_one({"email": data["email"]})
    if result.deleted_count == 1:
        return jsonify({"message": "Utilisateur supprimé"}), 200
    return jsonify({"error": "Utilisateur non trouvé"}), 404