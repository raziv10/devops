"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("../../lib/jwt"));
const crypt = __importStar(require("../../lib/crypt"));
const object = __importStar(require("../../helpers/object"));
const error_1 = __importDefault(require("./error"));
class AuthManager {
    constructor(userRepository) {
        this.login = (payload) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmailWithPassword(payload.email);
            if (!user) {
                throw new error_1.default({
                    message: 'Provided email or password does not match.'
                });
            }
            if (!user.password) {
                throw new error_1.default({ message: 'Provided email or password does not match.' });
            }
            const passwordMatches = yield crypt.compareWithHashValue(payload.password, user.password);
            if (!passwordMatches) {
                throw new error_1.default({ message: 'Provided email or password does not match.' });
            }
            const UserDetail = object.withoutAttrs(user, ['password']);
            const refreshToken = jwt.generateRefreshToken(user);
            const accessToken = jwt.generateAccessToken(user);
            return {
                user: UserDetail,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
        });
        this.refreshToken = (payload) => __awaiter(this, void 0, void 0, function* () {
            const refreshPayload = (yield this.verifyRefreshToken(payload.refreshToken));
            let user = object.withoutAttrs(refreshPayload, ['iat', 'exp']);
            const accessToken = yield jwt.generateAccessToken(user);
            return {
                accessToken
            };
        });
        this.verifyRefreshToken = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                return jwt.verifyRefreshToken(token);
            }
            catch (err) {
                if (err.name === 'TokenExpiredError') {
                    throw new error_1.default({ message: 'Refresh token expired' });
                }
                throw new error_1.default({ message: 'Refresh token expired' });
            }
        });
        this.userRepository = userRepository;
    }
}
exports.default = AuthManager;
//# sourceMappingURL=auth.js.map