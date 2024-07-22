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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const auth_1 = __importDefault(require("../services/auth/auth"));
const users_1 = __importDefault(require("../repositories/users"));
class AuthController {
    constructor() {
        this.login = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const payload = request.body;
            new auth_1.default(this.repository)
                .login(payload)
                .then((data) => response.status(http_status_codes_1.StatusCodes.OK).json(data))
                .catch((error) => next(error));
        });
        this.refreshToken = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            new auth_1.default(this.repository)
                .refreshToken(request.body)
                .then((data) => response.status(http_status_codes_1.StatusCodes.OK).json(data))
                .catch((error) => next(error));
        });
        this.repository = new users_1.default();
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.js.map