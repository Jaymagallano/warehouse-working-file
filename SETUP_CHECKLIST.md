# ✅ Warehouse Manager Database Setup Checklist

## Pre-Setup Requirements

- [ ] XAMPP installed and running
- [ ] MySQL database created
- [ ] CodeIgniter 4 project running
- [ ] `.env` file configured with database credentials

---

## Step 1: Database Configuration

### 1.1 Update `.env` file
```bash
# Location: /.env

database.default.hostname = localhost
database.default.database = warehouse_db
database.default.username = root
database.default.password = 
database.default.DBDriver = MySQLi
database.default.DBPrefix =
database.default.port = 3306
```

- [ ] Database name updated
- [ ] Username set correctly
- [ ] Password set correctly (blank if no password)

### 1.2 Enable .env file
```bash
# Rename env to .env if not done yet
# In app/Config/Database.php, verify it's loading from .env
```

- [ ] `.env` file is active (not just `env`)
- [ ] Database config is loading properly

---

## Step 2: Run Migrations

```bash
# Open terminal in project root
php spark migrate
```

**Expected Output:**
```
Running: 2024-01-01-000001_CreateWarehouseTables
Running: 2024-01-01-000001_CreateShipmentsTable
Running: 2024-01-01-000002_CreateApprovalsTable
...
Done
```

- [ ] All migrations ran successfully
- [ ] No error messages
- [ ] Tables created in database

### Verify Tables Created:
```sql
-- Run in phpMyAdmin or MySQL client
SHOW TABLES;
```

Expected tables:
- [ ] `users`
- [ ] `inventory`
- [ ] `suppliers`
- [ ] `purchase_orders`
- [ ] `shipments`
- [ ] `approvals`
- [ ] `reports`

---

## Step 3: Insert Sample Data (Optional but Recommended)

### 3.1 Create a User
```sql
-- Run in phpMyAdmin SQL tab
INSERT INTO users (username, password, email, role, status, created_at, updated_at) 
VALUES (
  'manager', 
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
  'manager@warehouse.com', 
  'warehouse_manager', 
  'active',
  NOW(),
  NOW()
);
```

- [ ] User created successfully
- [ ] Can login with username: `manager`, password: `password`

### 3.2 Add Sample Inventory Items
```sql
INSERT INTO inventory (item_code, item_name, category, quantity, unit, location, created_at, updated_at) 
VALUES
('CEM-001', 'Cement', 'Binding', 120, 'bags', 'Warehouse A', NOW(), NOW()),
('REB-001', 'Steel Rebar', 'Steel', 30, 'pcs', 'Warehouse B', NOW(), NOW()),
('PLY-001', 'Plywood', 'Wood', 75, 'sheets', 'Warehouse A', NOW(), NOW()),
('GRV-001', 'Gravel', 'Aggregate', 200, 'kg', 'Warehouse C', NOW(), NOW()),
('PAI-001', 'Paint', 'Finishing', 5, 'cans', 'Warehouse A', NOW(), NOW());
```

- [ ] Sample inventory added
- [ ] Data visible in database

### 3.3 Add Sample Shipments
```sql
INSERT INTO shipments (shipment_number, type, status, expected_date, created_at, updated_at) 
VALUES
('SHP-001', 'incoming', 'pending', '2024-01-20', NOW(), NOW()),
('SHP-002', 'outgoing', 'pending', '2024-01-18', NOW(), NOW()),
('SHP-003', 'incoming', 'completed', '2024-01-15', NOW(), NOW());
```

- [ ] Sample shipments added
- [ ] Data visible in database

### 3.4 Add Sample Approvals
```sql
INSERT INTO approvals (type, reference_id, status, requested_by, request_date, created_at, updated_at) 
VALUES
('Stock Transfer', 1, 'pending', 1, NOW(), NOW(), NOW()),
('Stock Adjustment', 2, 'pending', 1, NOW(), NOW(), NOW());
```

- [ ] Sample approvals added
- [ ] Data visible in database

---

## Step 4: Test the Application

### 4.1 Login Test
1. Open browser: `http://localhost/warehousetry` (or your project URL)
2. Login with:
   - Username: `manager`
   - Password: `password`

- [ ] Login successful
- [ ] Redirected to dashboard

### 4.2 Dashboard Test
Navigate to: `http://localhost/warehousetry/warehouse-manager/dashboard`

Check if you see:
- [ ] Total Inventory Items (should show 5 or your count)
- [ ] Low Stock Alerts (should show 1 - Paint has 5 cans)
- [ ] Pending Shipments (should show 2)
- [ ] Recent Activity section
- [ ] Notifications section
- [ ] Approval Requests section

**If data is not showing:**
- [ ] Check browser console for errors (F12 → Console)
- [ ] Check if API endpoints are accessible
- [ ] Verify routes are configured correctly

### 4.3 Inventory Overview Test
Navigate to: `http://localhost/warehousetry/warehouse-manager/inventory-overview`

- [ ] Table shows all inventory items from database
- [ ] Item names, categories, quantities are correct
- [ ] Status column shows Low/Medium/OK based on quantity

### 4.4 Add Inventory Test
1. Click "+ Add Item" button
2. Fill in the form:
   - Material Name: "Test Cement"
   - Category: "Binding"
   - Stock: 100
   - Unit: "bags"
3. Click "Add Item"

- [ ] Success message appears
- [ ] Table reloads with new item
- [ ] New item is saved in database (check phpMyAdmin)

### 4.5 Edit Inventory Test
1. Click "Edit" button on any item
2. Change the quantity
3. Click "Save Changes"

- [ ] Success message appears
- [ ] Table shows updated quantity
- [ ] Database reflects the change

### 4.6 Delete Inventory Test
1. Click "Delete" button on test item
2. Confirm deletion

- [ ] Confirmation modal appears
- [ ] After confirming, item is removed from table
- [ ] Item is deleted from database

---

## Step 5: API Endpoint Testing

### 5.1 Test API in Browser Console

Open browser console (F12 → Console) and run:

```javascript
// Test 1: Get Inventory
fetch('/warehouse-manager/api-inventory')
  .then(r => r.json())
  .then(data => console.log('Inventory:', data));

// Test 2: Get Stats
fetch('/warehouse-manager/api-inventory-stats')
  .then(r => r.json())
  .then(data => console.log('Stats:', data));

// Test 3: Get Notifications
fetch('/warehouse-manager/api-notifications')
  .then(r => r.json())
  .then(data => console.log('Notifications:', data));
```

Expected Results:
- [ ] Inventory list is returned
- [ ] Stats object shows correct numbers
- [ ] Notifications include low stock alerts

### 5.2 Test POST Operations (in console)

```javascript
// Test Add Item
fetch('/warehouse-manager/api-inventory-add', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    item_code: 'TST-999',
    item_name: 'Test Item',
    category: 'Testing',
    quantity: 50,
    unit: 'pcs',
    location: 'Warehouse A'
  })
})
.then(r => r.json())
.then(data => console.log('Add Result:', data));
```

- [ ] Item added successfully
- [ ] Returns success message and new ID

---

## Step 6: Verify Database Changes

After each operation (Add/Edit/Delete), check the database:

```sql
-- Check inventory table
SELECT * FROM inventory ORDER BY id DESC LIMIT 10;

-- Check if low stock items exist
SELECT * FROM inventory WHERE quantity < 10;

-- Check shipments
SELECT * FROM shipments;

-- Check approvals
SELECT * FROM approvals WHERE status = 'pending';
```

- [ ] All changes are reflected in database
- [ ] No orphaned records
- [ ] Timestamps are correct

---

## Troubleshooting

### Problem: Dashboard shows "0" or "--" for all stats

**Solution:**
1. Check browser console for errors
2. Verify API routes are configured
3. Check database connection
4. Make sure migrations ran successfully

### Problem: "404 Not Found" on API calls

**Solution:**
1. Verify Routes.php has all API routes
2. Check base URL in JavaScript files
3. Clear browser cache
4. Restart Apache/PHP

### Problem: Data not saving to database

**Solution:**
1. Check database credentials in .env
2. Verify table structure matches Model
3. Check PHP error logs in `writable/logs/`
4. Enable debug mode in .env: `CI_ENVIRONMENT = development`

### Problem: Delete not working

**Solution:**
1. Check for foreign key constraints
2. Verify cascade settings in migrations
3. Check PHP error logs
4. Ensure user has delete permissions

### Problem: JavaScript console errors

**Solution:**
1. Check file paths are correct
2. Verify JavaScript files are loaded
3. Check for typos in function names
4. Use browser debugger to trace errors

---

## Post-Setup Verification

Run through this final checklist:

- [ ] Can login as warehouse manager
- [ ] Dashboard loads with real data
- [ ] Can view all inventory items
- [ ] Can add new inventory items
- [ ] Can edit existing items
- [ ] Can delete items (and they're removed from DB)
- [ ] Notifications show low stock alerts
- [ ] Stats update in real-time
- [ ] No JavaScript console errors
- [ ] No PHP errors in logs

---

## Next Steps

Once everything is working:

1. **Customize the system:**
   - Add more fields to inventory
   - Create custom reports
   - Add user permissions

2. **Enhance functionality:**
   - Add barcode scanning
   - Implement email notifications
   - Create Excel export feature

3. **Improve UI/UX:**
   - Add loading spinners
   - Improve form validation
   - Add data pagination

4. **Security:**
   - Implement proper authentication
   - Add input validation
   - Set up CSRF protection

---

## Support Files

- Setup Guide: `WAREHOUSE_MANAGER_DATABASE_SETUP.md`
- API Reference: `API_REFERENCE.md`
- This Checklist: `SETUP_CHECKLIST.md`

---

**Congratulations! 🎉**

Kung natapos mo lahat ng checklist items, ang Warehouse Manager module mo ay fully functional na at connected sa database!
