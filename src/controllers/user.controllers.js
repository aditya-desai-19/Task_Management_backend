//@ts-check
import bcrypt from 'bcrypt';
import { User } from '../models/user.models.js';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

export const SECRET_KEY = "TaskMangement";
const SALT_ROUNDS = 10;

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !email || !password) {
            return res.status(400).json({ msg: "Bad request" });
        }

        const user = await User.findOne({ email: req.body.email });

        if (user) {
            res.status(400).json({ msg: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

        const newUser = new User({
            firstName: firstName,
            lastName: lastName || "",
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({ message: "New user has been created" });
    } catch (error) {
        console.log("Error creating user: ", error);
        return res.status(500).json({ msg: "Some error occurred" });
    }
}

const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Bad request" });
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user && user.password) {
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                console.log("is match")
                const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24);
                const userDetails = { name: `${user.firstName} ${user.lastName}`, id: user._id };
                console.log({userDetails})
                const token = jwt.sign({ user: userDetails, exp: expiration }, SECRET_KEY);
                return res.status(200).json({ message: "Login successful", token });
            } else {
                return res.status(400).json({ message: "User not found" });
            }
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Some error occurred" });
    }
}

const authenticateGoogleUser = async (req, res) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log({payload});
        let user = await User.findOne({ email: payload.email });
        if (!user) {
            user = new User({
                firstName: payload?.given_name,
                lastName: payload?.family_name || "",
                email: payload?.email,
                googleId: payload?.sub
            });

            await user.save();
        } else if (user.googleId !== payload?.sub) { // check for normal user when using google login
            return res.status(500).json({ msg: "Some error occurred" });
        }
        console.log({user})
        const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24);
        const userDetails = { name: `${user.firstName} ${user.lastName}`, id: user._id };
        const token = jwt.sign({ user: userDetails, exp: expiration }, SECRET_KEY);
        return res.status(200).json({ msg: "Login successful", token });
    } catch (err) {
        return res.status(500).json({ msg: "Some error occurred" });
    }
}

export { registerUser, authenticateUser, authenticateGoogleUser }