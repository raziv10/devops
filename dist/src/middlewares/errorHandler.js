"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = exports.bodyParser = exports.emptyBody = exports.notFoundHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const object_1 = require("../helpers/object");
const apiError_1 = __importDefault(require("../lib/apiError"));
const error_1 = __importDefault(require("../lib/error"));
const notFoundError_1 = __importDefault(require("../lib/notFoundError"));
function notFoundHandler(_err, _req, res, next) {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        message: 'Requested resource is not found'
    });
}
exports.notFoundHandler = notFoundHandler;
function emptyBody(request, response, next) {
    const { body, method } = request;
    const disallowedHttpHeaders = ['PUT', 'POST', 'PATCH'];
    if (request.is('application/json') && disallowedHttpHeaders.includes(method) && (0, object_1.isEmpty)(body)) {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Payload is invalid.' });
    }
    next();
}
exports.emptyBody = emptyBody;
function bodyParser(err, _req, res, _next) {
    res.status(err.status).json({
        error: {
            code: err.status,
            message: (0, http_status_codes_1.getReasonPhrase)(err.status)
        }
    });
}
exports.bodyParser = bodyParser;
function genericErrorHandler(err, _req, res, _next) {
    if (err instanceof apiError_1.default) {
        return res.status(err.code).json({ message: err.message });
    }
    if (err instanceof notFoundError_1.default) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: err.message });
    }
    if (err instanceof error_1.default) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({ message: err.message });
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
}
exports.genericErrorHandler = genericErrorHandler;
//# sourceMappingURL=errorHandler.js.map