# SysInt_Activity_Microservices
### Activity for System Integrations Subject  

This project demonstrates the integration of GraphQL with microservices, utilizing **Apollo Server** and **Prisma** as an ORM.

---

## 📌 Running the Server  
Navigate to the `server` directory and run the following command to start the service:  
```sh
node index.js
```

---

## 🔍 Reflection  
Database migrations help manage changes to a database's structure over time. They ensure **data integrity** and allow rollbacks if issues arise.  

### GraphQL vs. REST  
- **GraphQL** enables clients to request specific data with a **single query**, reducing over-fetching and under-fetching.  
- **REST** typically requires **multiple endpoints** for different resources, making data retrieval less flexible.  

---

## ⚡ Initialization & Setup  

Follow these steps to set up the project:  

### 1️⃣ Create and Navigate to the Service Directory  
```sh
mkdir service-name
cd service-name
```

### 2️⃣ Initialize the Project  
```sh
npm init -y
```

### 3️⃣ Install Dependencies  
```sh
npm install prisma @prisma/client apollo-server graphql
```

### 4️⃣ Initialize Prisma (Using SQLite)  
```sh
npx prisma init --datasource-provider sqlite
```

### 5️⃣ Define the Database Schema  
Locate the `schema.prisma` file and define your model:  
```prisma
model Book {
    id          Int     @id @default(autoincrement())
    title       String
    description String
}
```

### 6️⃣ Run Database Migration  
```sh
npx prisma migrate dev --name init
```

### 7️⃣ Create `index.js`  
This file contains the **GraphQL server logic**.  
Refer to the `index.js` implementation from the other services as a reference.  

---

### 🎯 Notes  
- Ensure **Prisma** is correctly set up before running migrations.  
- The **Apollo Server** is used to handle GraphQL queries and mutations.  
- You can explore existing services to understand the **GraphQL schema** and structure.  

---

💡 *Now, you're all set to develop and expand your GraphQL microservices! 🚀*