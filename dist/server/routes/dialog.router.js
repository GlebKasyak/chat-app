"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middleware_1 = require("../middleware");
var dialogController_1 = __importDefault(require("../controllers/dialogController"));
var router = express_1.Router();
router.post("/", middleware_1.auth, dialogController_1.default.createDialog);
router.get("/", middleware_1.auth, dialogController_1.default.getDialogsById);
router.delete("/:dialogId", middleware_1.auth, dialogController_1.default.deleteDialogsById);
router.post("/search", middleware_1.auth, dialogController_1.default.searchDialogs);
exports.default = router;
