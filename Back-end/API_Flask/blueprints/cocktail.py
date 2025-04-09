from flask import Blueprint, request, jsonify
from API_Flask.database import Database

cocktail_api = Blueprint('cocktail', __name__)
db = Database()
cocktail_collection = db.get_database["cocktails"]

# TODO
# Ajouter les routes suivantes:
# Frontend pour les routes:
# - Créer un cocktail
# Lister les cocktails avec filtres (route supplémentaire)

@cocktail_api.route('/api/cocktail/list', methods=['GET'])
def get_cocktails():
    try:
        cocktails = list(cocktail_collection.find())
        for cocktail in cocktails:
            cocktail['_id'] = str(cocktail['_id'])
        return jsonify(cocktails)
    except Exception as e:
        print("Erreur:", e)
        return jsonify({"error": "Erreur lors de la récupération des cocktails"}), 500

@cocktail_api.route('/api/cocktail/new', methods=['POST'])
def create_cocktail():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Aucune donnée fournie"}), 400
    
    try:
        cocktail_collection.insert_one(data)
        return jsonify({"message": "Cocktail créé avec succès"}), 201
    except Exception as e:
        print("Erreur:", e)
        return jsonify({"error": "Erreur lors de la création du cocktail"}), 500

@cocktail_api.route('/api/cocktail/search', methods=['GET'])
def search_cocktails():
    query = request.args.get('q', '')
    if not query:
        return jsonify({"error": "Aucun terme de recherche fourni"}), 400
    
    try:
        cocktails = list(cocktail_collection.find({
            "$or": [
                {"name": {"$regex": query, "$options": "i"}},
                {"ingredients": {"$regex": query, "$options": "i"}}
            ]
        }))
        
        for cocktail in cocktails:
            cocktail['_id'] = str(cocktail['_id'])
        return jsonify(cocktails)
    except Exception as e:
        print("Erreur:", e)
        return jsonify({"error": "Erreur lors de la recherche"}), 500

@cocktail_api.route('/api/cocktail/detail/<id>', methods=['GET'])
def get_cocktail_detail(id):
    try:
        cocktail = cocktail_collection.find_one({"_id": id})
        if not cocktail:
            return jsonify({"error": "Cocktail non trouvé"}), 404
        
        cocktail['_id'] = str(cocktail['_id'])
        return jsonify(cocktail)
    except Exception as e:
        print("Erreur:", e)
        return jsonify({"error": "Erreur lors de la récupération du cocktail"}), 500

@cocktail_api.route('/api/cocktail/update/<id>', methods=['PUT'])
def update_cocktail(id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "Aucune donnée fournie"}), 400
    
    try:
        result = cocktail_collection.update_one(
            {"_id": id},
            {"$set": data}
        )
        if result.modified_count == 0:
            return jsonify({"error": "Cocktail non trouvé"}), 404
        return jsonify({"message": "Cocktail mis à jour avec succès"}), 200
    except Exception as e:
        print("Erreur:", e)
        return jsonify({"error": "Erreur lors de la mise à jour du cocktail"}), 500

@cocktail_api.route('/api/cocktail/delete/<id>', methods=['DELETE'])
def delete_cocktail(id):
    try:
        result = cocktail_collection.delete_one({"_id": id})
        if result.deleted_count == 0:
            return jsonify({"error": "Cocktail non trouvé"}), 404
        return jsonify({"message": "Cocktail supprimé avec succès"}), 200
    except Exception as e:
        print("Erreur:", e)
        return jsonify({"error": "Erreur lors de la suppression du cocktail"}), 500

