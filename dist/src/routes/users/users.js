"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../../controllers/users"));
const validate_1 = require("../../middlewares/validate");
const schema_1 = require("./schema");
const userRouter = (0, express_1.Router)();
userRouter.post('/', (0, validate_1.schema)(schema_1.userRegistrationSchema), users_1.default.createUser);
exports.default = userRouter;
//# sourceMappingURL=users.js.map