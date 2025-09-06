import { Router } from 'express';
import { worksheetController } from '../controllers/worksheet.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All worksheet routes require authentication
router.use(authenticateToken);

// Track worksheet generation
router.post('/generate', worksheetController.trackGeneration);

// Get user's worksheet history
router.get('/history', worksheetController.getHistory);

// Get worksheet statistics
router.get('/stats', worksheetController.getStatistics);

export default router;