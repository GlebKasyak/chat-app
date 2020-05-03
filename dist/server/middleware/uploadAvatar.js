"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var common_1 = require("../utils/common");
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.resolve(__dirname, "../", common_1.setFolderPath(req.user.email, "images")));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
    }
    else {
        cb(new Error("Error! Invalid file type!"));
    }
};
exports.default = multer_1.default({ storage: storage, fileFilter: fileFilter, }).single("avatar");
