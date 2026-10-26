from flask import Blueprint, request
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

from .. import db
from ..models.user import User

auth_bp = Blueprint('auth', __name__)


@auth_bp.post('/register')
def register():
    payload = request.get_json(silent=True) or {}
    email = (payload.get('email') or '').strip().lower()
    password = payload.get('password')
    first_name = (payload.get('first_name') or '').strip() or None
    last_name = (payload.get('last_name') or '').strip() or None
    phone = (payload.get('phone') or '').strip() or None
    villa_number = (payload.get('villaNumber') or payload.get('villa_number') or '').strip() or None

    if not email or not password:
        return {'error': 'email and password are required'}, 400

    if len(password) < 8:
        return {'error': 'password must be at least 8 characters'}, 400

    if User.query.filter_by(email=email).first():
        return {'error': 'user already exists'}, 409

    user = User(
        email=email,
        password_hash=generate_password_hash(password),
        first_name=first_name,
        last_name=last_name,
        phone=phone,
        villa_number=villa_number,
        role='resident',
    )
    db.session.add(user)
    db.session.commit()

    return {
        'message': 'user registered successfully',
        'user': user.to_dict(),
    }, 201


@auth_bp.post('/login')
def login():
    payload = request.get_json(silent=True) or {}
    email = (payload.get('email') or '').strip().lower()
    password = payload.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return {'error': 'invalid credentials'}, 401

    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))

    return {
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': user.to_dict(),
    }, 200


@auth_bp.get('/me')
@jwt_required()
def me():
    user_id = int(get_jwt_identity())
    user = User.query.get_or_404(user_id)
    return {'user': user.to_dict()}, 200
