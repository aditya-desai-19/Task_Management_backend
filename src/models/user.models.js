import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String
    }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);