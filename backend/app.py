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
