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
const constants_1 = require("../constants/constants");
const pets_1 = __importDefault(require("../presenters/pets"));
const pets_2 = __importDefault(require("../repositories/pets"));
const pets_3 = __importDefault(require("../services/pets/pets"));
const petQuery_1 = __importDefault(require("../queries/pets/petQuery"));
class PetController {
    constructor() {
        this.create = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const authorizedRequest = request;
            const payload = request.body;
            const userId = authorizedRequest.user.id;
            const petPayload = Object.assign(Object.assign({}, payload), { userId });
            new pets_3.default(this.repository)
                .create(petPayload)
                .then((data) => response.status(http_status_codes_1.StatusCodes.CREATED).json(data))
                .catch((error) => next(error));
        });
        this.update = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const authorizedRequest = request;
            const payload = request.body;
            const userId = authorizedRequest.user.id;
            const id = Number(request.params.id);
            const petPayload = { payload, userId, id };
            new pets_3.default(this.repository)
                .update(petPayload)
                .then((data) => response.status(http_status_codes_1.StatusCodes.OK).json(data))
                .catch((error) => next(error));
        });
        this.remove = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const authorizedRequest = request;
            const userId = authorizedRequest.user.id;
            const id = Number(request.params.id);
            new pets_3.default(this.repository)
                .remove({ id, userId })
                .then((data) => response.status(http_status_codes_1.StatusCodes.OK).json(data))
                .catch((error) => next(error));
        });
        this.findDetail = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            new pets_3.default(this.repository)
                .findDetail(id)
                .then((data) => response.status(http_status_codes_1.StatusCodes.OK).json(new pets_1.default().findDetail(data)))
                .catch((error) => next(error));
        });
        this.listPets = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const name = (_a = request.query.name) === null || _a === void 0 ? void 0 : _a.toString();
                const species = (_b = request.query.species) === null || _b === void 0 ? void 0 : _b.toString();
                const currentPage = Number(request.query.currentPage || constants_1.PAGINATION_CURRENT_PAGE);
                const maxRows = Number(request.query.maxRows || constants_1.PAGINATION_LIMIT);
                const filteredPets = yield new petQuery_1.default({
                    paginationParams: { currentPage, maxRows },
                    filters: { name, species }
                }).listAll();
                const totalRowCount = (yield new petQuery_1.default({ isPaginated: false, filters: { name, species } }).listAll()).length;
                const result = new pets_1.default().listPets(filteredPets, { totalRowCount, perPageCount: maxRows, currentPage });
                return response.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.repository = new pets_2.default();
    }
}
exports.default = new PetController();
//# sourceMappingURL=pets.js.map