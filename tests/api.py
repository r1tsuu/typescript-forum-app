# pip3 install requests
import requests

PORT = 3000
baseUrl = 'http://localhost:' + str(PORT) + '/api'


def registerPost():
    url = baseUrl + '/user/register'
    data = {
        "username": "test_user2",
        "email": "test_user2@email.com",
        "password": "test_user_password"
    }
    headers = {'Content-type': 'application/json'}

    r = requests.post(url, json=data, headers=headers)
    print(data)
    return r.status_code, r.json()

def loginPost():
    url = baseUrl + '/user/auth'
    data = {
        "username": "test_user2",
        "password": "test_user_password"
    }
    headers = {'Content-type': 'application/json'}
    
    r = requests.post(url, json=data, headers=headers)
    print(data)
    return r.status_code, r.json()
    # (200, {'status': 'success', 'token': 'eyJhbGci....'})

def main():
    print(loginPost())

main()



