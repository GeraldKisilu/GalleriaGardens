import os


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'dev-jwt-secret')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///./app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*')
    STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY', '')
    STRIPE_WEBHOOK_SECRET = os.getenv('STRIPE_WEBHOOK_SECRET', '')
    FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')
    JSON_SORT_KEYS = False
