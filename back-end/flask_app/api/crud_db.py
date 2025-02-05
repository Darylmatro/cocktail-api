from pymongo import MongoClient
from flask import jsonify, request

client = MongoClient('localhost', 27017)
db = client['TEST_cocktail_db']
coll = db['TEST_cocktail_collection']

'''
format des données dans les collections:
{
    "id": int,
    "Nom": str,
    "Alcool": bool,
    "Degres": float,
    "Ingredients": {"ingredient": "quantity"},
    "Recette": str
}



format pour le test:
{
    "Nom": str,
    "Alcool": float,
    "Ingredients": [{"ingredient": "quantity"}]
}
'''


def create_data():
    content = request.json
    coll.insert_one(content)
    return "Data Created"


def read_data():
    content = request.json
    view_query = []
    pulled_data = coll.find({"Nom":content['Nom']})
    for e in pulled_data:
        view_query.append({"Nom":e['Nom'], "Alcool": e['Alcool']})
    return jsonify(view_query)


def update_data():
    content = request.json
    value = {"$set" :{"Alcool":content['Alcool']}}
    coll.update_one({"Nom":content['Nom']}, value)
    return "Data updated"


def delete_data():
    content = request.json
    coll.delete_one({"Nom":content['Nom']})
    return "Data deleted"


# Créer un cocktail
def create_cocktail():
    data = request.json
    try:
        new_cocktail = {
            "Nom": data["Nom"],
            "Alcool": data["Alcool"],
            "Degres": data["Degres"],
            "Ingredients": data["Ingredients"],
            "Recette": data["Recette"],
            "Auteur": data["Auteur"],
            "Date_Creation": datetime.utcnow()
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
def get_cocktail_by_name():
    data = request.json
    cocktail = coll.find_one({"Nom": data["Nom"]}, {"_id": False})
    if cocktail:
        return jsonify(cocktail)
    return jsonify({"message": "Cocktail introuvable"}), 404

# Maj d'un cocktail
def update_cocktail():
    data = request.json
    coll.update_one({"Nom": data["Nom"]}, {"$set": data})
    return jsonify({"message": "Cocktail mis à jour !"})

# Supprimer un cocktail
def delete_cocktail():
    data = request.json
    coll.delete_one({"Nom": data["Nom"]})
    return jsonify({"message": "Cocktail supprimé !"})