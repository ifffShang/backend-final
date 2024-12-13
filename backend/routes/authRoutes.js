import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { register, login, logout, test, getProfile, update_settings, getUserById } from '../controllers/authController.js'
import passport from '../config/passport.js'

const router = express.Router();


router.get('/', test);

// API: register
router.post("/register", register);

// API: login
router.post("/login", login);

// API: logout
router.post("/logout", logout);

// API: profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);  
});

router.post('/update-settings', passport.authenticate('jwt', { session: false }), update_settings);

router.get('/:userId', getUserById);

export default router;