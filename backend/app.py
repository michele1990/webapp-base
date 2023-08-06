from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import psycopg2

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
    # Validate the username if necessary
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

@app.route('/api//user', methods=['POST'])
@jwt_required()
def set_user():
    username = request.json.get('username')
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO users (username) VALUES (%s)", (username,))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify(message='User set'), 200

@app.route('/api//user', methods=['GET'])
@jwt_required()
def get_user():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT username FROM users ORDER BY id DESC LIMIT 1")
    username = cursor.fetchone()[0]
    cursor.close()
    connection.close()
    return jsonify(message=f'Hello, {username}!')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
