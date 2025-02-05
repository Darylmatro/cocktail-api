from pymongo import MongoClient
from flask import jsonify, request


client = MongoClient('localhost', 27017)
db = client['TEST_cocktail_db']
coll = db['TEST_cocktail_collection']


def display_test():
    view_query = []
    pulled_data = coll.find({}, {'_id':False})
    for e in pulled_data:
        view_query.append(e)
    return jsonify(view_query)