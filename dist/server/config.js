"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var root = path_1.default.join(__dirname, ".env");
dotenv_1.default.config({ path: root });
exports.default = {
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    SERVER_URL: process.env.SERVER_URL,
    RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
    ADMIN_ID: process.env.ADMIN_ID
};
