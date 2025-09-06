import { Router } from 'express';
import { subscriptionController } from '../controllers/subscription.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All subscription routes require authentication
router.use(authenticate);

// Get current subscription
router.get('/current', subscriptionController.getSubscription);

// Create checkout session for new subscription
router.post('/create-checkout', subscriptionController.createCheckoutSession);

// Create customer portal session
router.post('/create-portal', subscriptionController.createPortalSession);

// Update subscription (usually called by webhook)
router.put('/update', subscriptionController.updateSubscription);

// Cancel subscription
router.post('/cancel', subscriptionController.cancelSubscription);

export default router;