import { OpenAPIV3 } from 'openapi-types';
import { _userComponents, _userRoutes } from './user.swagger';

import swaggerUi from 'swagger-ui-express';
import { _authComponents, _authRoutes } from './auth.swagger';


const swaggerDocument: OpenAPIV3.Document = {
    openapi: '3.0.0',
    info: {
        title: 'Test Nodejs : T3_Nodejs',
        version: '1.0.0',
        description: "Api for managing user",
    },
    servers: [
        { url: 'http://localhost:3000' }
    ],
    paths: {
        ..._authRoutes,
        ..._userRoutes
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            apiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-api-key',
            },
        },
        schemas: {
            ..._userComponents,
            ..._authComponents
        }
    }
};


export default function swaggerDocs(app: any, port?: number) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.info(`Docs available at http://localhost:${port ?? 3000}/docs`);
}
