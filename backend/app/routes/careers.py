from flask import Blueprint, request

from .. import db
from ..models.career import Career, CareerApplication

careers_bp = Blueprint('careers', __name__)


@careers_bp.get('/')
def list_careers():
    careers = Career.query.filter_by(is_active=True).all()
    return {'docs': [c.to_dict() for c in careers]}, 200


@careers_bp.get('/<int:career_id>')
def get_career(career_id):
    career = Career.query.get_or_404(career_id)
    return career.to_dict(), 200


@careers_bp.post('/<int:career_id>/apply')
def apply(career_id):
    payload = request.get_json(silent=True) or {}
    application = CareerApplication(
        career_id=career_id,
        full_name=payload.get('full_name'),
        email=payload.get('email'),
        phone=payload.get('phone'),
        cover_letter=payload.get('cover_letter'),
        resume_url=payload.get('resume_url'),
    )
    db.session.add(application)
    db.session.commit()
    return application.to_dict(), 201
