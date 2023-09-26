"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
        min: [1, "Minimum age is 1"],
        max: [199, "Maximum age is 199"],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
}, {});
exports.User = (0, mongoose_1.model)("user", userSchema);
