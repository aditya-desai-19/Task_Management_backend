import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { User } from './models/user.models';

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});

const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } = process.env;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/callback",
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                const { id, given_name, family_name, email} = profile;
                user = new User({
                    googleId: id,
                    firstName: given_name,
                    lastName: family_name,
                    email: email,
                });

                await user.save();
            }

            // Continue to authenticate the user
            return done(null, user);
        } catch (error) {
            return done(null, false);
        }
    }
));