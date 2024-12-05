# JetstreamService

JetstreamService is a web application designed to manage service orders efficiently. The project is built with .NET for the backend and a static HTML/JavaScript frontend.

---

## **Features**

- **Service Order Management**: Create, read, update, and delete service orders.
- **User Authentication**: Secure login for employees using JWT.
- **Role-Based Access**: Admin-only features for managing orders.

---

## **Requirements**

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for serving the frontend if needed)
- [.NET 6+](https://dotnet.microsoft.com/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Postman](https://www.postman.com/) (optional, for API testing)

---

## **Installation**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-repo/JetstreamService.git
cd JetstreamService
```

### **2. Configure the Database**

- Open the `appsettings.json` file.
- Replace `DefaultConnection` with your SQL Server connection string.

```json
"ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=JetstreamDB;Trusted_Connection=True;"
}
```

### **3. Apply Database Migrations**

Run the following commands to apply migrations and create the database:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### **4. Build the Project**

Restore dependencies and build the solution:

```bash
dotnet build
```

### **5. Serve the Application**

Start the backend server:

```bash
dotnet run
```

By default, the API will be available at `http://localhost:5133`.

### **6. Serve the Frontend (Optional)**

If you are using a static frontend, ensure the files are correctly linked under the `wwwroot` folder or serve them with a lightweight HTTP server:

```bash
cd frontend
npx http-server
```

---

## **Usage**

### **1. Create a Service Order**

Use the frontend form or Postman to send a `POST` request to:

```http
POST http://localhost:5133/api/serviceorders
Content-Type: application/json

{
  "customerName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "123456789",
  "serviceType": "Repair",
  "priority": "High"
}
```

### **2. Get All Service Orders**

```http
GET http://localhost:5133/api/serviceorders
```

### **3. Authentication**

Log in as an employee using the `/api/auth/login` endpoint and retrieve a JWT token for secured routes.

---

## **Project Structure**

```plaintext
JetstreamService/
|-- Controllers/          # API controllers
|-- Models/               # Data models
|-- Data/                 # Database context and migrations
|-- wwwroot/              # Static frontend files
|-- appsettings.json      # Configuration
```

---

## **Contributing**

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.

---

## **Troubleshooting**

### Common Issues

#### **Database Errors**

- Ensure SQL Server is running and the connection string in `appsettings.json` is correct.

#### **Port Conflicts**

- Check if another application is using port `5133` and stop it or change the port in `launchSettings.json`.

#### **File Permission Errors**

- Run the following command to reset file permissions:

```bash
chmod -R u+rw .
```

