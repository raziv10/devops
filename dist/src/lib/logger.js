"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.childLogger = exports.default = void 0;
const pino_1 = __importDefault(require("pino"));
const logger = (0, pino_1.default)();
exports.default = logger;
function childLogger(bindings = {}, options = {}) {
    const logBindings = Object.assign({}, bindings);
    return logger.child(logBindings, options);
}
exports.childLogger = childLogger;
//# sourceMappingURL=logger.js.map