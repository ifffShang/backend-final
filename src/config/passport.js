import dotenv from "dotenv";
dotenv.config();
import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from "passport";
import User from "../models/user.js";
import jwt from "jsonwebtoken"

// JWT Strategy to extract JWT from cookies


passport.use(new Strategy({
    secretOrKey: process.env.JWT_SECRET,  
    jwtFromRequest: (req) => {
        // Extract the token from cookies
        const token = req.cookies.jwt;
        return token || null;  // If there's no token, return null
    }
}, async (jwtPayload, done) => {
    try {
        // Search for the user from the JWT payload
        const user = await User.findById(jwtPayload.id);
        if (!user) {
            return done(null, false);  // If user not found, return false
        }
        return done(null, user);  // Pass the user data to the next middleware
    } catch (error) {
        done(error, false);  // Return error if something goes wrong
    }
}));

export default passport;
