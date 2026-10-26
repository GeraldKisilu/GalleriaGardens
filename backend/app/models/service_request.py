from datetime import datetime

from .. import db


class ServiceRequest(db.Model):
    __tablename__ = 'service_requests'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=True)
    category = db.Column(db.String(120), nullable=False)
    priority = db.Column(db.String(50), default='normal')
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='open')
    assigned_to = db.Column(db.String(120), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = db.relationship('User', back_populates='service_requests')
    property = db.relationship('Property', back_populates='service_requests')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'property_id': self.property_id,
            'category': self.category,
            'priority': self.priority,
            'description': self.description,
            'status': self.status,
            'assigned_to': self.assigned_to,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
