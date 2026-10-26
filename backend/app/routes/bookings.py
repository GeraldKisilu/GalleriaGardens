from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from .. import db
from ..models.booking import Booking

bookings_bp = Blueprint('bookings', __name__)


@bookings_bp.get('/')
@jwt_required()
def list_bookings():
    user_id = int(get_jwt_identity())
    bookings = Booking.query.filter_by(user_id=user_id).order_by(Booking.created_at.desc()).all()
    return {'docs': [b.to_dict() for b in bookings]}, 200


@bookings_bp.post('/')
@jwt_required()
def create_booking():
    payload = request.get_json(silent=True) or {}
    user_id = int(get_jwt_identity())
    booking = Booking(
        user_id=user_id,
        property_id=payload.get('property_id'),
        booking_date=payload.get('booking_date'),
        amount=payload.get('amount', 0),
        currency=payload.get('currency', 'KES'),
        status='pending',
    )
    db.session.add(booking)
    db.session.commit()
    return booking.to_dict(), 201
