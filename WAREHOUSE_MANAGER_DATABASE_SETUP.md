# Warehouse Manager - Database Integration Setup

## Mga Ginawang Pagbabago (Changes Made)

Natapos na ang full database integration para sa Warehouse Manager module! Lahat ng operations ay connected na sa database.

### 1. **Controller Updates** (`app/Controllers/WarehouseManagerController.php`)

Naidagdag ang mga API endpoints:

#### Inventory API
- `GET /warehouse-manager/api-inventory` - Get all inventory items
- `GET /warehouse-manager/api-inventory-stats` - Get dashboard statistics
- `POST /warehouse-manager/api-inventory-add` - Add new inventory item
- `POST /warehouse-manager/api-inventory-update/{id}` - Update inventory item
- `POST /warehouse-manager/api-inventory-delete/{id}` - Delete inventory item

#### Shipment API
- `GET /warehouse-manager/api-shipments` - Get all shipments (with optional type filter)
- `POST /warehouse-manager/api-shipment-add` - Add new shipment
- `POST /warehouse-manager/api-shipment-update/{id}` - Update shipment
- `POST /warehouse-manager/api-shipment-delete/{id}` - Delete shipment

#### Approval API
- `GET /warehouse-manager/api-approvals` - Get approvals (with optional status filter)
- `POST /warehouse-manager/api-approve-request/{id}` - Approve a request
- `POST /warehouse-manager/api-reject-request/{id}` - Reject a request

#### Dashboard API
- `GET /warehouse-manager/api-recent-activity` - Get recent activities
- `GET /warehouse-manager/api-notifications` - Get notifications (low stock, overdue shipments)

### 2. **Routes Updates** (`app/Config/Routes.php`)

Naidagdag ang lahat ng API routes sa warehouse-manager group:
- Inventory CRUD operations
- Shipment CRUD operations
- Approval operations
- Dashboard data endpoints

### 3. **JavaScript Updates**

#### `public/assets/js/warehouse-manager.js`
- Dynamic loading ng dashboard statistics from database
- Real-time notifications para sa low stock at overdue shipments
- Recent activity display
- Approval requests display
- Utility functions para sa date formatting

#### `public/assets/js/wm-inventory-overview.js`
- Complete CRUD operations na naka-connect sa database
- Auto-generate ng item codes
- Dynamic stock status calculation
- Real-time table updates after add/edit/delete operations

## Paano Gamitin (How to Use)

### 1. **I-run ang Migrations**

```bash
php spark migrate
```

Ito ay gagawa ng mga tables:
- `users` - Para sa user management
- `inventory` - Para sa inventory items
- `suppliers` - Para sa supplier information
- `purchase_orders` - Para sa purchase orders
- `shipments` - Para sa incoming/outgoing shipments
- `approvals` - Para sa approval requests
- `reports` - Para sa generated reports

### 2. **Magdagdag ng Sample Data** (Optional)

Pwede kang magdagdag ng sample data gamit ang Seeder o manually sa database:

```sql
-- Sample Inventory Data
INSERT INTO inventory (item_code, item_name, category, quantity, unit, location) VALUES
('CEM-001', 'Cement', 'Binding', 120, 'bags', 'Warehouse A'),
('REB-001', 'Steel Rebar', 'Steel', 30, 'pcs', 'Warehouse B'),
('PLY-001', 'Plywood', 'Wood', 75, 'sheets', 'Warehouse A');

-- Sample Shipments
INSERT INTO shipments (shipment_number, type, status, expected_date) VALUES
('SHP-001', 'incoming', 'pending', '2024-01-15'),
('SHP-002', 'outgoing', 'pending', '2024-01-16');

-- Sample Approvals
INSERT INTO approvals (type, reference_id, status, requested_by, request_date) VALUES
('Stock Transfer', 1, 'pending', 1, NOW()),
('Stock Adjustment', 2, 'pending', 1, NOW());
```

### 3. **Test ang Application**

1. Login bilang Warehouse Manager
2. Pumunta sa Dashboard - dapat makita mo ang:
   - Total inventory count
   - Low stock alerts
   - Pending shipments
   - Notifications
   - Recent activity

3. Pumunta sa Inventory Overview:
   - Click "Add Item" para magdagdag ng bagong item
   - Mag-edit ng existing items
   - Mag-delete ng items
   - Lahat ay naka-save sa database!

## Database Schema

### `inventory` Table
```
- id (INT, Primary Key)
- item_code (VARCHAR, Unique)
- item_name (VARCHAR)
- category (VARCHAR)
- quantity (INT)
- unit (VARCHAR)
- location (VARCHAR)
- batch_number (VARCHAR, nullable)
- expiry_date (DATE, nullable)
- created_at (DATETIME)
- updated_at (DATETIME)
```

### `shipments` Table
```
- id (INT, Primary Key)
- shipment_number (VARCHAR)
- type (ENUM: incoming, outgoing)
- status (VARCHAR)
- supplier_id (INT, nullable)
- customer_id (INT, nullable)
- expected_date (DATE)
- actual_date (DATE, nullable)
- created_at (DATETIME)
- updated_at (DATETIME)
```

### `approvals` Table
```
- id (INT, Primary Key)
- type (VARCHAR)
- reference_id (INT)
- status (VARCHAR)
- requested_by (INT)
- approved_by (INT, nullable)
- request_date (DATETIME)
- created_at (DATETIME)
- updated_at (DATETIME)
```

## Features na Available Na

✅ **Dashboard**
- Real-time statistics
- Low stock alerts
- Overdue shipment alerts
- Recent activity log
- Pending approval requests

✅ **Inventory Management**
- Add new items → naka-save sa database
- Edit existing items → nag-uupdate sa database
- Delete items → natatanggal sa database
- Auto-generated item codes
- Dynamic stock status (Low/Medium/OK)

✅ **Shipment Management**
- View incoming/outgoing shipments
- Update shipment status
- Delete shipments
- All connected to database

✅ **Approval Management**
- View pending approvals
- Approve/Reject requests
- Updates reflected in database

## Troubleshooting

### Kung hindi nag-loload ang data:

1. **Check database connection** sa `.env` file:
```
database.default.hostname = localhost
database.default.database = your_database_name
database.default.username = your_username
database.default.password = your_password
```

2. **Check kung nag-run na ang migrations**:
```bash
php spark migrate:status
```

3. **Check browser console** para sa JavaScript errors:
- Right-click → Inspect → Console tab

4. **Check PHP errors**:
- Tingnan ang `writable/logs/log-{date}.php`

### Common Issues:

**404 Error sa API calls**
- Check kung tama ang routes sa `app/Config/Routes.php`
- Siguraduhin na ang base URL ay tama

**Empty data kahit may laman ang database**
- Check kung may authentication filter
- Check kung may permission issues

**Delete not working**
- Check kung may foreign key constraints
- Check cascade settings sa migrations

## Next Steps

Para mas mapahusay pa:

1. **Add Activity Logger** - Para ma-track lahat ng actions
2. **Add Batch Operations** - Para mag-delete/update ng multiple items
3. **Add Excel Export** - Para ma-export ang inventory data
4. **Add Charts/Graphs** - Para sa visual analytics
5. **Add Email Notifications** - Para sa low stock alerts
6. **Add Barcode Scanner Integration** - Para sa faster inventory updates

## Support

Kung may tanong o problema, check ang:
- Controller file: `app/Controllers/WarehouseManagerController.php`
- JavaScript files: `public/assets/js/warehouse-manager.js` at `wm-inventory-overview.js`
- Routes: `app/Config/Routes.php`
- Models: `app/Models/InventoryModel.php`, `ShipmentModel.php`, etc.

---

**Note**: Lahat ng CRUD operations ay gumagana na sa database. Ang delete operation ay instantly natatanggal sa database at nag-rereload ng table para makita mo ang updated data.
