"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
exports.swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Pet Store',
            version: '1.0.0',
            description: 'This is a simple CRUD API application made with Express and documented with Swagger',
            license: {
                name: 'MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./src/routes/**/*.ts']
};
//# sourceMappingURL=swaggerConfig.js.map