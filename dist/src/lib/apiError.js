"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor({ message, code }) {
        super(message);
        this.code = code;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}
exports.default = ApiError;
//# sourceMappingURL=apiError.js.map