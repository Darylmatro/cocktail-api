from pymongo import MongoClient
from flask import jsonify, request

from datetime import datetime

client = MongoClient('localhost', 27017)
db = client['TEST_cocktail_db']
coll = db['TEST_cocktail_collection']



# Créer un cocktail
def create_cocktail():
    data = request.json
    try:
        new_cocktail = {
            "name": data["name"],
            "alcohol": data["alcohol"],
            "degres": data["degres"],
            "ingredients": data["ingredients"], #liste d'éléments clé-valeur
            "recipe": data["recipe"],
            "author": data["author"],
            "date": datetime.now()
        }
        coll.insert_one(new_cocktail)
        return jsonify({"message": "Cocktail ajouté !"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Lecture de  tous les cocktails
def get_cocktails():
    cocktails = list(coll.find({}, {"_id": False}))
    return jsonify(cocktails)

# Lecture d'un cocktail par son nom
#def get_cocktail_by_name(filter : str):
def get_cocktail_by_name():
    data = request.json
    cocktail = coll.find_one({"name": data["name"]}, {"_id": False})
    # cocktail = coll.find_one({"name": data[filter]}, {"_id": False})
    if cocktail:
        return jsonify(cocktail)
    return jsonify({"message": "Cocktail introuvable"}), 404

# Maj d'un cocktail
def update_cocktail():
    data = request.json
    coll.update_one({"name": data["name"]}, {"$set": data})
    return jsonify({"message": "Cocktail mis à jour !"})

# Supprimer un cocktail
def delete_cocktail():
    data = request.json
    coll.delete_one({"name": data["name"]})
    return jsonify({"message": "Cocktail supprimé !"})