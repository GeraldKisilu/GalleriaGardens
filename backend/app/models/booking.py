from datetime import datetime

from .. import db


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), default='pending')
    amount = db.Column(db.Float, nullable=False, default=0)
    currency = db.Column(db.String(20), default='KES')
    payment_status = db.Column(db.String(50), default='unpaid')
    stripe_checkout_session_id = db.Column(db.String(255), nullable=True)
    stripe_payment_intent_id = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = db.relationship('User', back_populates='bookings')
    property = db.relationship('Property', back_populates='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'property_id': self.property_id,
            'booking_date': self.booking_date.isoformat() if self.booking_date else None,
            'status': self.status,
            'amount': self.amount,
            'currency': self.currency,
            'payment_status': self.payment_status,
            'stripe_checkout_session_id': self.stripe_checkout_session_id,
            'stripe_payment_intent_id': self.stripe_payment_intent_id,
        }
