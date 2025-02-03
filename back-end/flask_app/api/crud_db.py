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
    pulled_data = coll.find({"name":content['name']})
    for e in pulled_data:
        view_query.append({"name":e['name'], "alcohol": e['alcohol']})
    return jsonify(view_query)


def update_data():
    content = request.json
    value = {"$set" :{"alcohol":content['alcohol']}}
    coll.update_one({"name":content['name']}, value)
    return "Data updated"


def delete_data():
    content = request.json
    coll.delete_one({"name":content['name']})
    return "Data deleted"


