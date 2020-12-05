from bson import ObjectId
from flask import Flask, jsonify, request, json
from flask_cors import CORS
from bson.json_util import dumps
import pymongo

app = Flask(__name__)
CORS(app)
mongo_db_ip = "localhost"
mongo_db_port = "27017"


@app.route('/task', methods=['GET', 'POST'])
def task():
    if request.method == 'POST':
        try:
            tasks_collection = get_tasks_collection()
            data = json.loads(request.data.decode("utf-8"))
            _id = tasks_collection.insert_one(data)
            inserted_document = tasks_collection.find_one({"_id": _id.inserted_id})
            return jsonify(dumps(inserted_document))
        except:
            return jsonify('failed')

    elif request.method == 'GET':
        try:
            tasks_collection = get_tasks_collection()
            tasks_list = list(tasks_collection.find())
            json_dumps = dumps(tasks_list)
            return jsonify(json_dumps)
        except:
            return jsonify('failed')


@app.route('/task/<task_id>', methods=['GET', 'PUT', 'DELETE'])
def task_with_id(task_id):
    if request.method == 'GET':
        try:
            tasks_collection = get_tasks_collection()
            task = tasks_collection.find_one({'_id': ObjectId(task_id)})
            return jsonify(dumps(task))
        except:
            return jsonify('failed')

    if request.method == 'DELETE':
        try:
            tasks_collection = get_tasks_collection()
            result = tasks_collection.delete_one({'_id': ObjectId(task_id)})
            return jsonify(result.acknowledged)
        except:
            return jsonify('failed')

    if request.method == 'PUT':
        try:
            data = json.loads(request.data.decode("utf-8"))
            del data['_id']
            tasks_collection = get_tasks_collection()
            result = tasks_collection.update_one({'_id': ObjectId(task_id)}, {"$set": data})
            return jsonify(result.acknowledged)
        except:
            return jsonify('failed')


def get_tasks_collection():
    cv_db = get_db()
    return cv_db["tasks"]


def get_db(db_name="cvTask"):
    mongo_client = pymongo.MongoClient("mongodb://" + mongo_db_ip + ":" + mongo_db_port)
    return mongo_client[db_name]


if __name__ == '__main__':
    app.run()
