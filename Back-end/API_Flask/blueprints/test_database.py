from flask import Blueprint, request, jsonify
from API_Flask.database import Database

test_db = Blueprint('test_db', __name__)

connexion_test = Database()
test_collection = connexion_test.get_database["test-collection"]

@test_db.route('/test/list', methods=['GET', 'POST'])
def test_list():
    data_list = []
    for data in test_collection.find():
        data.pop("_id")
        data_list.append(data)
    return jsonify(data_list)


@test_db.route('/test/create', methods=['GET', 'POST'])
def test_create():
    data = request.json
    test_collection.insert_one(data)
    return jsonify({"message": "Données insérées"})


@test_db.route('/test/read', methods=['GET', 'POST'])
def test_read():
    searched_data = "test1"
    data_list = []
    for data in test_collection.find({"valeur":searched_data}):
        data.pop("_id")
        data_list.append(data)
    return jsonify(data)
    


@test_db.route('/test/update', methods=['GET', 'POST'])
def test_update(searched_data, updated_data):
    test_collection.update_one(searched_data, updated_data)
    return jsonify({"message": "Données mises à jour"})


@test_db.route('/test/delete', methods=['GET', 'POST'])
def test_delete(searched_data):
    test_collection.delete_one(searched_data)
    return jsonify({"message": "Données supprimées"})

