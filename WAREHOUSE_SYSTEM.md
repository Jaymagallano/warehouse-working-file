# Warehouse Management System

A comprehensive warehouse management system built with CodeIgniter 4 framework for efficient inventory tracking, shipment management, and approval workflows.

## 🚀 Features

- **Inventory Management**: Track items, quantities, locations, and stock levels
- **Shipment Tracking**: Manage incoming and outgoing shipments
- **Approval Workflow**: Handle stock transfers and other approval requests
- **Dashboard Analytics**: Real-time statistics and notifications
- **RESTful API**: Complete API for frontend integration
- **User Authentication**: Secure access control for warehouse managers

## 📋 Requirements

- PHP 8.1 or higher
- CodeIgniter 4 Framework
- MySQL Database
- Web Server (Apache/Nginx)

### Required PHP Extensions
- intl
- mbstring
- json
- mysqlnd (for MySQL)
- libcurl (for HTTP requests)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd warehouse-working-file-main
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Configure environment**
   ```bash
   cp env .env
   ```
   
4. **Update database configuration in `.env`**
   ```
   database.default.hostname = localhost
   database.default.database = warehouse_db
   database.default.username = your_username
   database.default.password = your_password
   ```

5. **Run migrations**
   ```bash
   php spark migrate
   ```

6. **Seed database (optional)**
   ```bash
   php spark db:seed
   ```

## 🏗️ System Architecture

### Core Modules

#### 1. Inventory Management
- Item tracking with codes and categories
- Quantity and location management
- Batch numbers and expiry dates
- Low stock alerts

#### 2. Shipment Management
- Incoming/outgoing shipment tracking
- Supplier and customer management
- Expected vs actual delivery dates
- Status tracking (pending, completed, cancelled)

#### 3. Approval System
- Stock transfer approvals
- Request workflow management
- Multi-level approval support
- Audit trail

#### 4. Dashboard & Analytics
- Real-time inventory statistics
- Recent activity tracking
- System notifications
- Performance metrics

## 🔌 API Endpoints

### Authentication
All API endpoints require warehouse manager authentication.

**Base URL**: `/warehouse-manager`

### Inventory Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api-inventory` | Get all inventory items |
| GET | `/api-inventory-stats` | Get dashboard statistics |
| POST | `/api-inventory-add` | Add new inventory item |
| POST | `/api-inventory-update/{id}` | Update inventory item |
| POST | `/api-inventory-delete/{id}` | Delete inventory item |

### Shipment Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api-shipments` | Get all shipments |
| GET | `/api-shipments?type=incoming` | Get incoming shipments |
| GET | `/api-shipments?type=outgoing` | Get outgoing shipments |
| POST | `/api-shipment-add` | Add new shipment |
| POST | `/api-shipment-update/{id}` | Update shipment |
| POST | `/api-shipment-delete/{id}` | Delete shipment |

### Approval Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api-approvals` | Get all approvals |
| GET | `/api-approvals?status=pending` | Get pending approvals |
| POST | `/api-approve-request/{id}` | Approve request |
| POST | `/api-reject-request/{id}` | Reject request |

### Dashboard Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api-recent-activity` | Get recent activity |
| GET | `/api-notifications` | Get system notifications |

## 📊 Data Models

### Inventory Item
```json
{
  "id": 1,
  "item_code": "CEM-001",
  "item_name": "Cement",
  "category": "Binding",
  "quantity": 120,
  "unit": "bags",
  "location": "Warehouse A",
  "batch_number": "BATCH001",
  "expiry_date": "2025-12-31",
  "created_at": "2024-01-01 10:00:00",
  "updated_at": "2024-01-01 10:00:00"
}
```

### Shipment
```json
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
```

### Approval Request
```json
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
```

## 💻 Usage Examples

### JavaScript Integration

#### Load Inventory Data
```javascript
async function loadInventory() {
    try {
        const response = await fetch('/warehouse-manager/api-inventory');
        const inventory = await response.json();
        displayInventory(inventory);
    } catch (error) {
        console.error('Error loading inventory:', error);
    }
}
```

#### Add New Item
```javascript
async function addInventoryItem(itemData) {
    try {
        const response = await fetch('/warehouse-manager/api-inventory-add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Item added successfully!');
            loadInventory(); // Refresh the list
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error adding item:', error);
    }
}
```

#### Update Shipment Status
```javascript
async function updateShipmentStatus(shipmentId, status) {
    try {
        const response = await fetch(`/warehouse-manager/api-shipment-update/${shipmentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: status,
                actual_date: new Date().toISOString().split('T')[0]
            })
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating shipment:', error);
    }
}
```

### cURL Examples

#### Get Dashboard Statistics
```bash
curl -X GET "http://localhost/warehouse-manager/api-inventory-stats" \
  -H "Cookie: your-session-cookie"
```

#### Add New Shipment
```bash
curl -X POST "http://localhost/warehouse-manager/api-shipment-add" \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{
    "shipment_number": "SHP-003",
    "type": "incoming",
    "status": "pending",
    "supplier_id": 1,
    "expected_date": "2024-01-20"
  }'
```

## 🔒 Security Features

- **Authentication Required**: All endpoints require valid warehouse manager login
- **CSRF Protection**: Built-in CSRF token validation
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Using CodeIgniter's Query Builder
- **XSS Protection**: Output escaping and input sanitization

## 📈 Dashboard Metrics

The system provides real-time analytics including:

- **Total Inventory Items**: Current count of all items
- **Low Stock Alerts**: Items below minimum threshold
- **Pending Shipments**: Incoming and outgoing shipments awaiting processing
- **Pending Approvals**: Requests awaiting manager approval
- **User Activity**: Recent system activities and changes

## 🚨 Error Handling

### Standard Error Responses

#### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "item_name": "The item_name field is required.",
    "quantity": "The quantity field must be a number."
  }
}
```

#### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "message": "An internal server error occurred"
}
```

## 🔧 Configuration

### Environment Variables
```env
# Database Configuration
database.default.hostname = localhost
database.default.database = warehouse_db
database.default.username = db_user
database.default.password = db_password

# App Configuration
app.baseURL = 'http://localhost/'
app.indexPage = ''

# Session Configuration
app.sessionDriver = 'CodeIgniter\Session\Handlers\FileHandler'
app.sessionSavePath = WRITEPATH . 'session'
```

### Low Stock Threshold
Configure in `app/Config/App.php`:
```php
public $lowStockThreshold = 10; // Alert when quantity < 10
```

## 📝 Development Notes

1. **Database Migrations**: Use `php spark make:migration` for schema changes
2. **API Versioning**: Consider versioning for future API updates
3. **Caching**: Implement caching for frequently accessed data
4. **Logging**: All API actions are logged for audit purposes
5. **Testing**: Write unit tests for critical business logic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the API Reference documentation
- Review CodeIgniter 4 documentation
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ using CodeIgniter 4**