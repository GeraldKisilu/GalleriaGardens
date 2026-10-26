from datetime import datetime

from .. import db

property_amenity = db.Table(
    'property_amenity',
    db.Column('property_id', db.Integer, db.ForeignKey('properties.id'), primary_key=True),
    db.Column('amenity_id', db.Integer, db.ForeignKey('amenities.id'), primary_key=True),
)


class Property(db.Model):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), nullable=False, unique=True, index=True)
    description = db.Column(db.Text, nullable=True)
    listing_type = db.Column(db.String(50), default='rent')
    price = db.Column(db.Float, nullable=False, default=0)
    price_suffix = db.Column(db.String(50), nullable=True)
    availability = db.Column(db.String(50), default='available')
    bedrooms = db.Column(db.Integer, default=0)
    bathrooms = db.Column(db.Integer, default=0)
    land_size = db.Column(db.String(120), nullable=True)
    location = db.Column(db.String(255), nullable=True)
    featured_image_url = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    bookings = db.relationship('Booking', back_populates='property', lazy=True)
    service_requests = db.relationship('ServiceRequest', back_populates='property', lazy=True)
    amenities = db.relationship('Amenity', secondary=property_amenity, back_populates='properties', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'slug': self.slug,
            'description': self.description,
            'listingType': self.listing_type,
            'price': self.price,
            'priceSuffix': self.price_suffix,
            'availability': self.availability,
            'bedrooms': self.bedrooms,
            'bathrooms': self.bathrooms,
            'landSize': self.land_size,
            'location': self.location,
            'featuredImage': {'url': self.featured_image_url} if self.featured_image_url else None,
        }


class Amenity(db.Model):
    __tablename__ = 'amenities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    properties = db.relationship('Property', secondary=property_amenity, back_populates='amenities', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': {'url': self.image_url} if self.image_url else None,
        }
