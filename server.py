#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import datetime
import json

app = Flask(__name__, static_folder='dist')
db = SQLAlchemy(app)

DATE_FORMAT = "%Y-%m-%d %H:%M:%S"
NLEARN_DEFAULT = 10
PPAGE_DEFAULT = 10
app_config = {
    'nlearn': NLEARN_DEFAULT,
    'ppage': PPAGE_DEFAULT,
}


def read_config(env='dev'):
    with open('serverconf.' + env + '.json') as f:
        config = json.load(f)
    return config


@app.route('/api/cards', methods=['GET'])
def get_cards():
    learn = request.args.get('learn', False)
    if learn:
        cards = get_cards_for_learning(app_config['nlearn'])
    else:
        page = request.args.get('p', 0)
        cards = get_cards_all(num=app_config['ppage'], page=int(page))
    jcards = list(map(lambda x: x.to_json(), cards))
    return jsonify({'data': jcards})


@app.route('/api/cards/<card_id>', methods=['GET'])
def get_card(card_id):
    card = get_card_by_id(card_id)
    if card:
        return jsonify({'data': card.to_json()})
    return api_error()


@app.route('/api/cards', methods=['POST'])
def add_cards():
    data = request.json
    card = Card(**data)
    db.session.add(card)
    db.session.commit()
    return jsonify(card.to_json())


@app.route('/api/cards/<card_id>', methods=['DELETE'])
def delete_card(card_id):
    status = delete_card_by_id(card_id)
    if status > 0:
        db.session.commit()
        # TODO what should the API return ?
        return jsonify({'message': 'delete card'}), 200
    return api_error()


@app.route('/api/cards/<card_id>', methods=['PUT'])
def update_card(card_id):
    data = request.json
    card = update_card_by_id(card_id, data)
    db.session.commit()
    return jsonify(card.to_json())


@app.route('/api/cards/learn', methods=['PUT'])
def update_levels():
    data = request.json
    for d in data:
        card_id = d[0]
        data = {'level': d[1]}
        update_card_by_id(card_id, data, update_date=True)
    db.session.commit()
    return jsonify({'status': 'ok'})


@app.route('/', methods=['GET'])
@app.route('/cards', methods=['GET'])
@app.route('/learning', methods=['GET'])
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
        self.learntime = datetime.datetime.now()
        self.level = 0

    def to_json(self):
        return {
            'id': self.id,
            'front': self.front,
            'back': self.back,
            'level': self.level,
            'learntime': self.learntime.strftime(DATE_FORMAT),
        }


def get_card_by_id(cid):
    return Card.query.filter_by(id=cid).first()


def get_cards_all(num=10, page=0):
    print(num * page)
    return Card.query.limit(num).offset(num * page)


def get_cards_for_learning(num):
    now = datetime.datetime.now()
    return Card.query.filter(Card.learntime < now).limit(num)


def delete_card_by_id(cid):
    return Card.query.filter_by(id=cid).delete()


def update_card_by_id(cid, data, update_date=False):
    card = get_card_by_id(cid)
    if 'front' in data and data['front'] != card.front:
        card.front = data['front']
    if 'back' in data and data['back'] != card.back:
        card.back = data['back']
    if 'level' in data:
        if data['level'] != card.level:
            card.level = max(0, data['level'])
        if update_date:
            update_learndate(card)

    return card


def update_learndate(card):
    now = datetime.datetime.now()
    addtime = datetime.timedelta(minutes=3, hours=15 * pow(card.level, 1.5))
    card.learntime = now + addtime


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


def api_error():
    return jsonify({'message': 'no such card'}), 404


if __name__ == '__main__':
    env = sys.argv[1] if len(sys.argv) > 1 else 'dev'
    config = read_config(env)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + config['dbpath']
    if not os.path.exists(config['dbpath']):
        init_db()

    app.run(port=config['port'], host=config['host'])
