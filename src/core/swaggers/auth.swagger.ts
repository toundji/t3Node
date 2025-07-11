

export const _authRoutes: any = {
    '/api/auth/login': {
        post: {
            security: [
                { apiKeyAuth: [] },
            ],
            tags: ['Auth'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/LoginDto' }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'User successful logged',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/AuthResp' }
                        }
                    }
                }
            }
        }
    },
    '/api/auth/register': {
        post: {
            security: [
                { apiKeyAuth: [] },
            ],
            tags: ['Auth'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/RegisterDto' }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'User successful signup',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/AuthResp' }
                        }
                    }
                }
            }
        }
    },

};


export const _authComponents = {

    LoginDto: {
        type: 'object',
        required: ['email', 'password',],
        properties: {
            email: { type: 'string', format: 'email', example: 'contact@atoundji.com' },
            password: { type: 'string', format: 'password', example: 'Password@123' }
        }
    },
    RegisterDto: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
            name: { type: 'string', example: 'Агбаунгба Тунджи' },
            birthDate: { type: 'string', format: 'date' },
            email: { type: 'string', format: 'email', example: 'contact@atoundji.com' },
            password: { type: 'string', format: 'password', example: 'Password@123' }
        }
    },
    AuthResp: {
        type: 'object',
        properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: { $ref: '#/components/schemas/User' }
        }
    }
}