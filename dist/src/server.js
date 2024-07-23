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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const bodyParser = __importStar(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const pino_http_1 = require("pino-http");
const rootRouter_1 = require("./routes/rootRouter");
const appConfig_1 = require("./config/appConfig");
const swaggerConfig_1 = require("./config/swaggerConfig");
const errorHandlerMiddleware = __importStar(require("./middlewares/errorHandler"));
const APP_PORT = appConfig_1.appConfig.port;
const APP_HOST = appConfig_1.appConfig.host;
const app = (0, express_1.default)();
app.set('port', APP_PORT);
app.set('host', APP_HOST);
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)({ contentSecurityPolicy: true, crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false }));
app.use((0, morgan_1.default)('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((0, cors_1.default)());
app.use((0, pino_http_1.pinoHttp)());
app.use(rootRouter_1.generalRouter);
app.use('/api/v1', rootRouter_1.appRouter);
const specs = (0, swagger_jsdoc_1.default)(swaggerConfig_1.swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, { explorer: true }));
app.use(errorHandlerMiddleware.genericErrorHandler);
app.use(errorHandlerMiddleware.emptyBody);
app.use(errorHandlerMiddleware.bodyParser);
app.use(errorHandlerMiddleware.notFoundHandler);
exports.server = app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server started at http://${app.get('host')}:${app.get('port')}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map