#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import datetime

app = Flask(__name__, static_folder='dist')
DB_PATH = '/tmp/test.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + DB_PATH
db = SQLAlchemy(app)
PORT = 8080
if len(sys.argv) == 2:
    PORT = sys.argv[1]

NLEARN_DEFAULT = 10
config = {
    'nlearn': NLEARN_DEFAULT
}


@app.route('/api/cards', methods=['GET'])
def get_cards():
    learn = request.args.get('learn', False)
    if learn:
        cards = get_cards_for_learning(config['nlearn'])
    else:
        cards = get_cards_all()
    jcards = list(map(lambda x: x.to_json(), cards))
    return jsonify({'data': jcards})


@app.route('/api/cards/<card_id>', methods=['GET'])
def get_card(card_id):
    card = get_card_by_id(card_id)
    return jsonify({'data': card.to_json()})


@app.route('/api/cards', methods=['POST'])
def add_cards():
    data = request.json
    card = Card(**data)
    db.session.add(card)
    db.session.commit()
    return jsonify(card.to_json())


@app.route('/api/cards/<card_id>', methods=['PUT'])
def update_card(card_id):
    data = request.json
    card = update_card_by_id(card_id, data)
    db.session.commit()
    return jsonify(card.to_json())


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
        self.learntime = datetime.datetime.min
        self.level = 0

    def to_json(self):
        return {
            'id': self.id,
            'front': self.front,
            'back': self.back,
            'level': self.level,
            'learntime': self.learntime,
        }


def get_card_by_id(cid):
    return Card.query.filter_by(id=cid).first()


def get_cards_all():
    return Card.query.all()


def get_cards_for_learning(num):
    now = datetime.datetime.now()
    return Card.query.filter(Card.learntime < now).limit(num)


def update_card_by_id(cid, data):
    card = get_card_by_id(cid)
    if 'front' in data and data['front'] != card.front:
        card.front = data['front']
    if 'back' in data and data['back'] != card.back:
        card.back = data['back']
    if 'level' in data and data['level'] != card.level:
        card.level = max(0, data['level'])
        now = datetime.datetime.now()
        addtime = datetime.timedelta(hours=10)
        card.learntime = now + addtime
    return card


def init_db():
    db.create_all()
    sample_cards = [
        ['1front message', 'answer'],
        ['2front message', '2answer'],
        ['3front message', 'answer'],
        ['4front message', 'answer'],
        ['5front message', 'answer'],
        ['6front message', 'answer'],
        ['7front message', 'answer'],
        ['8front message', 'answer'],
        ['9front message', 'answer'],
        ['10front message', 'answer'],
        ['11front message', 'answer'],
    ]
    for card in sample_cards:
        c = Card(*card)
        db.session.add(c)

    db.session.commit()


if __name__ == '__main__':
    if not os.path.exists(DB_PATH):
        init_db()
    app.run(port=PORT)
