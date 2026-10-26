from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

from .config import Config

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS", "*")}}, supports_credentials=True)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from .routes.auth import auth_bp
    from .routes.properties import properties_bp
    from .routes.bookings import bookings_bp
    from .routes.service_requests import service_requests_bp
    from .routes.messages import messages_bp
    from .routes.careers import careers_bp
    from .routes.admin import admin_bp
    from .routes.payments import payments_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(properties_bp, url_prefix='/api/properties')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
    app.register_blueprint(service_requests_bp, url_prefix='/api/service-requests')
    app.register_blueprint(messages_bp, url_prefix='/api/messages')
    app.register_blueprint(careers_bp, url_prefix='/api/careers')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(payments_bp, url_prefix='/api/payments')

    @app.get('/api/health')
    def health():
        return {"status": "ok"}

    return app
