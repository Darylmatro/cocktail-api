from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


class Database:

    def __init__(self):
        self.url = "mongodb+srv://samuelmorisson:cocktail-db@cocktail-database.zknan.mongodb.net/?appName=cocktail-database"

        self._connection = MongoClient(self.url, server_api=ServerApi('1'))
        self._database = self._connection["cocktail-db"]
        #self._collection = self._database[collection]
        print("Connecté à la base de données")

    def ping_db(self):
        try:
            self._connection.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print("ERREUR de connexion à la base de données")
            print(e)

    @property
    def get_connection(self):
        return self._connection
    
    '''@property
    def get_collection(self):
        return self._collection'''
    
    @property
    def get_database(self):
        return self._database