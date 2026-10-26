from datetime import datetime

from .. import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    sender_name = db.Column(db.String(255), nullable=False)
    subject = db.Column(db.String(255), nullable=True)
    body = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    user = db.relationship('User', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'sender_name': self.sender_name,
            'subject': self.subject,
            'body': self.body,
            'is_read': self.is_read,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
