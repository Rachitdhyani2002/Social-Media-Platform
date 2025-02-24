//Import statements
import express from 'express';
import { getMessageController } from '../controllers/chatController.js';

const router = express.Router();

router.get('/get-messages/:sender/:receiver',getMessageController)

export default router;