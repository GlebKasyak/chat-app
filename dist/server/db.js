"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var config_1 = __importDefault(require("./config"));
function default_1() {
    mongoose_1.connect(config_1.default.MONGODB_URL, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).catch(function (err) { return console.log(err); });
    mongoose_1.connection.on("open", function () {
        var info = mongoose_1.connections[0];
        console.log("Connected to:\n     host: " + info.host + ",\n     port: " + info.port + ",\n     name: " + info.name);
    });
}
exports.default = default_1;
;
