# Student Management System

A full-stack web application for managing student information with role-based authentication and authorization.

## 📋 Project Overview

This project is a Student Management System built with:
- **Backend**: ASP.NET Core Web API with JWT authentication
- **Frontend**: React with TypeScript and Bootstrap
- **Database**: SQL Server with Entity Framework Core

## 🏗️ System Architecture

### Backend Structure
```
backend/
├── Authentication/          # JWT authentication system
│   ├── Controller/         # AuthController
│   ├── Dto/               # Data transfer objects
│   ├── InterFace/         # Service interfaces
│   └── Service/           # Authentication services
├── Student/               # Student management
│   ├── Controller/        # StudentsController
│   ├── Dto/              # Student DTOs
│   ├── InterFace/        # Service interfaces
│   └── Service/          # Student services
├── Data/                  # Data layer
│   ├── Models/           # Entity models
│   └── AppDbContext.cs   # Database context
├── Utils/                # Utilities
│   └── TokenService.cs   # JWT token generation
└── Migrations/           # Database migrations
```

### Frontend Structure
```
frontend/
├── src/
│   ├── pages/            # React components
│   │   ├── Home.tsx
│   │   ├── SignUp.tsx
│   │   ├── SignIn.tsx
│   │   └── Student/      # Student management pages
│   ├── Service/          # API services
│   │   └── EndPoint/     # API endpoints
│   └── types/            # TypeScript definitions
```

## 🔐 Authentication & Authorization

### User Roles
- **Staff**: Full access to student management
- **Student**: Limited access (view own data)
- **SystemUser**: Administrative privileges

### Protected Endpoints
| Endpoint | Method | Required Role | Description |
|----------|--------|---------------|-------------|
| `/api/Students` | GET | Any authenticated user | Get all students |
| `/api/Students/{id}` | GET | Staff, Student | Get specific student |
| `/api/Students` | POST | Staff | Create new student |
| `/api/Students/{id}` | PATCH | Staff | Update student |
| `/api/Students/{id}` | DELETE | Staff | Delete student |

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+
- SQL Server

### Backend Setup

1. **Configure Database Connection**
   ```json
   {
     "ConnectionStrings": {
       "myCon": "Server=your_server;Database=StudentManagement;Trusted_Connection=true;TrustServerCertificate=true;"
     }
   }
   ```

2. **Configure JWT Settings**
   ```json
   {
     "JWT": {
       "key": "your-secret-key-minimum-32-characters",
       "Issuer": "student-management",
       "Audience": "student-management-users",
       "LifeTime": "7"
     }
   }
   ```

3. **Run Migrations**
   ```bash
   cd backend
   dotnet ef database update
   ```

4. **Run the Application**
   ```bash
   dotnet run
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**
   Create `.env` file:
   ```env
   VITE_API_SERVICE_URL=http://localhost:5008
   VITE_PORT=3000
   ```

3. **Run the Application**
   ```bash
   npm run dev
   ```

## 📊 API Endpoints

### Authentication
- `POST /api/Auth/signUp` - User registration
- `POST /api/Auth/signIn` - User login

### Student Management
- `GET /api/Students` - Get all students
- `GET /api/Students/{id}` - Get student by ID
- `POST /api/Students` - Create new student
- `PATCH /api/Students/{id}` - Update student
- `DELETE /api/Students/{id}` - Delete student

## 🗄️ Database Models

### User Model
```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public Roles Role { get; set; }
}
```

### Student Model
```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Gender { get; set; }
    public string Gpa { get; set; }
    public int Age { get; set; }
    public string Role { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
}
```

## 🔒 Security Features

- **Password Hashing**: BCrypt for secure password storage
- **JWT Tokens**: Stateless authentication
- **Role-based Authorization**: Fine-grained access control
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Model validation and error handling

## 🛠️ Development

### Adding New Migrations
```bash
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Testing API
Use the provided `student-management.http` file for testing endpoints in Visual Studio or VS Code.

### Frontend Development
The frontend uses:
- React 19 with TypeScript
- Bootstrap 5 for styling
- Axios for API calls
- React Router for navigation

## 📝 Environment Configuration

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "myCon": "Your connection string"
  },
  "JWT": {
    "key": "Your JWT secret key",
    "Issuer": "Your issuer",
    "Audience": "Your audience",
    "LifeTime": "7"
  },
  "allowedOrigins": ["http://localhost:3000"],
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

### Frontend (.env)
```env
VITE_API_SERVICE_URL=http://localhost:5008
VITE_PORT=3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify SQL Server is running
   - Check connection string in appsettings.json
   - Ensure TrustServerCertificate=true in connection string

2. **JWT Token Issues**
   - Verify JWT secret key is at least 32 characters
   - Check token expiration settings
   - Validate issuer and audience settings

3. **CORS Issues**
   - Verify allowedOrigins in backend configuration
   - Check frontend URL matches allowed origins

4. **Migration Issues**
   - Delete Migrations folder and recreate
   - Ensure Entity Framework tools are installed
   - Verify database connection before running migrations

For more help, please check the application logs or create an issue in the repository.