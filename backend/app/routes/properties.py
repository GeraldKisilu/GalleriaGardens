from flask import Blueprint, request

from .. import db
from ..models.property import Property, Amenity

properties_bp = Blueprint('properties', __name__)


@properties_bp.get('/')
def list_properties():
    query = Property.query.order_by(Property.created_at.desc())
    return {'docs': [p.to_dict() for p in query.all()]}, 200


@properties_bp.get('/<int:property_id>')
def get_property(property_id):
    property_record = Property.query.get_or_404(property_id)
    return property_record.to_dict(), 200


@properties_bp.post('/')
def create_property():
    payload = request.get_json(silent=True) or {}
    property_record = Property(
        title=payload.get('title'),
        slug=payload.get('slug') or payload.get('title', '').lower().replace(' ', '-'),
        description=payload.get('description'),
        listing_type=payload.get('listingType') or 'rent',
        price=payload.get('price', 0),
        price_suffix=payload.get('priceSuffix'),
        availability=payload.get('availability') or 'available',
        bedrooms=payload.get('bedrooms', 0),
        bathrooms=payload.get('bathrooms', 0),
        land_size=payload.get('landSize'),
        location=payload.get('location'),
        featured_image_url=payload.get('featuredImage') and payload.get('featuredImage').get('url'),
    )
    db.session.add(property_record)
    db.session.commit()
    return property_record.to_dict(), 201


@properties_bp.get('/amenities')
def list_amenities():
    query = Amenity.query.order_by(Amenity.id)
    return {'docs': [a.to_dict() for a in query.all()]}, 200
