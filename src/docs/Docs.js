import express from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = express.Router();

const options = {
    openapi: "3.0.1",
    info: {
        title: "Welcome to the FIND ART SYSTEM AND EXHIBITION API",
        version: "1.0.0",
        description: "Documentation for FIND ART SYSTEM AND EXHIBITION API.",
    },
    basePath: "/",
    security: [
        {
            bearerAuth: [],
        },
    ],
    tags: [
        {
            name: "Users",
            description: "Operations related to Users entities",
        },
        {
            name: "Arts",
            description: "Operations related to Arts entities",
        }
    ],
    paths: {
        // users
        "/api/v1/users": {
            get: {
                tags: ["Users"],
                summary: "Get All Users",
                description: "Get all users",
                responses: {
                    200: {
                        description: "All User Posts retrieved successfully",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
            post: {
                tags: ["Users"],
                summary: "Create User",
                description: "Create a new user",
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    profile: {
                                        type: "string",
                                        format: "binary",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    201: {
                        description: "New user created successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/v1/users/auth": {
            post: {
                tags: ["Users"],
                summary: "User Login",
                description: "User login",
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string",
                                    },

                                    password: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description: "User was logged in successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/v1/users/{id}": {
            get: {
                tags: ["Users"],
                summary: "Read User By ID",
                description: "Get a user by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "User retrieved successfully",
                    },
                    404: {
                        description: "User not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
            put: {
                tags: ["Users"],
                summary: "Update User",
                description: "Update an existing user",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    profile: {
                                        type: "string",
                                        format: "binary",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description: "User updated successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    404: {
                        description: "User not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
            post: {
                tags: ["Users"],
                summary: "Approve User",
                description: "Approve a Existing user status user by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    201: {
                        description: "User Approved successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    404: {
                        description: "User not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
            delete: {
                tags: ["Users"],
                summary: "Delete User",
                description: "Delete a user by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "User deleted successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    404: {
                        description: "User not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/v1/users/forgot-password": {
            post: {
                tags: ["Users"],
                summary: "Forgot Password",
                description: "Forgot Password",
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description: "Code to reset your password is sent to your email",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/v1/users/reset-password": {
            post: {
                tags: ["Users"],
                summary: "Reset Password",
                description: "Reset Password",
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    password: {
                                        type: "string",
                                    },
                                    confirmPassword: {
                                        type: "string",
                                    },
                                    code: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description:
                            "Your Password changed!... you may now login with new password",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },

        // Arts
        "/api/v1/arts": {
            get: {
              tags: ["Arts"],
              summary: "Get All Arts",
              description: "Retrieve all Arts from the database",
              responses: {
                200: {
                  description: "Arts retrieved successfully",
                },
                500: {
                  description: "Internal Server Error",
                },
              },
            },
            post: {
              tags: ["Arts"],
              summary: "Create Arts",
              description: "Create a new Arts in the database",
              requestBody: {
                content: {
                  "multipart/form-data": {
                    schema: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        description: { type: "string" },
                        category: { type: "string" },
                        price: { type: "number" },
                        available_arts: { type: "number" },
                        image: {
                          type: "string",
                          format: "binary",
                          description: "Image file for the Arts"
                        },
                      },
                    },
                  },
                },
                required: true,
              },
              responses: {
                201: {
                  description: "Arts created successfully",
                },
                400: {
                  description: "Bad Request",
                },
                500: {
                  description: "Internal Server Error",
                },
              },
            },
          },
          "/api/v1/arts/{id}": {
            get: {
              tags: ["Arts"],
              summary: "Get Arts By ID",
              description: "Retrieve a single Arts by its ID",
              parameters: [
                {
                  name: "id",
                  in: "path",
                  required: true,
                  schema: {
                    type: "string",
                  },
                },
              ],
              responses: {
                200: {
                  description: "Arts retrieved successfully",
                },
                404: {
                  description: "Arts not found",
                },
                500: {
                  description: "Internal Server Error",
                },
              },
            },
            put: {
              tags: ["Arts"],
              summary: "Update Arts",
              description: "Update details of an existing Arts",
              parameters: [
                {
                  name: "id",
                  in: "path",
                  required: true,
                  schema: {
                    type: "string",
                  },
                },
              ],
              requestBody: {
                content: {
                  "multipart/form-data": {
                    schema: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        description: { type: "string" },
                        category: { type: "string" },
                        price: { type: "number" },
                        available_arts: { type: "number" },
                        image: {
                          type: "string",
                          format: "binary",
                          description: "Image file for the Arts"
                        },
                      },
                    },
                  },
                },
                required: true,
              },
              responses: {
                200: {
                  description: "Arts updated successfully",
                },
                400: {
                  description: "Bad Request",
                },
                404: {
                  description: "Arts not found",
                },
                500: {
                  description: "Internal Server Error",
                },
              },
            },
            delete: {
              tags: ["Arts"],
              summary: "Delete Arts",
              description: "Delete an Arts by ID",
              parameters: [
                {
                  name: "id",
                  in: "path",
                  required: true,
                  schema: {
                    type: "string",
                  },
                },
              ],
              responses: {
                200: {
                  description: "Arts deleted successfully",
                },
                404: {
                  description: "Arts not found",
                },
                500: {
                  description: "Internal Server Error",
                },
              },
            },
          },
          "/api/v1/arts/{id}/owner": {
            get: {
              tags: ["Arts"],
              summary: "Get Arts By Owner ID",
              description: "Retrieve a single Arts by its ID",
              parameters: [
                {
                  name: "id",
                  in: "path",
                  required: true,
                  schema: {
                    type: "string",
                  },
                },
              ],
              responses: {
                200: {
                  description: "Arts retrieved successfully",
                },
                404: {
                  description: "Arts not found",
                },
                500: {
                  description: "Internal Server Error",
                },
              },
            },
          },

    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
