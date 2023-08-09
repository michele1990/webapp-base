from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from google.oauth2 import id_token
from google.auth.transport import requests
import psycopg2

GOOGLE_CLIENT_ID = '651236571845-lv9cr9m7cve4mb9hvl92dmc85rqkq2n3.apps.googleusercontent.com'

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Replace with a secure key
jwt = JWTManager(app)

def get_db_connection():
    # Adjust the connection parameters as needed for your setup
    connection = psycopg2.connect(
        host="db",  # Using Docker Compose service name as host
        database="webapp",
        user="username",
        password="password"
    )
    return connection

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    
    # Check if the username exists in the database
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT username FROM users WHERE username = %s", (username,))
    result = cursor.fetchone()
    cursor.close()
    connection.close()

    if result is None:
        # If username doesn't exist, return a message without a token
        return jsonify(message="No access to this feature"), 403

    # If username exists, create the access token and return greeting
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token, message=f'Hello, {username}!'), 200

from google.oauth2 import id_token
from google.auth.transport import requests

GOOGLE_CLIENT_ID = 'your-google-client-id'

@app.route('/api/google_login', methods=['POST'])
def google_login():
    try:
        google_token = request.json.get('tokenId')
        # Verify Google token
        google_response = id_token.verify_oauth2_token(google_token, requests.Request(), GOOGLE_CLIENT_ID)
        if 'iss' not in google_response or google_response['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        google_id = google_response['sub']
        email = google_response['email']  # You can use the email as the username if you prefer

        # Check if the user exists in the database by Google ID
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT username FROM users WHERE google_id = %s", (google_id,))
        result = cursor.fetchone()

        if result is None:
            # Register the user if they don't exist
            cursor.execute("INSERT INTO users (username, google_id) VALUES (%s, %s) RETURNING username", (email, google_id))
            result = cursor.fetchone()

        cursor.close()
        connection.close()

        # Create the access token
        access_token = create_access_token(identity=result[0])
        return jsonify(access_token=access_token, message=f'Hello, {result[0]}!'), 200

    except ValueError:
        # Handle token verification failure
        return jsonify(message="Invalid Google token"), 403




@app.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT username FROM users")
    users = [row[0] for row in cursor.fetchall()]
    cursor.close()
    connection.close()
    return jsonify(users=users), 200




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
