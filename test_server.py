#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import unittest
import server
import tempfile
import json


class FlaskrTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, self.dbpath = tempfile.mkstemp()
        server.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + self.dbpath
        server.app.config['TESTING'] = True
        self.app = server.app.test_client()
        server.init_db()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(self.dbpath)

    def test_get_card(self):
        res = get_card(self.app, 1)
        assert('data' in res)

    def test_get_cards(self):
        res = get_cards(self.app)
        assert('data' in res)
        assert(len(res['data']) > server.config['nlearn'])

    def test_get_cards_learn(self):
        res = get_cards_learn(self.app)
        assert('data' in res)
        assert(len(res['data']) == server.config['nlearn'])

    def test_add_card(self):
        res = add_card(self.app, 'f1', 'b1')
        assert('front' in res)
        assert('back' in res)
        assert('f1' in res['front'])
        assert('b1' in res['back'])


API_URL = '/api/cards'


def get_cards(client):
    rv = client.get(API_URL)
    return json.loads(rv.data.decode('utf-8'))


def get_card(client, cid):
    rv = client.get(API_URL + '/' + str(cid))
    return json.loads(rv.data.decode('utf-8'))


def get_cards_learn(client):
    param = 'learn=1'
    rv = client.get('?'.join((API_URL, param)))
    return json.loads(rv.data.decode('utf-8'))


def add_card(client, front, back):
    rv = client.post(API_URL,
                     data=json.dumps({'front': front, 'back': back}),
                     content_type='application/json')
    return json.loads(rv.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
