from datetime import datetime

from .. import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(120), nullable=True)
    last_name = db.Column(db.String(120), nullable=True)
    phone = db.Column(db.String(40), nullable=True)
    villa_number = db.Column(db.String(80), nullable=True)
    role = db.Column(db.String(50), nullable=False, default='resident')
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    is_verified = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    bookings = db.relationship('Booking', back_populates='user', lazy=True)
    service_requests = db.relationship('ServiceRequest', back_populates='user', lazy=True)
    messages = db.relationship('Message', back_populates='user', lazy=True)
    applications = db.relationship('CareerApplication', back_populates='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'villa_number': self.villa_number,
            'role': self.role,
            'is_active': self.is_active,
            'is_verified': self.is_verified,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
