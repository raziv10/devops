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
const http_status_codes_1 = require("http-status-codes");
const appConfig_1 = require("../config/appConfig");
const apiError_1 = __importDefault(require("../lib/apiError"));
const jwt = __importStar(require("../lib/jwt"));
const logger_1 = require("../lib/logger");
function authenticate(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorizedRequest = request;
        const logger = (0, logger_1.childLogger)({
            moduleName: 'Authentication'
        });
        try {
            logger.info('Authentication process started');
            const { accessTokenSecret } = appConfig_1.appConfig.auth;
            const secret = `${accessTokenSecret}`;
            const token = request.headers.authorization;
            if (!token) {
                logger.error({ error: { message: 'No authorization header set' } });
                return response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'No authorization header set' });
            }
            if (!token.includes('Bearer')) {
                logger.error({ error: { message: "Authorization header doesn't include a Bearer token" } });
                return response
                    .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                    .json({ message: "Authorization header doesn't include a Bearer token" });
            }
            const bearerToken = token.split(' ')[1];
            try {
                const decodedResult = (yield jwt.verifyToken(bearerToken, secret));
                authorizedRequest.user = decodedResult;
                logger.info('Authentication completed');
                next();
            }
            catch (err) {
                logger.error({ error: { message: 'Invalid Token' } });
                return response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Token' });
            }
        }
        catch (err) {
            const error = new apiError_1.default({ message: 'Something went wrong', code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR });
            logger.error({ error: err });
            return next(error);
        }
    });
}
exports.default = authenticate;
//# sourceMappingURL=auth.js.map