"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_router_1 = __importDefault(require("./user.router"));
var dialog_router_1 = __importDefault(require("./dialog.router"));
exports.default = (function (app) {
    app.use("/api/users", user_router_1.default);
    app.use("/api/dialog", dialog_router_1.default);
});
