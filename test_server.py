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

    def test_get_cards(self):
        res = get_cards(self.app)
        print('data' in res)


API_URL = '/api/cards'


def get_cards(client):
    rv = client.get(API_URL)
    return json.loads(rv.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
