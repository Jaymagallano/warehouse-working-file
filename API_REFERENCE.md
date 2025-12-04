# Warehouse Manager API Reference

## Base URL
```
/warehouse-manager
```

## Authentication
All API endpoints require authentication. Make sure you're logged in as a Warehouse Manager.

---

## Inventory Endpoints

### Get All Inventory Items
```
GET /warehouse-manager/api-inventory
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
    "created_at": "2024-01-01 10:00:00",
    "updated_at": "2024-01-01 10:00:00"
  }
]
```

### Get Dashboard Statistics
```
GET /warehouse-manager/api-inventory-stats
```

**Response:**
```json
{
  "total_inventory": 150,
  "low_stock": 3,
  "pending_shipments": 5,
  "pending_receiving": 2,
  "total_users": 8
}
```

### Add Inventory Item
```
POST /warehouse-manager/api-inventory-add
Content-Type: application/json
```

**Request Body:**
```json
{
  "item_code": "CEM-002",
  "item_name": "White Cement",
  "category": "Binding",
  "quantity": 50,
  "unit": "bags",
  "location": "Warehouse A",
  "batch_number": "BATCH001",
  "expiry_date": "2025-12-31"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item added successfully",
  "id": 15
}
```

### Update Inventory Item
```
POST /warehouse-manager/api-inventory-update/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "item_name": "Premium Cement",
  "category": "Binding",
  "quantity": 75,
  "unit": "bags"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item updated successfully"
}
```

### Delete Inventory Item
```
POST /warehouse-manager/api-inventory-delete/{id}
```

**Response:**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

---

## Shipment Endpoints

### Get All Shipments
```
GET /warehouse-manager/api-shipments
GET /warehouse-manager/api-shipments?type=incoming
GET /warehouse-manager/api-shipments?type=outgoing
```

**Query Parameters:**
- `type` (optional): Filter by shipment type (`incoming` or `outgoing`)

**Response:**
```json
[
  {
    "id": 1,
    "shipment_number": "SHP-001",
    "type": "incoming",
    "status": "pending",
    "supplier_id": 1,
    "customer_id": null,
    "expected_date": "2024-01-15",
    "actual_date": null,
    "created_at": "2024-01-01 10:00:00",
    "updated_at": "2024-01-01 10:00:00"
  }
]
```

### Add Shipment
```
POST /warehouse-manager/api-shipment-add
Content-Type: application/json
```

**Request Body:**
```json
{
  "shipment_number": "SHP-003",
  "type": "incoming",
  "status": "pending",
  "supplier_id": 1,
  "expected_date": "2024-01-20"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Shipment added successfully",
  "id": 3
}
```

### Update Shipment
```
POST /warehouse-manager/api-shipment-update/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "completed",
  "actual_date": "2024-01-18"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Shipment updated successfully"
}
```

### Delete Shipment
```
POST /warehouse-manager/api-shipment-delete/{id}
```

**Response:**
```json
{
  "success": true,
  "message": "Shipment deleted successfully"
}
```

---

## Approval Endpoints

### Get Approvals
```
GET /warehouse-manager/api-approvals
GET /warehouse-manager/api-approvals?status=pending
```

**Query Parameters:**
- `status` (optional): Filter by approval status

**Response:**
```json
[
  {
    "id": 1,
    "type": "Stock Transfer",
    "reference_id": 10,
    "status": "pending",
    "requested_by": 5,
    "approved_by": null,
    "request_date": "2024-01-10 14:30:00",
    "created_at": "2024-01-10 14:30:00",
    "updated_at": "2024-01-10 14:30:00"
  }
]
```

### Approve Request
```
POST /warehouse-manager/api-approve-request/{id}
```

**Response:**
```json
{
  "success": true,
  "message": "Request approved successfully"
}
```

### Reject Request
```
POST /warehouse-manager/api-reject-request/{id}
```

**Response:**
```json
{
  "success": true,
  "message": "Request rejected successfully"
}
```

---

## Dashboard Endpoints

### Get Recent Activity
```
GET /warehouse-manager/api-recent-activity
```

**Response:**
```json
[
  {
    "action": "Inventory item added",
    "timestamp": "2024-01-15 10:30:00"
  },
  {
    "action": "Shipment created",
    "timestamp": "2024-01-15 09:15:00"
  }
]
```

### Get Notifications
```
GET /warehouse-manager/api-notifications
```

**Response:**
```json
[
  {
    "type": "warning",
    "message": "Low stock: Paint (5 cans left)"
  },
  {
    "type": "danger",
    "message": "Shipment SHP-001 is overdue"
  }
]
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request**
```json
{
  "success": false,
  "message": "Failed to add item",
  "errors": {
    "item_name": "The item_name field is required."
  }
}
```

**404 Not Found**
```json
{
  "success": false,
  "message": "Item not found"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "An error occurred while processing your request"
}
```

---

## JavaScript Usage Examples

### Load Inventory
```javascript
async function loadInventory() {
    const response = await fetch('/warehouse-manager/api-inventory');
    const inventory = await response.json();
    console.log(inventory);
}
```

### Add Inventory Item
```javascript
async function addItem(itemData) {
    const response = await fetch('/warehouse-manager/api-inventory-add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
    });
    const result = await response.json();
    return result;
}
```

### Delete Inventory Item
```javascript
async function deleteItem(id) {
    const response = await fetch(`/warehouse-manager/api-inventory-delete/${id}`, {
        method: 'POST'
    });
    const result = await response.json();
    return result;
}
```

---

## Notes

1. All POST requests expect JSON data with `Content-Type: application/json` header
2. Authentication is required for all endpoints (uses CodeIgniter's auth filter)
3. CSRF protection is handled by the backend
4. All datetime fields are in `Y-m-d H:i:s` format
5. Boolean success responses always include a `success` field
6. Error responses include a `message` field explaining the error

---

## Testing with cURL

### Get Inventory
```bash
curl -X GET "http://localhost/warehouse-manager/api-inventory" \
  -H "Cookie: your-session-cookie"
```

### Add Inventory Item
```bash
curl -X POST "http://localhost/warehouse-manager/api-inventory-add" \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{
    "item_code": "TEST-001",
    "item_name": "Test Item",
    "category": "Testing",
    "quantity": 10,
    "unit": "pcs",
    "location": "Warehouse A"
  }'
```

### Delete Inventory Item
```bash
curl -X POST "http://localhost/warehouse-manager/api-inventory-delete/15" \
  -H "Cookie: your-session-cookie"
```
