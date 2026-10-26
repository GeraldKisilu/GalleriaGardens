from datetime import datetime

from .. import db


class Career(db.Model):
    __tablename__ = 'careers'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    department = db.Column(db.String(120), nullable=True)
    location = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    applications = db.relationship('CareerApplication', back_populates='career', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'department': self.department,
            'location': self.location,
            'description': self.description,
            'is_active': self.is_active,
        }


class CareerApplication(db.Model):
    __tablename__ = 'career_applications'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    career_id = db.Column(db.Integer, db.ForeignKey('careers.id'), nullable=False)
    full_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(40), nullable=True)
    resume_url = db.Column(db.String(500), nullable=True)
    cover_letter = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), default='new')
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    user = db.relationship('User', back_populates='applications')
    career = db.relationship('Career', back_populates='applications')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'career_id': self.career_id,
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'resume_url': self.resume_url,
            'cover_letter': self.cover_letter,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
