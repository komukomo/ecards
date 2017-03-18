#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
from flask import Flask, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='dist')
app.config['SQLALCHEMY_DATABASE_URL'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)
PORT = 8080
if len(sys.argv) == 2:
    PORT = sys.argv[1]


@app.route('/api/cards', methods=['GET'])
def get_cards():
    cards = Card.query.all()
    jcards = list(map(lambda x: x.to_json(), cards))
    return jsonify({'data': jcards})


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route('/<path:path>', methods=['GET'])
def top(path):
    return send_from_directory('dist', path)


class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    front = db.Column(db.String)
    back = db.Column(db.String)
    level = db.Column(db.Integer)
    learntime = db.Column(db.DateTime)

    def __init__(self, front, back):
        self.front = front
        self.back = back

    def to_json(self):
        return {
            'id': self.id,
            'front': self.front,
            'back': self.back,
            'level': self.level,
            'learntime': self.learntime,
        }


def init_db():
    db.create_all()
    sample_cards = [
        ['1front message', 'answer'],
        ['2front message', '2answer'],
        ['3front message', 'answer'],
        ['4front message', 'answer'],
    ]
    for card in sample_cards:
        c = Card(*card)
        db.session.add(c)

    db.session.commit()


if __name__ == '__main__':
    init_db()
    app.run(port=PORT)
