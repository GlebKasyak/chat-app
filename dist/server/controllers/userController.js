"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var services_1 = require("../services");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, token, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, services_1.UserService.login(email, password)];
                case 1:
                    token = _b.sent();
                    res.cookie("x_auth", token)
                        .json({ message: "Token is created", success: true, token: token });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _b.sent();
                    res.status(400).json({ message: "Error. Email or password incorrect", success: false, err: err_1 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserController.logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                res.clearCookie("x_auth").json({ message: "You are logout", success: true });
            }
            catch (err) {
                res.status(400).json({ message: "Error. Can you try again", err: err });
            }
            return [2 /*return*/];
        });
    }); };
    UserController.register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, user, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, services_1.UserService.register(email, password, __assign({}, req.body))];
                case 1:
                    user = _b.sent();
                    res.status(201).json({ message: "User is created", success: true, user: user });
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _b.sent();
                    res.status(400).json({ message: "Error. User is not created", success: false, err: err_2 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserController.auth = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                res.json({ message: "You are authenticated", user: req.user, token: req.token, success: true });
            }
            catch (err) {
                res.status(400).json({ message: "Error. Can you try again", err: err });
            }
            return [2 /*return*/];
        });
    }); };
    UserController.getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var users, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, services_1.UserService.getUsers(req.query)];
                case 1:
                    users = _a.sent();
                    res.json({ message: "All users", success: true, users: users });
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    res.status(400).json({ message: err_3.message, success: false });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserController.uploadAvatar = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var avatar, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, services_1.UserService.uploadAvatar(req.file, req.user.email)];
                case 1:
                    avatar = _a.sent();
                    res.json({ message: "Avatar is uploaded", avatar: avatar, success: true });
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    res.status(400).json({ message: err_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserController.removeUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _id, email, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.user, _id = _a._id, email = _a.email;
                    return [4 /*yield*/, services_1.UserService.removeUser(_id, email)];
                case 1:
                    _b.sent();
                    res.json({ message: "Account is deleted", success: true });
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _b.sent();
                    res.status(400).json({ message: err_5.message, success: false });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserController.searchUserByEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, services_1.UserService.searchUserByEmail(req.body)];
                case 1:
                    user = _a.sent();
                    res.json({ message: "User is founded", user: user, success: true });
                    return [3 /*break*/, 3];
                case 2:
                    err_6 = _a.sent();
                    res.status(400).json({ message: err_6.message, success: false });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return UserController;
}());
exports.default = UserController;