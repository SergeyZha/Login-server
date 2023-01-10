import express from 'express';
import {
  contactUs,
  getAllUsers,
  login,
  signUp,
} from '../controllers/userController.js';
import authToken from '../helper/generateToken.js';
import upload from '../config/multer.js';
const router = express.Router();

router.post('/register', upload.single('userPic'), signUp);
router.post('/login', login);
router.post('/contactUs', contactUs);

router.get('/all', authToken.isAuthorized, getAllUsers);
export default router;
