"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middleware_1 = require("../middleware");
var userController_1 = __importDefault(require("../controllers/userController"));
var router = express_1.Router();
router.post("/", userController_1.default.register);
router.post("/login", middleware_1.recaptcha, userController_1.default.login);
router.get("/logout", middleware_1.auth, userController_1.default.logout);
router.get("/", middleware_1.auth, userController_1.default.auth);
router.get("/all/", middleware_1.auth, userController_1.default.getUsers);
router.delete("/", middleware_1.auth, userController_1.default.removeUser);
router.post("/upload-avatar", middleware_1.auth, middleware_1.uploadAvatar, userController_1.default.uploadAvatar);
router.post("/search", middleware_1.auth, userController_1.default.searchUserByEmail);
exports.default = router;
