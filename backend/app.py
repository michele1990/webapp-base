from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import psycopg2
import bcrypt
from flask_jwt_extended import get_jwt_identity


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Replace with a secure key
jwt = JWTManager(app)

def get_db_connection():
    # Adjust the connection parameters as needed for your setup
    connection = psycopg2.connect(
        host="db",
        database="webapp",
        user="username",
        password="password"
    )
    return connection

@app.route('/api/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')

    # Hash the password
    pwd_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("INSERT INTO users (username, pwd_hash, email) VALUES (%s, %s, %s)", (username, pwd_hash, email))
        connection.commit()
    except psycopg2.IntegrityError:
        # Handle duplicate username or email
        connection.rollback()
        cursor.close()
        connection.close()
        return jsonify(message="Username or email already exists"), 400

    cursor.close()
    connection.close()

    # Automatically log in after registration
    return login()

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Check if the username and password are valid
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT id, pwd_hash FROM users WHERE username = %s", (username,))
    result = cursor.fetchone()

    cursor.close()
    connection.close()

    if result is None or not bcrypt.checkpw(password.encode('utf-8'), result[1].encode('utf-8')):
        # If username doesn't exist or password is incorrect
        return jsonify(message="Invalid credentials"), 403

    # If username and password are valid, create the access token using the user's ID
    user_id = result[0]
    access_token = create_access_token(identity=user_id)
    return jsonify(access_token=access_token, message=f'Hello, {username}!'), 200



@app.route('/api/profile', methods=['POST'])
@jwt_required()
def create_profile():
    user_id = get_jwt_identity()
    connection = get_db_connection()
    cursor = connection.cursor()

    profile_data = request.json
    try:
        cursor.execute("INSERT INTO profiles (user_id, first_name, last_name, phone, address, about_me) VALUES (%s, %s, %s, %s, %s, %s)",
                       (user_id, profile_data['first_name'], profile_data['last_name'], profile_data['phone'], profile_data['address'], profile_data['about_me']))
        connection.commit()
        return jsonify(message="Profile created successfully"), 200
    except Exception as e:
        connection.rollback()
        print(e)
        return jsonify(message="Error handling profile"), 400
    finally:
        cursor.close()
        connection.close()


@app.route('/api/profile/<username>', methods=['GET', 'PUT'])
@jwt_required()
def manage_profile(username):
    user_id = get_jwt_identity()
    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        if request.method == 'GET':
            cursor.execute("SELECT first_name, last_name, phone, address, about_me FROM profiles WHERE username = %s", (username,))
            profile = cursor.fetchone()
            return jsonify(profile) if profile else jsonify(message="Profile not found"), 404

        profile_data = request.json
        cursor.execute("UPDATE profiles SET first_name=%s, last_name=%s, phone=%s, address=%s, about_me=%s WHERE username=%s",
                       (profile_data['first_name'], profile_data['last_name'], profile_data['phone'], profile_data['address'], profile_data['about_me'], username))
        connection.commit()
        return jsonify(message="Profile updated successfully"), 200

    except Exception as e:
        connection.rollback()
        print(e)
        return jsonify(message="Error handling profile"), 400
    finally:
        cursor.close()
        connection.close()




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
