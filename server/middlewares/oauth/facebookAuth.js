// Import Statements
import express from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import userModel from '../../database/models/UserModel.js'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router();

// Facebook Strategy Verify Callback Function
const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    console.log(profile); // Log profile for debugging
    try {
        const existingUser = await userModel.findOne({ email: profile.email });
        if (existingUser) {
            console.log(`User already exists: ${existingUser}`);
            return done(null, existingUser); // User already exists, return the existing user
        } else {
            // If no user exists, create a new one
            const newUser = new userModel({
                name: profile.displayName,
                email: profile.email,
                password: null, // No password needed for social login
            });
            await newUser.save();
            console.log(`New user created: ${newUser}`);
            return done(null, newUser); // Return the newly created user
        }
    } catch (error) {
        console.error(error);
        return done(error, null); // Handle errors and return null user
    }
};

// Passport Facebook Strategy Initialization
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
        },
        verifyCallback // Pass the verifyCallback function here
    )
);

// Passport Serialization & Deserialization
passport.serializeUser((user, done) => {
    done(null, user); // Storing user ID in session
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

// Facebook Authentication Routes
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: 'http://localhost:3000/'
    }, (req, res, next) => { res.redirect('http://localhost:3000/profile') })
);

export default router;
