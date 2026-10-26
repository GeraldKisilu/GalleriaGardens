from flask import Blueprint, request
import stripe

from .. import db
from ..config import Config

payments_bp = Blueprint('payments', __name__)
stripe.api_key = Config.STRIPE_SECRET_KEY


@payments_bp.post('/create-checkout')
def create_checkout():
    payload = request.get_json(silent=True) or {}
    if not Config.STRIPE_SECRET_KEY:
        return {'error': 'stripe is not configured'}, 400

    session = stripe.checkout.Session.create(
        mode='payment',
        line_items=[{
            'price_data': {
                'currency': (payload.get('currency') or 'KES').lower(),
                'product_data': {'name': payload.get('name') or 'Reservation'},
                'unit_amount': int(float(payload.get('amount') or 0) * 100),
            },
            'quantity': 1,
        }],
        success_url=(payload.get('success_url') or 'http://localhost:3000') + '?payment=success',
        cancel_url=(payload.get('cancel_url') or 'http://localhost:3000') + '?payment=cancelled',
    )
    return {'checkout_url': session.url}, 200


@payments_bp.post('/webhook')
def webhook():
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature')
    endpoint_secret = Config.STRIPE_WEBHOOK_SECRET

    if not endpoint_secret:
        return {'error': 'webhook not configured'}, 400

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError:
        return {'error': 'invalid payload'}, 400
    except stripe.error.SignatureVerificationError:
        return {'error': 'invalid signature'}, 400

    return {'status': 'received', 'type': event.get('type')}, 200
