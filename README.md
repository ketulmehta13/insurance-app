# 🛡️ Insurance Management Application

A comprehensive full-stack insurance management system built with React, Node.js, TypeScript, and Python for seamless policy management, claims processing, and customer service operations.

![Insurance App](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-78.9%25-yellow?style=for-the-badge&logo=javascript)
![TypeScript](https://img.shields.io/badge/TypeScript-11.0%25-blue?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-9.9%25-blue?style=for-the-badge&logo=python)

## ⭐ Key Features

### 🔐 **User Management**
- Secure JWT authentication and authorization
- Role-based access control (Customer, Agent, Admin)
- User profile management and preferences
- Password encryption and security measures

### 📋 **Policy Management**
- Comprehensive policy creation and management
- Dynamic premium calculation engine
- Policy renewal and modification system
- Coverage options and customization tools
- Document management and storage

### 💼 **Claims Processing**
- Digital claim submission with document upload
- Real-time claim status tracking and updates
- Automated claim workflow and routing
- Claims history and documentation
- Integration with assessment services

### 💳 **Payment System**
- Secure payment gateway integration
- Multiple payment method support
- Automated billing and invoicing
- Payment history and receipt generation
- Premium payment scheduling

### 📊 **Analytics Dashboard**
- Real-time business performance metrics
- Customer analytics and insights
- Claims statistics and reporting
- Revenue tracking and forecasting
- Interactive charts and visualizations

## 🛠️ Technology Stack

### **Frontend**
- **React.js** with TypeScript for type safety
- **Material-UI** for modern component design
- **Redux Toolkit** for state management
- **React Router** for navigation routing
- **Axios** for API communication

### **Backend**
- **Node.js** with Express.js framework
- **Python** scripts for data processing
- **JWT** for secure authentication
- **MongoDB** for database operations
- **RESTful API** architecture

### **Development Tools**
- **TypeScript** for enhanced development
- **ESLint & Prettier** for code quality
- **Git** for version control
- **VS Code** for development environment

## 🚀 Quick Start Guide

### **Prerequisites**



### **Installation Steps**

1. **Clone Repository**
git clone https://github.com/ketulmehta13/insurance-app.git
cd insurance-app


2. **Backend Setup**
cd backend
npm install
pip install -r requirements.txt


3. **Frontend Setup**
cd ../frontend
npm install


4. **Environment Configuration**
Create `.env` files in both directories:
Backend .env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FIREBASE_CONFIG=your_firebase_configuration

Frontend .env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_KEY=your_firebase_api_key


5. **Start Development Servers**
Terminal 1 - Backend
cd backend && npm run dev

Terminal 2 - Frontend
cd frontend && npm start




## 📱 Application Modules

### **Customer Portal**
- Personal dashboard with policy overview
- Policy management and renewal system
- Claim submission and tracking interface
- Payment portal with history
- Document upload and management
- Live chat support integration

### **Agent Dashboard**
- Client management system
- Policy creation and modification tools
- Claims review and processing workflow
- Commission tracking and reports
- Performance analytics and metrics
- Lead management system

### **Admin Panel**
- System configuration and settings
- User management and role assignment
- Business analytics and reporting
- Audit logs and security monitoring
- Policy template management
- System health monitoring

## 🔧 API Documentation

### **Authentication Endpoints**


POST /api/auth/register - User registration
POST /api/auth/login - User authentication
POST /api/auth/refresh - Token refresh
POST /api/auth/logout - User logout


### **Policy Management**
GET /api/policies - Retrieve user policies
POST /api/policies - Create new policy
PUT /api/policies/:id - Update existing policy
DELETE /api/policies/:id - Delete policy
GET /api/policies/:id - Get policy details


### **Claims Management**
GET /api/claims - Get user claims
POST /api/claims - Submit new claim
PUT /api/claims/:id - Update claim status
GET /api/claims/:id - Get claim details
POST /api/claims/:id/docs - Upload claim documents


### **Environment Variables**
Production .env
NODE_ENV=production
DATABASE_URL=production_mongodb_url
JWT_SECRET=production_jwt_secret
FRONTEND_URL=https://your-app.com


## 🔐 Security Implementation

- **JWT Token Authentication** with refresh mechanism
- **Role-Based Access Control** for different user types
- **Data Encryption** for sensitive customer information
- **Input Validation** and sanitization on all endpoints
- **Rate Limiting** to prevent API abuse
- **CORS Configuration** for secure cross-origin requests
- **SQL Injection Prevention** through parameterized queries
- **XSS Protection** with content security policies

## 🤝 Contributing Guidelines

1. **Fork the repository** and create a feature branch
2. **Write tests** for new functionality
3. **Follow coding standards** and linting rules
4. **Update documentation** for any API changes
5. **Submit pull request** with detailed description

git checkout -b feature/amazing-new-feature
git commit -m 'Add amazing new feature'
git push origin feature/amazing-new-feature