from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from .. import db
from ..models.message import Message

messages_bp = Blueprint('messages', __name__)


@messages_bp.get('/')
@jwt_required()
def list_messages():
    user_id = int(get_jwt_identity())
    records = Message.query.filter_by(user_id=user_id).order_by(Message.created_at.desc()).all()
    return {'docs': [m.to_dict() for m in records]}, 200


@messages_bp.post('/')
@jwt_required()
def create_message():
    payload = request.get_json(silent=True) or {}
    user_id = int(get_jwt_identity())
    record = Message(
        user_id=user_id,
        sender_name=payload.get('sender_name') or 'Resident',
        subject=payload.get('subject'),
        body=payload.get('body'),
    )
    db.session.add(record)
    db.session.commit()
    return record.to_dict(), 201
