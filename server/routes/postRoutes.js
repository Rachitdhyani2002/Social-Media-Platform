//Import Statements
import express from 'express'
import { addCommentController, createPostController, fetchUserPostController, likePostController } from '../controllers/postController.js';
import upload from '../middlewares/multer/multer.js';

const router = express.Router();

router.post('/create-post',upload.single('image'),createPostController)

router.post('/get-post',fetchUserPostController)

router.post('/like-post',likePostController)

router.post('/add-comment',addCommentController);

//Export Statement
export default router;