from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required

from ..models.user import User
from ..models.booking import Booking
from ..models.service_request import ServiceRequest
from ..models.career import CareerApplication

admin_bp = Blueprint('admin', __name__)


def _require_admin():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user or user.role not in {'admin', 'super_admin'}:
        return None
    return user


@admin_bp.get('/dashboard')
@jwt_required()
def dashboard():
    user = _require_admin()
    if user is None:
        return {'error': 'admin access required'}, 403

    return {
        'stats': {
            'users': User.query.count(),
            'bookings': Booking.query.count(),
            'service_requests': ServiceRequest.query.count(),
            'applications': CareerApplication.query.count(),
        }
    }, 200
