# Finance Data Processing & Access Control Backend
A robust Node.js and SQLite-based backend built to manage financial transactions with a built-in **Role-Based Access Control (RBAC)** system. This project demonstrates a clean MVC architecture, efficient data aggregation, and secure middleware implementation.

##  Project Structure

FINANCE-BACKEND-ASSESSMENT/
├── node_modules/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection & schema initialization
│   ├── controllers/
│   │   ├── dashboardController.js  # Logic for financial analytics & summaries
│   │   └── recordController.js     # Logic for transaction CRUD operations
│   ├── middleware/
│   │   └── roleauth.js         # Security layer for RBAC & status validation
│   └── routes/
│       ├── dashboardRoutes.js  # API endpoints for analytics
│       └── recordRoutes.js     # API endpoints for financial records
├── finance.db                  # SQLite database file (auto-generated)
├── package.json                # Project dependencies & scripts
├── .gitignore                  # Files to exclude from version control
└── server.js                   # Application entry point & server setup

##  Getting Started

### 1. Installation
Install the required production dependencies and the development tool (**Nodemon**):

npm install express sqlite3 sqlite
npm install --save-dev nodemon


### 2. Running the Application

**Development Mode (Recommended):**
Uses nodemon to automatically restart the server when you save changes.

npm run dev

**Production/Standard Mode:**
Starts the server using the standard Node.js command.

node server.js

The server will initialize the database and start listening on `http://localhost:3000`.

##  Role-Based Access Control (RBAC)

Access is managed via request headers. The system validates both the **User Role** and the **Account Status** before processing any request.

| Role | Permissions |
| **Admin** | Full Access: Can add new records and view all dashboard summaries. |
| **Analyst** | View Access: Can view all records and the dashboard summary. |
| **Viewer** | Restricted Access: Can only view the list of individual records. |

> **Security Note:** If the header `status: inactive` is provided, the request is immediately rejected with a **403 Forbidden** error, regardless of the role.

##  API Endpoints

### 1. Financial Records
* **GET** `/api/records/all`
    * *Allowed Roles:* Admin, Analyst, Viewer
* **POST** `/api/records/add`
    * *Allowed Roles:* Admin Only
    * *Body:* `{ "amount": 1200, "type": "income", "category": "Salary", "date": "2026-04-02", "description": "Monthly pay" }`

### 2. Dashboard Analytics
* **GET** `/api/dashboard/summary`
    * *Allowed Roles:* Admin, Analyst
    * *Returns:* Total Income, Total Expenses, Net Balance, and Category-wise breakdown.


## Technical Highlights
* **Efficient Aggregation:** Uses SQL `SUM` and `GROUP BY` for high-performance analytics directly in the database.
* **Integrity:** Database-level `CHECK` constraints enforce valid transaction types and roles.
* **Modular Design:** Professional MVC folder structure allows for easy scalability.
* **Middleware Guarding:** Higher-order function approach for reusable and clean route protection.

##  Testing
Use **Postman** or **Thunder Client** with these headers:
1. **role**: `Admin` (or Analyst/Viewer)
2. **status**: `active`
3. **Content-Type**: `application/json`
