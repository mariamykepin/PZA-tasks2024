"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const booksRoutes_1 = __importDefault(require("./routes/booksRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000; // Menggunakan port dari variabel lingkungan atau default ke 3000
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({ secret: 'mySecret', resave: false, saveUninitialized: true }));
// Connect to MongoDB
(0, dbConfig_1.default)();
// Swagger Options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Book Management API',
            version: '1.0.0',
            description: 'API for managing books',
        },
    },
    apis: ['./src/routes/*.ts'], // Menyertakan rute untuk Swagger
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Routes
app.use('/api', booksRoutes_1.default);
// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app; // Mengekspor aplikasi untuk keperluan testing atau integrasi lainnya
