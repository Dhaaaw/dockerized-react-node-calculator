"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var calculator_1 = require("./calculator");
var PORT = process.env.PORT || 4000;
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../calculator_client/build")));
app.post('/calculator', function (req, res) {
    var result = (0, calculator_1.calculator)(req.body.equation.split(""));
    if (result === "Error")
        res.status(500).send({ result: result });
    else {
        res.status(200).send({ result: result });
    }
});
app.get("/*", function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, "../calculator_client", "build", "index.html"));
});
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT, "."));
});
module.exports = app;
