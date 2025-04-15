from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from API_Flask.database import Database
from bson.objectid import ObjectId




auth_api = Blueprint('auth', __name__)
db = Database()
users_collection = db.get_database["users"]



@auth_api.route('/auth/register', methods=['POST'])
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
        "password": hashed_password,
        "favorites": []
    }
    
    users_collection.insert_one(user)
    return jsonify({"message": "User created successfully"}), 201

@auth_api.route('/auth/login', methods=['POST'])
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
        "userId": str(user['_id']),
        "username": user['username'],
        "email": user['email'],
        "favorites": user['favorites']
    }), 200 
@auth_api.route('/api/users/update', methods=['PUT'])
def update_user():
    data = request.get_json()
    print("Données reçues:", data)

    if not data or 'userId' not in data or 'username' not in data or 'email' not in data:
        return jsonify({
            "error": "Missing required fields",
            "data_received": data
        }), 400

    user_id = data['userId']
    username = data['username']
    email = data['email']

    try:
        user_id = ObjectId(user_id)
    except Exception as e:
        print(f"Erreur de conversion de userId: {e}")
        return jsonify({"error": "Invalid user ID"}), 400

    user = users_collection.find_one({"_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404

    result = users_collection.update_one(
        {"_id": user_id},
        {"$set": {"username": username, "email": email}}
    )

    if result.modified_count == 0:
        return jsonify({"message": "Aucune modification effectuée"}), 200

    return jsonify({"message": "Profil mis à jour avec succès"}), 200


@auth_api.route('/api/users/favorites', methods=['POST', 'GET'])
def favorites_cocktails():
    data = request.get_json()
    print("Données reçues:", data)

    if not data or 'userId' not in data:
        return jsonify({"error": "Missing required fields"}), 400

    user_id = data['userId']

    try:
        user_id = ObjectId(user_id)
    except Exception as e:
        print(f"Erreur de conversion de userId: {e}")
        return jsonify({"error": "Invalid user ID"}), 400

    user = users_collection.find_one({"_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404

    favorites = user.get('favorites', [])
    print("Favoris ffffffffffffffff: ", favorites)
    return jsonify(favorites), 200



@auth_api.route('/api/users/add-favorite', methods=['POST'])
def add_favorite():
    data = request.get_json()
    #print("Données reçues:", data)

    user_id = data['userId']
    favorites = data['newFavoriteCocktail']

    try:
        user_id = ObjectId(user_id)
    except Exception as e:
        print(f"Erreur de conversion de userId: {e}")
        return jsonify({"error": "Invalid user ID"}), 400
    
    user = users_collection.find_one({"_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404

    result = users_collection.update_one(
        {"_id": user_id},
        {"$set": {"favorites": favorites}}
    )

    return jsonify({"message": "ok"}), 200


@auth_api.route('/api/users/remove-favorite', methods=['POST'])
def remove_favorite():
    pass