from flask import Flask, jsonify, request, make_response, send_from_directory
import json
import os

app = Flask(__name__)

def write_json(path, json_data):
    with open(path, 'w') as file_out:
        json.dump(json_data, file_out)


def read_json(path):
    with open(path) as file_in:
        return json.load(file_in)

@app.route('/<path:path>')
def index(path):
    return send_from_directory('../public', path)

@app.route('/list_configs')
def list_configs():
    return jsonify(os.listdir("config"))

@app.route('/get_config', methods=['POST'])
def get_config():
    data = json.loads(request.data)
    config = read_json('config/'+data['name'])
    return jsonify(config)

@app.route('/update_config', methods=['POST'])
def update_config():
    data = json.loads(request.data)
    write_json('config/'+data['name'], data['config'])
    resp  = {'message': 'Updated', 'code': 'SUCCESS'}
    return make_response(jsonify(resp), 201)