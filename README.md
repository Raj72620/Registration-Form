# 📝 Student Registration Portal  
**A full-stack form application with secure data handling and file uploads**  

[![Live Demo](https://img.shields.io/badge/🔗_Live_Demo-2ea44f?style=for-the-badge&logo=netlify&logoColor=white)](https://registration-forrmm.netlify.app/)  
![API](https://img.shields.io/badge/API-RESTful-FF6C37?style=for-the-badge&logo=postman&logoColor=white)  

---

## ✨ Key Features  
| Feature | Implementation |  
|---------|----------------|  
| **📋 Form Validation** | Client-side validation + server-side sanitization |  
| **📄 Resume Upload** | Secure file handling (PDF/DOCX) |  
| **🔒 Data Security** | Encrypted database storage |  
| **🔄 CRUD Operations** | Create, Read, Update, Delete registrations |  
| **📊 Admin Dashboard** | View/filter all submissions (Protected routes) |  

---

## 🛠️ Tech Stack  
### Backend  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)  
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)  

### Frontend  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  

---

## 🚀 API Endpoints (RESTful)  
```http  
POST   /api/register     # Create new registration  
GET    /api/registrants  # List all registrants  
PUT    /api/update/:id   # Update registration  
DELETE /api/delete/:id   # Delete registration  
