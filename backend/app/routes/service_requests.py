from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from .. import db
from ..models.service_request import ServiceRequest

service_requests_bp = Blueprint('service_requests', __name__)


@service_requests_bp.get('/')
@jwt_required()
def list_service_requests():
    user_id = int(get_jwt_identity())
    requests = ServiceRequest.query.filter_by(user_id=user_id).order_by(ServiceRequest.created_at.desc()).all()
    return {'docs': [r.to_dict() for r in requests]}, 200


@service_requests_bp.post('/')
@jwt_required()
def create_service_request():
    payload = request.get_json(silent=True) or {}
    user_id = int(get_jwt_identity())
    service_request = ServiceRequest(
        user_id=user_id,
        property_id=payload.get('property_id'),
        category=payload.get('category'),
        priority=payload.get('priority', 'normal'),
        description=payload.get('description'),
        status='open',
    )
    db.session.add(service_request)
    db.session.commit()
    return service_request.to_dict(), 201
