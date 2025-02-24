//Import Statements
import express from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import userModel from '../../database/models/UserModel.js'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile)
                const existingUser = await userModel.findOne({ email: profile.emails[0].value })
                if (existingUser) {
                    console.log(`User already exist :${existingUser}`)
                    return done(null, existingUser)
                } else {
                    const newUser = new userModel({ name: profile.displayName, email: profile.emails[0].value, password: null })
                    await newUser.save()
                    console.log(`New user created :${newUser}`)
                    return done(null, newUser)
                }

            }
            catch (error) {
                console.log(error)
            }

        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})


router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}))

router.get('/auth/google/callback',
    passport.authenticate('google',
        { failureRedirect: 'http://localhost:3000/' }
    ), (req, res, next) => { res.redirect('http://localhost:3000/profile') })

export default router;
