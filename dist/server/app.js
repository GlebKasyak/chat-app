"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var http_1 = require("http");
var socket_io_1 = __importDefault(require("socket.io"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_extended_1 = __importDefault(require("dotenv-extended"));
var services_1 = require("./services");
var db_1 = __importDefault(require("./db"));
var config_1 = __importDefault(require("./config"));
var routes_1 = __importDefault(require("./routes"));
dotenv_extended_1.default.load();
db_1.default();
var app = express_1.default();
app.use(express_1.json());
app.use(cors_1.default());
app.use(cookie_parser_1.default());
routes_1.default(app);
var server = http_1.createServer(app);
var io = socket_io_1.default(server);
io.on("connection", function (socket) {
    try {
        socket.on("join", function (data, callback) { return __awaiter(void 0, void 0, void 0, function () {
            var dialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, services_1.DialogService.getDialogWithMessages(data)];
                    case 1:
                        dialog = _a.sent();
                        callback(dialog.messages);
                        socket.join(data.dialogId);
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("previous messages", function (data, callback) { return __awaiter(void 0, void 0, void 0, function () {
            var dialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, services_1.DialogService.getDialogWithMessages(data)];
                    case 1:
                        dialog = _a.sent();
                        callback(dialog.messages);
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("typing", function (data) {
            var typingMessage = data.typingMessage, dialogId = data.dialogId, isTyping = data.isTyping;
            socket.broadcast.to(dialogId).emit("typing", { typingMessage: typingMessage, isTyping: isTyping });
        });
        socket.on("create new message", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, services_1.MessageService.createMessage(data)];
                    case 1:
                        message = _a.sent();
                        io.to(data.dialog).emit("message", message);
                        return [2 /*return*/];
                }
            });
        }); });
    }
    catch (err) {
        throw new Error(err);
    }
    socket.on("disconnect", function () {
        io.emit("disconnect");
        socket.disconnect(true);
    });
});
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
if (config_1.default.IS_PRODUCTION) {
    app.use(express_1.default.static(path_1.default.join(__dirname, "client", "build")));
    app.get("*", function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, "../client", "build", "index.html"));
    });
}
server.listen(config_1.default.PORT, function () {
    console.log("Server up on " + config_1.default.PORT);
});
