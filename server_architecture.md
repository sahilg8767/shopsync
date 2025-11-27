# Server Architecture Flowchart

This flowchart illustrates the request handling flow in the ShopSync backend server.

```mermaid
graph TD
    Client[Client (Frontend/Postman)]
    Server[Server (server.js)]
    Middleware[Middleware (CORS, JSON)]
    
    subgraph Routes
        AuthRoute[/api/auth]
        ProductRoute[/api/products]
    end
    
    subgraph Controllers
        AuthController[authController.js]
    end
    
    subgraph Database
        MongoDB[(MongoDB)]
        UserCol[User Collection]
        TokenCol[BlacklistedToken Collection]
    end
    
    subgraph InMemory
        ProductData[Hardcoded Product Data]
    end

    Client -->|HTTP Request| Server
    Server --> Middleware
    Middleware --> AuthRoute
    Middleware --> ProductRoute
    
    %% Auth Flow
    AuthRoute -->|/register| AuthController
    AuthRoute -->|/login| AuthController
    AuthRoute -->|/logout| AuthController
    
    AuthController -->|Save/Find User| UserCol
    AuthController -->|Save Token| TokenCol
    UserCol -.-> MongoDB
    TokenCol -.-> MongoDB
    
    %% Product Flow
    ProductRoute -->|GET /| ProductData
    ProductRoute -->|GET /category/:cat| ProductData
    ProductRoute -->|GET /:id| ProductData
    
    %% Responses
    AuthController -->|JSON Response| Client
    ProductData -->|JSON Response| Client
```

## Component Description

1.  **Server Entry (`server.js`)**: The main entry point that initializes the Express app, connects to the database, and sets up middleware.
2.  **Middleware**: Handles Cross-Origin Resource Sharing (CORS) and parses incoming JSON requests.
3.  **Routes**:
    *   `/api/auth`: Handles user authentication (Register, Login, Logout).
    *   `/api/products`: Handles product retrieval.
4.  **Controllers**:
    *   `authController.js`: Contains the logic for authentication, interacting with the MongoDB database via Mongoose models.
5.  **Data Sources**:
    *   **MongoDB**: Stores User data and Blacklisted Tokens.
    *   **In-Memory**: Product data is currently hardcoded in `productRoutes.js`.
