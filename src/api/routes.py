"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods = ['POST'])
def singup():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_active = request.json.get("is_active", True)
    if User.query.filter_by(email = email).first() is not None:
        return jsonify({"msg" : "user already exist"}), 400

    new_user =  User(name = name, email = email, password = password, is_active = is_active)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg" : "user created"}), 201

@api.route('/login', methods = ['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    check_user = User.query.filter_by(email = email).first()
    if check_user is None:
        return jsonify({"msg" : "user doesnt exist"}), 404
    if password != check_user.password:
        return jsonify({"msg" : "password incorrect"})
    
    access_token = create_access_token(identity = check_user.email)
    return jsonify({"token":access_token, "user_id" : check_user.id})


@api.route('/profile', methods = ['GET'])
@jwt_required()
def get_profile():
    try: 

     current_user_email = get_jwt_identity()
     user = User.query.filter_by(email = current_user_email).first()

     if not user:
        return jsonify({"msg" : "user not found"})
    
     return jsonify({
        "name" : user.name,
        "email" : user.email,
        "id" : user.id
    })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

   




    
    



