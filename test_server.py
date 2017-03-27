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
        assert(len(res['data']) > server.app_config['nlearn'])

    def test_get_cards_learn(self):
        res = get_cards_learn(self.app)
        assert('data' in res)
        assert(len(res['data']) == server.app_config['nlearn'])

    def test_add_card(self):
        res = add_card(self.app, 'f1', 'b1')
        assert('front' in res)
        assert('back' in res)
        assert('f1' in res['front'])
        assert('b1' in res['back'])

    def test_delete_card(self):
        res = add_card(self.app, 'f2', 'b2')
        assert('id' in res)
        delete_card(self.app, res['id'])
        assert_card_status(self.app, res['id'], 404)

    def test_update_card(self):
        cid = 1
        res = get_card(self.app, cid)
        front = res['data']['front'] + '-updated'
        back = res['data']['back'] + '-updated'
        update_card(self.app, cid, {'front': front, 'back': back})
        res = get_card(self.app, cid)
        assert(res['data']['front'].find('updated') > 0)
        assert(res['data']['back'].find('updated') > 0)

    def test_update_card_level(self):
        cid = 1
        res = get_card(self.app, cid)
        level = res['data']['level']
        pretime = res['data']['learntime']
        update_card(self.app, res['data']['id'], {'level': level + 1})
        res = get_card(self.app, cid)
        assert(res['data']['learntime'] == pretime)
        assert(res['data']['level'] > level)

    def test_learn(self):
        precard = get_card(self.app, 1)
        update_list = [[1, 2], [2, 3]]
        learn(self.app, update_list)
        card = get_card(self.app, 1)
        assert(card['data']['level'] == 2)
        assert(card['data']['learntime'] > precard['data']['learntime'])


API_URL = '/api/cards'


def get_cards(client):
    rv = client.get(API_URL)
    return json.loads(rv.data.decode('utf-8'))


def get_card(client, cid):
    rv = client.get(API_URL + '/' + str(cid))
    return json.loads(rv.data.decode('utf-8'))


def assert_card_status(client, cid, status_code):
    rv = client.get(API_URL + '/' + str(cid))
    assert(rv.status_code == status_code)


def delete_card(client, cid):
    rv = client.delete(API_URL + '/' + str(cid))
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


def update_card(client, cid, dic):
    rv = client.put(API_URL + '/' + str(cid),
                    data=json.dumps(dic),
                    content_type='application/json')
    return json.loads(rv.data.decode('utf-8'))


def learn(client, update_list):
    rv = client.put(API_URL + '/learn',
                    data=json.dumps(update_list),
                    content_type='application/json')
    return json.loads(rv.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
