import { UserRole } from "../enums/user-role";


export const _userRoutes: any = {
    '/api/users': {
        get: {
            summary: 'required only admin',
            security: [
                { apiKeyAuth: [] },
                { bearerAuth: [] }
            ],
            tags: ['Users'],
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/User' }
                            }
                        }
                    }
                }
            }
        },
        post: {
            summary: 'required only admin',
            security: [
                { apiKeyAuth: [] },
                { bearerAuth: [] }
            ],
            tags: ['Users'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UserCreate' }
                    }
                }
            },
            responses: {
                '201': { description: 'Utilisateur créé' },
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/User' }
                    }
                }
            }
        }
    },
    '/api/users/{id}': {
        get: {
            security: [
                { apiKeyAuth: [] },
                { bearerAuth: [] }
            ],
            tags: ['Users'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' }
                }
            ],
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/User' }
                        }
                    }
                },
                '404': { description: 'User not found' }
            }
        },
        put: {
            summary: 'required only admin',
            security: [
                { apiKeyAuth: [] },
                { bearerAuth: [] }
            ],
            tags: ['Users'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UserUpdate' }
                    }
                }
            },
            responses: {
                '200': { description: 'Mis à jour' },
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/User' }
                    }
                }
            }
        },
        delete: {

            security: [
                { apiKeyAuth: [] },
                { bearerAuth: [] }
            ],
            tags: ['Users'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' }
                }
            ],
            responses: {
                '204': { description: 'User remove successfully' }
            }
        }
    },
    '/api/my/profile': {
        get: {
            summary: 'current user information',
            security: [
                { apiKeyAuth: [] },
                { bearerAuth: [] }
            ],
            tags: ['Users'],
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/User' }
                        }
                    }
                },
                '404': { description: 'User not found' }
            }
        },
        put: {
            summary: 'update self information',
            security: [
                { apiKeyAuth: [] },
                { bearerAuth: [] }
            ],
            tags: ['Users'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UserUp' }
                    }
                }
            },
            responses: {
                '200': { description: 'Mis à jour' },
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/User' }
                    }
                }
            }
        },
    },
    '/api/users/{id}/block': {
        get: {
            summary: 'required only admin or user self',
            security: [
                { apiKeyAuth: [] },
                { bearerAuth: [] }
            ],
            tags: ['Users'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' }
                }
            ],
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/User' }
                        }
                    }
                },
                '404': { description: 'User not found' }
            }
        }
    },
    '/api/users/{id}/active': {
        get: {
            summary: 'required only admin',
            security: [
                { apiKeyAuth: [] },
                { bearerAuth: [] }
            ],
            tags: ['Users'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' }
                }
            ],
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/User' }
                        }
                    }
                },
                '404': { description: 'User not found' }
            }
        }
    },
    '/api/users/filter/all': {
        post: {
            security: [
                { apiKeyAuth: [] },
                { bearerAuth: [] }
            ],
            tags: ['Users'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UserFilter' }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                $ref: '#/components/schemas/User'
                            }
                        }
                    }
                },
            }
        },

    }
};



const userProperties: any = {
    _id: { type: 'string', example: '60f6c0f6e1d2a700174cc3e1' },
    name: { type: 'string', example: 'Toundji' },
    birthDate: { type: 'string', format: 'date', example: '1990-05-15' },
    email: { type: 'string', format: 'email', example: 'toundji@example.com' },
    role: { type: 'string', enum: Object.values(UserRole), example: 'user' },
    status: { type: 'boolean', example: true },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
};


export const _userComponents: any = {
    User: {
        type: 'object',
        required: ['name', 'birthDate', 'email', 'role', 'status', 'createdAt', 'updatedAt'],
        properties: userProperties
    },
    UserCreate: {
        type: 'object',
        required: ['name', 'birthDate', 'email', 'role', 'status'],
        properties: {
            name: { type: 'string', example: 'Агбаунгба Тунджи' },
            birthDate: { type: 'string', format: 'date' },
            email: { type: 'string', format: 'email', example: 'contact@atoundji.com' },
            role: { type: 'string', enum: Object.values(UserRole), example: 'user' },
            status: { type: 'boolean' },
            password: { type: 'string', format: 'password', example: 'Password@123' },
        }
    },
    UserUpdate: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: Object.values(UserRole), example: 'user' },
            status: { type: 'boolean' }
        }
    },
    UserUp: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
            email: { type: 'string', format: 'email' },
        }
    },
    UserFilter: {
        type: 'object',
        properties: userProperties
    },
}
