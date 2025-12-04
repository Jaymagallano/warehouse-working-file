# 🔄 System Flow Diagram - Warehouse Manager

## Overview

Ito ang flow ng data mula sa user action hanggang sa database.

---

## 1. INVENTORY ADD OPERATION FLOW

```
┌─────────────────┐
│  User Interface │
│  (Browser)      │
└────────┬────────┘
         │ 1. User clicks "Add Item" button
         │    Fills form and submits
         ▼
┌─────────────────┐
│   JavaScript    │
│  (Frontend)     │
│                 │
│  File:          │
│  wm-inventory-  │
│  overview.js    │
└────────┬────────┘
         │ 2. JavaScript collects form data
         │    and sends POST request
         │
         │    POST /warehouse-manager/api-inventory-add
         │    Content-Type: application/json
         │    Body: {
         │      item_code: "CEM-001",
         │      item_name: "Cement",
         │      category: "Binding",
         │      quantity: 120,
         │      unit: "bags",
         │      location: "Warehouse A"
         │    }
         ▼
┌─────────────────┐
│     Routes      │
│  (CodeIgniter)  │
│                 │
│  File:          │
│  Routes.php     │
└────────┬────────┘
         │ 3. Route matches request to controller method
         │    /api-inventory-add → WarehouseManagerController::apiAddInventory()
         ▼
┌─────────────────┐
│   Controller    │
│  (Backend PHP)  │
│                 │
│  File:          │
│  WarehouseM...  │
│  Controller.php │
└────────┬────────┘
         │ 4. Controller receives data
         │    Validates request
         │    Calls Model to insert
         ▼
┌─────────────────┐
│     Model       │
│  (Data Layer)   │
│                 │
│  File:          │
│  InventoryM...  │
│  Model.php      │
└────────┬────────┘
         │ 5. Model validates data
         │    Builds SQL INSERT query
         │    Executes query
         ▼
┌─────────────────┐
│    Database     │
│    (MySQL)      │
│                 │
│  Table:         │
│  inventory      │
└────────┬────────┘
         │ 6. Database saves record
         │    Returns insert ID
         │
         │    INSERT INTO inventory (
         │      item_code, item_name, category,
         │      quantity, unit, location,
         │      created_at, updated_at
         │    ) VALUES (...)
         ▲
         │ 7. Success response sent back
         ▼
┌─────────────────┐
│   Controller    │
│  Returns JSON   │
└────────┬────────┘
         │ 8. Controller formats response
         │    {
         │      success: true,
         │      message: "Item added successfully",
         │      id: 15
         │    }
         ▼
┌─────────────────┐
│   JavaScript    │
│  Receives JSON  │
└────────┬────────┘
         │ 9. JavaScript processes response
         │    Shows success message
         │    Reloads inventory table
         ▼
┌─────────────────┐
│  User Interface │
│  Updated Table  │
└─────────────────┘
```

---

## 2. INVENTORY DELETE OPERATION FLOW

```
User clicks "Delete" button
         ↓
Confirm Modal appears
         ↓
User confirms deletion
         ↓
JavaScript sends: POST /api-inventory-delete/5
         ↓
Routes → Controller
         ↓
Controller calls Model->delete(5)
         ↓
Model executes: DELETE FROM inventory WHERE id=5
         ↓
Database removes record
         ↓
Controller returns: {success: true, message: "..."}
         ↓
JavaScript reloads table
         ↓
User sees updated table (item removed)
```

---

## 3. DASHBOARD STATISTICS FLOW

```
Page Load (dashboard.php)
         ↓
JavaScript (warehouse-manager.js) executes
         ↓
Fetch /api-inventory-stats
         ↓
Controller queries multiple tables:
  - COUNT(*) FROM inventory
  - COUNT(*) FROM inventory WHERE quantity < 10
  - COUNT(*) FROM shipments WHERE status='pending'
         ↓
Returns JSON with all stats
         ↓
JavaScript updates DOM elements:
  - stat-inventory.textContent = data.total_inventory
  - stat-lowstock.textContent = data.low_stock
  - etc.
         ↓
User sees real-time statistics
```

---

## 4. DATABASE STRUCTURE

```
┌──────────────────────────────────────────────────────┐
│                    MySQL Database                     │
└──────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    users    │  │  inventory  │  │  shipments  │
├─────────────┤  ├─────────────┤  ├─────────────┤
│ id (PK)     │  │ id (PK)     │  │ id (PK)     │
│ username    │  │ item_code   │  │ ship_number │
│ password    │  │ item_name   │  │ type        │
│ email       │  │ category    │  │ status      │
│ role        │  │ quantity    │  │ expected_   │
│ status      │  │ unit        │  │   date      │
└─────────────┘  │ location    │  └─────────────┘
                 │ batch_num   │
                 │ expiry_date │         
                 └─────────────┘         
                        │
                        ▼
                 ┌─────────────┐
                 │  approvals  │
                 ├─────────────┤
                 │ id (PK)     │
                 │ type        │
                 │ reference_id│
                 │ status      │
                 │ requested_by│
                 │ approved_by │
                 └─────────────┘
```

---

## 5. FILE STRUCTURE

```
warehousetry/
│
├── app/
│   ├── Config/
│   │   └── Routes.php ...................... Route definitions
│   │
│   ├── Controllers/
│   │   └── WarehouseManagerController.php .. API endpoints
│   │
│   ├── Models/
│   │   ├── InventoryModel.php .............. Inventory queries
│   │   ├── ShipmentModel.php ............... Shipment queries
│   │   ├── ApprovalModel.php ............... Approval queries
│   │   └── UserModel.php ................... User queries
│   │
│   ├── Views/
│   │   └── warehouse_manager/
│   │       ├── dashboard.php ............... Dashboard HTML
│   │       └── inventory_overview.php ...... Inventory HTML
│   │
│   └── Database/
│       └── Migrations/
│           ├── CreateWarehouseTables.php ... Users, Inventory, etc.
│           ├── CreateShipmentsTable.php .... Shipments table
│           └── CreateApprovalsTable.php .... Approvals table
│
└── public/
    └── assets/
        └── js/
            ├── warehouse-manager.js ........ Dashboard logic
            └── wm-inventory-overview.js .... Inventory CRUD
```

---

## 6. API REQUEST/RESPONSE EXAMPLES

### Example 1: Get Inventory

**Request:**
```http
GET /warehouse-manager/api-inventory HTTP/1.1
Host: localhost
Cookie: ci_session=...
```

**Response:**
```json
[
  {
    "id": 1,
    "item_code": "CEM-001",
    "item_name": "Cement",
    "category": "Binding",
    "quantity": 120,
    "unit": "bags",
    "location": "Warehouse A",
    "batch_number": null,
    "expiry_date": null,
    "created_at": "2024-01-15 10:00:00",
    "updated_at": "2024-01-15 10:00:00"
  }
]
```

### Example 2: Add Inventory

**Request:**
```http
POST /warehouse-manager/api-inventory-add HTTP/1.1
Host: localhost
Content-Type: application/json
Cookie: ci_session=...

{
  "item_code": "REB-001",
  "item_name": "Steel Rebar",
  "category": "Steel",
  "quantity": 50,
  "unit": "pcs",
  "location": "Warehouse B"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item added successfully",
  "id": 25
}
```

### Example 3: Update Inventory

**Request:**
```http
POST /warehouse-manager/api-inventory-update/25 HTTP/1.1
Host: localhost
Content-Type: application/json
Cookie: ci_session=...

{
  "quantity": 75
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item updated successfully"
}
```

### Example 4: Delete Inventory

**Request:**
```http
POST /warehouse-manager/api-inventory-delete/25 HTTP/1.1
Host: localhost
Cookie: ci_session=...
```

**Response:**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

---

## 7. ERROR HANDLING FLOW

```
User submits form with invalid data
         ↓
JavaScript validates (client-side)
         ↓
If validation fails → Show error message
         ↓
If validation passes → Send to server
         ↓
Controller validates (server-side)
         ↓
If validation fails → Return 400 Bad Request
         {
           success: false,
           message: "Failed to add item",
           errors: { item_name: "Required field" }
         }
         ↓
JavaScript shows error message
         ↓
User corrects input and resubmits
```

---

## 8. AUTHENTICATION FLOW

```
User visits /warehouse-manager/dashboard
         ↓
Auth filter checks session
         ↓
Is user logged in?
    │
    ├── NO → Redirect to /login
    │        Show login form
    │        User enters credentials
    │        POST /authenticate
    │        Verify username/password
    │        Create session
    │        Redirect to dashboard
    │
    └── YES → Load dashboard
             Fetch data from database
             Display content
```

---

## 9. DATA VALIDATION LAYERS

```
┌───────────────────────────────────────┐
│  Layer 1: Client-Side (JavaScript)    │
│  - Required fields                    │
│  - Data type validation               │
│  - Format checking                    │
└──────────────┬────────────────────────┘
               │ If valid, submit
               ▼
┌───────────────────────────────────────┐
│  Layer 2: Server-Side (Controller)    │
│  - Request validation                 │
│  - Authentication check               │
│  - Authorization check                │
└──────────────┬────────────────────────┘
               │ If valid, process
               ▼
┌───────────────────────────────────────┐
│  Layer 3: Model Validation            │
│  - Field validation rules             │
│  - Data integrity checks              │
│  - Business logic validation          │
└──────────────┬────────────────────────┘
               │ If valid, save
               ▼
┌───────────────────────────────────────┐
│  Layer 4: Database Constraints        │
│  - Primary key uniqueness             │
│  - Foreign key integrity              │
│  - NOT NULL constraints               │
│  - Data type enforcement              │
└───────────────────────────────────────┘
```

---

## 10. COMPLETE USER JOURNEY

```
START
  │
  ├─► Login Page
  │     │ Enter credentials
  │     ▼
  ├─► Dashboard
  │     │ View statistics
  │     │ See notifications
  │     │ Check alerts
  │     ▼
  ├─► Inventory Overview
  │     │
  │     ├─► View Items
  │     │     │ Browse inventory
  │     │     │ Search/Filter
  │     │     ▼
  │     │   [Select Item]
  │     │
  │     ├─► Add Item
  │     │     │ Click "+ Add Item"
  │     │     │ Fill form
  │     │     │ Submit
  │     │     │ → Saved to DB
  │     │     ▼
  │     │   [Success Message]
  │     │
  │     ├─► Edit Item
  │     │     │ Click "Edit"
  │     │     │ Modify data
  │     │     │ Save changes
  │     │     │ → Updated in DB
  │     │     ▼
  │     │   [Success Message]
  │     │
  │     └─► Delete Item
  │           │ Click "Delete"
  │           │ Confirm
  │           │ → Removed from DB
  │           ▼
  │         [Success Message]
  │
  ├─► Shipments
  │     │ View/Manage shipments
  │     ▼
  ├─► Approvals
  │     │ Approve/Reject requests
  │     ▼
  └─► Logout
        │
       END
```

---

## Key Takeaways

1. **Frontend (JavaScript)** handles user interactions
2. **Routes** direct requests to appropriate controllers
3. **Controllers** process requests and coordinate between models
4. **Models** interact with database
5. **Database** stores all data persistently
6. **Responses** flow back through the same chain in reverse

---

## Data Flow Summary

```
USER → JavaScript → Routes → Controller → Model → Database
                                                      ↓
USER ← JavaScript ← JSON    ← Response ← Result ← Database
```

**Every action follows this pattern!**

---

*This flow ensures data integrity, security, and proper separation of concerns.*
