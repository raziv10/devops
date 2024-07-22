"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../controllers/auth"));
const validate_1 = require("../../middlewares/validate");
const authSchema_1 = require("./authSchema");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', (0, validate_1.schema)(authSchema_1.authLoginSchema), auth_1.default.login);
authRouter.post('/refresh', (0, validate_1.schema)(authSchema_1.refreshSchema), auth_1.default.refreshToken);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map