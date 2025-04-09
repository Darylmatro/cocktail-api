from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import sys
import time


class Database:

    def __init__(self):
        print("Tentative de connexion à MongoDB...")
        self.url = "mongodb+srv://samuelmorisson:cocktail-db@cocktail-database.zknan.mongodb.net/?appName=cocktail-database"
        max_retries = 3
        retry_delay = 2  # secondes
        
        for attempt in range(max_retries):
            try:
                print(f"Tentative de connexion {attempt + 1}/{max_retries}...")
                self._connection = MongoClient(self.url, server_api=ServerApi('1'), connectTimeoutMS=5000)
                self._database = self._connection["cocktail-db"]
                
                # Tester la connexion immédiatement
                if self.ping_db():
                    print("Connecté à la base de données avec succès")
                    return
                
            except Exception as e:
                print(f"ERREUR lors de la tentative {attempt + 1}: {str(e)}", file=sys.stderr)
                if attempt < max_retries - 1:
                    print(f"Nouvelle tentative dans {retry_delay} secondes...")
                    time.sleep(retry_delay)
                else:
                    print("ERREUR CRITIQUE: Impossible de se connecter à la base de données après plusieurs tentatives", file=sys.stderr)
                    sys.exit(1)

    def ping_db(self):
        try:
            print("Test de connexion à la base de données...")
            result = self._connection.admin.command('ping')
            print("Ping réussi:", result)
            return True
        except Exception as e:
            print(f"ERREUR lors du ping: {str(e)}", file=sys.stderr)
            raise e

    @property
    def get_connection(self):
        return self._connection
    
    '''@property
    def get_collection(self):
        return self._collection'''
    
    @property
    def get_database(self):
        return self._database