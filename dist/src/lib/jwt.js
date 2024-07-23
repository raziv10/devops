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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.decode = exports.verifyToken = exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = exports.generateTokens = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const appConfig_1 = require("../config/appConfig");
const object = __importStar(require("../helpers/object"));
function generateTokens(data) {
    return {
        accessToken: generateAccessToken(data),
        refreshToken: generateRefreshToken(data)
    };
}
exports.generateTokens = generateTokens;
function generateAccessToken(data, extraSalt = '') {
    const { accessTokenSecret, accessTokenDuration } = appConfig_1.appConfig.auth;
    const secret = accessTokenSecret + extraSalt;
    const payload = object.withoutAttrs(Object.assign({}, data), ['exp', 'iat']);
    return generateToken(payload, secret, {
        expiresIn: accessTokenDuration
    });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(data, extraSalt = '') {
    const { refreshTokenSecret, refreshTokenDuration } = appConfig_1.appConfig.auth;
    const secret = refreshTokenSecret + extraSalt;
    return generateToken(data, secret, {
        expiresIn: refreshTokenDuration
    });
}
exports.generateRefreshToken = generateRefreshToken;
function verifyRefreshToken(token, extraSalt = '') {
    const { refreshTokenSecret } = appConfig_1.appConfig.auth;
    const secret = refreshTokenSecret + extraSalt;
    return verifyToken(token, secret);
}
exports.verifyRefreshToken = verifyRefreshToken;
function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}
exports.verifyToken = verifyToken;
function decode(token) {
    return jwt.decode(token);
}
exports.decode = decode;
function generateToken(payload, secret, options) {
    return jwt.sign(payload, secret, options);
}
exports.generateToken = generateToken;
//# sourceMappingURL=jwt.js.map