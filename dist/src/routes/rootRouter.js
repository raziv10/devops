"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = exports.generalRouter = void 0;
const express_1 = require("express");
const users_1 = __importDefault(require("./users/users"));
const auth_1 = __importDefault(require("./auth/auth"));
const pets_1 = __importDefault(require("./pets/pets"));
const generalRouter = (0, express_1.Router)();
exports.generalRouter = generalRouter;
const appRouter = (0, express_1.Router)();
exports.appRouter = appRouter;
generalRouter.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
appRouter.use('/users', users_1.default);
appRouter.use('/auth', auth_1.default);
appRouter.use('/pets', pets_1.default);
//# sourceMappingURL=rootRouter.js.map