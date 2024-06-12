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

        },
        {
            name: "Cart",
            description: "Operations related to Cart entities",
        },
        {
            name: "Posts",
            description: "Operations related to Posts' entities",
        },
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
        //   carts
        "/api/v1/cart": {
            get: {
                tags: ["Cart"],
                summary: "Get All Cart",
                description: "Retrieve all Cart from the database",
                responses: {
                    200: {
                        description: "Cart retrieved successfully",
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
        "/api/v1/cart/{id}": {
            delete: {
                tags: ["Cart"],
                summary: "Delete Cart",
                description: "Delete an Cart by ID",
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
                        description: "Cart deleted successfully",
                    },
                    404: {
                        description: "Cart not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/v1/cart/{productId}/add": {
            post: {
                tags: ["Cart"],
                summary: "Add Cart",
                description: "Add item to cart using Product Id",
                parameters: [
                    {
                        name: "productId",
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
                                    quantity: { type: "number" },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description: "Cart updated successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    404: {
                        description: "Cart not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/v1/cart/{productId}/update": {
            put: {
                tags: ["Cart"],
                summary: "Update Cart",
                description: "Update details of an existing Cart",
                parameters: [
                    {
                        name: "productId",
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
                                    quantity: { type: "number" },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description: "Cart updated successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    404: {
                        description: "Cart not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },

        //   Order
        "/api/v1/checkout": {
            get: {
                tags: ["Order"],
                summary: "Get All Order",
                description: "Retrieve all Order from the database",
                responses: {
                    200: {
                        description: "Order retrieved successfully",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/v1/checkout/owner": {
            get: {
                tags: ["Order"],
                summary: "Get All Order",
                description: "Retrieve all Order from the database",
                responses: {
                    200: {
                        description: "Order retrieved successfully",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/v1/checkout/{cartId}": {
            post: {
                tags: ["Order"],
                summary: "Make Order",
                description: "Add item to Order using cart Id",
                parameters: [
                    {
                        name: "cartId",
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
                                    shippingAddress: { type: "string" },
                                    paymentMethod: { type: "string" },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description: "Order Odered successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    404: {
                        description: "Order not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/v1/checkout/{orderId}": {
            get: {
                tags: ["Order"],
                summary: "Get Order by order id",
                description: "Add item to Order using cart Id",
                parameters: [
                    {
                        name: "cartId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Order Odered successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    404: {
                        description: "Order not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        // Posts operations
        "/api/v1/posts": {
            get: {
              tags: ["Posts"],
              summary: "Get All Posts",
              description: "Get all Posts",
              responses: {
                200: {
                  description: "All Posts are retrieved successfully",
                },
                500: {
                  description: "Internal Server Error",
                },
              },
            },
            post: {
              tags: ["Posts"],
              summary: "Create Post",
              description: "Create a new Post",
              requestBody: {
                content: {
                  "multipart/form-data": {
                    schema: {
                      type: "object",
                      properties: {
                        title: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        category: {
                            type: "string",
                          },
                        image: {
                          type: "string",
                          format: "binary",
                        },
                      },
                    },
                  },
                },
                required: true,
              },
              responses: {
                201: {
                  description: "New Post created successfully",
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
          "/api/v1/posts/{postId}": {
            get: {
              tags: ["Posts"],
              summary: "Read Post By ID",
              description: "Get a Post by ID",
              parameters: [
                {
                  name: "postId",
                  in: "path",
                  required: true,
                  schema: {
                    type: "string",
                  },
                },
              ],
              responses: {
                200: {
                  description: "Post retrieved successfully",
                },
                404: {
                  description: "Post not found",
                },
                500: {
                  description: "Internal Server Error",
                },
              },
            },
        },
        "/api/v1/posts/{id}": {
            put: {
              tags: ["Posts"],
              summary: "Update Post",
              description: "Update an existing Post",
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
                        title: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        category: {
                            type: "string",
                          },
                        image: {
                          type: "string",
                          format: "binary",
                        },
                      },
                    },
                  },
                },
                required: true,
              },
              responses: {
                200: {
                  description: "Post updated successfully",
                },
                400: {
                  description: "Bad Request",
                },
                404: {
                  description: "Post not found",
                },
                500: {
                  description: "Internal Server Error",
                },
              },
            },
            delete: {
              tags: ["Posts"],
              summary: "Delete Post",
              description: "Delete a post by ID",
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
                  description: "Post deleted successfully",
                },
                400: {
                  description: "Bad Request",
                },
                404: {
                  description: "Post not found",
                },
                500: {
                  description: "Internal Server Error",
                },
              },
            },
          },
        
        "/api/v1/posts/category/{category}": {
            get: {
                tags: ["Posts"],
                summary: "Get Post By Category",
                description: "Retrieve all posts of the same category",
                parameters: [
                    {
                        name: "category",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Posts retrieved",
                    },
                    404: {
                        description: "Posts not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },

        "/api/v1/posts/title/{title}": {
            get: {
                tags: ["Posts"],
                summary: "Get Post By title",
                description: "Retrieve a post by title",
                parameters: [
                    {
                        name: "title",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Posts retrieved",
                    },
                    404: {
                        description: "Posts not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        }

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
