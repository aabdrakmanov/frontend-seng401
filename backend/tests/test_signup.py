
import unittest
from unittest import mock
from frontendseng401.backend import signup

def mocked_requests_get(*args, **kwargs):
    class MockResponse:
        def __init__(self, json_data,status_code):
            self.json_data=json_data
            self.status_code=status_code
            
        def json(self):
            return self.json_data
            
    if args[0] =='http://localhost:3000/api/signup' :
        return MockResponse({"key 1" : "value1"}, 200)
    return MockResponse(None, 404)
        
class signupTestCase(unittest.TestCase):

       @mock.patch('request.get', side_effect=mocked_request_get)
       def test_fetch(self, mock_get):
        json_data=signup()
        self.assertEqual(json_data, {"key1" : "value1"})
        
        
if __name__=='__main__':
    unittest.main()