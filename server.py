#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder='dist')
PORT = 8080
if len(sys.argv) == 2:
    PORT = sys.argv[1]


@app.route('/api/cards', methods=['GET'])
def get_cards():
    return jsonify({'data': [
        {'id': 1, 'front': 'hoge', 'back': 'fuga', 'level': 0},
        {'id': 2, 'front': 'hoge2', 'back': 'fuga3', 'level': 1},
    ]})


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route('/<path:path>', methods=['GET'])
def top(path):
    return send_from_directory('dist', path)


if __name__ == '__main__':
    app.run(port=PORT)
