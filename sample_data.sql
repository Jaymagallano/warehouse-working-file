-- ============================================
-- WAREHOUSE MANAGER SAMPLE DATA
-- ============================================
-- Run this in phpMyAdmin after migrations
-- This will populate your database with test data
-- ============================================

-- 1. CREATE TEST USER (Warehouse Manager)
-- Password: password
INSERT INTO users (username, password, email, role, status, created_at, updated_at) 
VALUES 
('manager', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'manager@warehouse.com', 'warehouse_manager', 'active', NOW(), NOW()),
('staff1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'staff1@warehouse.com', 'warehouse_staff', 'active', NOW(), NOW()),
('auditor1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'auditor@warehouse.com', 'inventory_auditor', 'active', NOW(), NOW()),
('procurement1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'procurement@warehouse.com', 'procurement_officer', 'active', NOW(), NOW());

-- 2. POPULATE INVENTORY TABLE
INSERT INTO inventory (item_code, item_name, category, quantity, unit, location, batch_number, expiry_date, created_at, updated_at) 
VALUES
-- Binding Materials
('CEM-001', 'Portland Cement', 'Binding', 120, 'bags', 'Warehouse A', 'BATCH-2024-001', '2025-12-31', NOW(), NOW()),
('CEM-002', 'White Cement', 'Binding', 45, 'bags', 'Warehouse A', 'BATCH-2024-002', '2025-12-31', NOW(), NOW()),
('MRT-001', 'Mortar Mix', 'Binding', 80, 'bags', 'Warehouse A', NULL, NULL, NOW(), NOW()),

-- Steel Materials
('REB-001', 'Steel Rebar 10mm', 'Steel', 30, 'pcs', 'Warehouse B', NULL, NULL, NOW(), NOW()),
('REB-002', 'Steel Rebar 12mm', 'Steel', 25, 'pcs', 'Warehouse B', NULL, NULL, NOW(), NOW()),
('REB-003', 'Steel Rebar 16mm', 'Steel', 15, 'pcs', 'Warehouse B', NULL, NULL, NOW(), NOW()),
('WRM-001', 'Wire Mesh', 'Steel', 50, 'sheets', 'Warehouse B', NULL, NULL, NOW(), NOW()),

-- Wood Materials
('PLY-001', 'Plywood 4x8ft', 'Wood', 75, 'sheets', 'Warehouse A', NULL, NULL, NOW(), NOW()),
('PLY-002', 'Marine Plywood', 'Wood', 40, 'sheets', 'Warehouse A', NULL, NULL, NOW(), NOW()),
('LBR-001', '2x4 Lumber', 'Wood', 200, 'pcs', 'Warehouse C', NULL, NULL, NOW(), NOW()),

-- Aggregate Materials
('GRV-001', 'Gravel', 'Aggregate', 200, 'kg', 'Warehouse C', NULL, NULL, NOW(), NOW()),
('SND-001', 'Sand', 'Aggregate', 180, 'kg', 'Warehouse C', NULL, NULL, NOW(), NOW()),
('CRS-001', 'Crushed Stone', 'Aggregate', 150, 'kg', 'Warehouse C', NULL, NULL, NOW(), NOW()),

-- Finishing Materials
('PAI-001', 'White Paint', 'Finishing', 5, 'cans', 'Warehouse A', 'BATCH-2024-010', '2025-06-30', NOW(), NOW()),
('PAI-002', 'Blue Paint', 'Finishing', 8, 'cans', 'Warehouse A', 'BATCH-2024-011', '2025-06-30', NOW(), NOW()),
('THN-001', 'Paint Thinner', 'Finishing', 12, 'liters', 'Warehouse A', NULL, NULL, NOW(), NOW()),

-- Hardware
('NLS-001', 'Common Nails 2"', 'Hardware', 60, 'kg', 'Warehouse D', NULL, NULL, NOW(), NOW()),
('NLS-002', 'Common Nails 3"', 'Hardware', 45, 'kg', 'Warehouse D', NULL, NULL, NOW(), NOW()),
('SCR-001', 'Wood Screws', 'Hardware', 30, 'boxes', 'Warehouse D', NULL, NULL, NOW(), NOW()),

-- Electrical
('WIR-001', 'Electrical Wire 2.0mm', 'Electrical', 100, 'meters', 'Warehouse D', NULL, NULL, NOW(), NOW()),
('CON-001', 'Conduit Pipes', 'Electrical', 50, 'pcs', 'Warehouse D', NULL, NULL, NOW(), NOW());

-- 3. POPULATE SUPPLIERS TABLE
INSERT INTO suppliers (supplier_code, name, contact_person, email, phone, address, status, created_at, updated_at)
VALUES
('SUP-001', 'ABC Construction Supply', 'Juan Dela Cruz', 'abc@supply.com', '09171234567', '123 Main St, Manila', 'active', NOW(), NOW()),
('SUP-002', 'XYZ Building Materials', 'Maria Santos', 'xyz@materials.com', '09181234567', '456 Market Ave, Quezon City', 'active', NOW(), NOW()),
('SUP-003', 'BuildPro Trading', 'Pedro Reyes', 'buildpro@trade.com', '09191234567', '789 Commerce Rd, Makati', 'active', NOW(), NOW()),
('SUP-004', 'Steel Masters Inc', 'Jose Garcia', 'steel@masters.com', '09201234567', '321 Industrial Park, Pasig', 'active', NOW(), NOW()),
('SUP-005', 'Paint Plus Corporation', 'Anna Cruz', 'paintplus@corp.com', '09211234567', '654 Business St, Mandaluyong', 'active', NOW(), NOW());

-- 4. POPULATE PURCHASE ORDERS TABLE
INSERT INTO purchase_orders (po_number, supplier_id, status, total_amount, order_date, expected_delivery, created_at, updated_at)
VALUES
('PO-2024-001', 1, 'completed', 150000.00, '2024-01-05', '2024-01-10', NOW(), NOW()),
('PO-2024-002', 2, 'approved', 85000.00, '2024-01-10', '2024-01-18', NOW(), NOW()),
('PO-2024-003', 3, 'pending', 120000.00, '2024-01-12', '2024-01-20', NOW(), NOW()),
('PO-2024-004', 4, 'approved', 95000.00, '2024-01-14', '2024-01-22', NOW(), NOW());

-- 5. POPULATE SHIPMENTS TABLE
INSERT INTO shipments (shipment_number, type, status, supplier_id, customer_id, expected_date, actual_date, created_at, updated_at)
VALUES
-- Incoming Shipments
('SHP-IN-001', 'incoming', 'completed', 1, NULL, '2024-01-10', '2024-01-10', NOW(), NOW()),
('SHP-IN-002', 'incoming', 'pending', 2, NULL, '2024-01-18', NULL, NOW(), NOW()),
('SHP-IN-003', 'incoming', 'pending', 3, NULL, '2024-01-20', NULL, NOW(), NOW()),
('SHP-IN-004', 'incoming', 'pending', 4, NULL, '2024-01-05', NULL, NOW(), NOW()),

-- Outgoing Shipments
('SHP-OUT-001', 'outgoing', 'completed', NULL, 1, '2024-01-08', '2024-01-08', NOW(), NOW()),
('SHP-OUT-002', 'outgoing', 'pending', NULL, 2, '2024-01-15', NULL, NOW(), NOW()),
('SHP-OUT-003', 'outgoing', 'pending', NULL, 3, '2024-01-19', NULL, NOW(), NOW());

-- 6. POPULATE APPROVALS TABLE
INSERT INTO approvals (type, reference_id, status, requested_by, approved_by, request_date, created_at, updated_at)
VALUES
('Stock Transfer', 1, 'pending', 2, NULL, '2024-01-14 09:30:00', NOW(), NOW()),
('Stock Adjustment', 5, 'pending', 2, NULL, '2024-01-14 10:15:00', NOW(), NOW()),
('Purchase Order', 3, 'pending', 4, NULL, '2024-01-12 14:20:00', NOW(), NOW()),
('Stock Transfer', 10, 'approved', 2, 1, '2024-01-10 11:00:00', NOW(), NOW()),
('Stock Adjustment', 15, 'rejected', 2, 1, '2024-01-09 15:45:00', NOW(), NOW());

-- 7. POPULATE REPORTS TABLE (Optional)
INSERT INTO reports (report_type, title, data, generated_by, generated_date, created_at, updated_at)
VALUES
('inventory', 'Monthly Inventory Report - January 2024', '{"total_items": 150, "low_stock": 3, "value": 500000}', 1, '2024-01-15', NOW(), NOW()),
('shipment', 'Shipment Summary - Week 2', '{"incoming": 4, "outgoing": 3, "completed": 2}', 1, '2024-01-14', NOW(), NOW()),
('performance', 'Warehouse Performance Q1 2024', '{"efficiency": 95, "accuracy": 98, "on_time": 92}', 1, '2024-01-10', NOW(), NOW());

-- ============================================
-- VERIFICATION QUERIES
-- Run these to verify data was inserted correctly
-- ============================================

-- Count records in each table
SELECT 'Users' as TableName, COUNT(*) as RecordCount FROM users
UNION ALL
SELECT 'Inventory', COUNT(*) FROM inventory
UNION ALL
SELECT 'Suppliers', COUNT(*) FROM suppliers
UNION ALL
SELECT 'Purchase Orders', COUNT(*) FROM purchase_orders
UNION ALL
SELECT 'Shipments', COUNT(*) FROM shipments
UNION ALL
SELECT 'Approvals', COUNT(*) FROM approvals
UNION ALL
SELECT 'Reports', COUNT(*) FROM reports;

-- View low stock items
SELECT item_code, item_name, quantity, unit, location 
FROM inventory 
WHERE quantity < 50 
ORDER BY quantity ASC;

-- View pending shipments
SELECT shipment_number, type, status, expected_date 
FROM shipments 
WHERE status = 'pending' 
ORDER BY expected_date ASC;

-- View pending approvals
SELECT type, reference_id, status, request_date 
FROM approvals 
WHERE status = 'pending' 
ORDER BY request_date DESC;

-- ============================================
-- CLEANUP QUERIES (if needed)
-- Use these to remove all sample data
-- ============================================

/*
-- WARNING: This will delete ALL data from these tables!
-- Uncomment only if you want to start fresh

DELETE FROM reports;
DELETE FROM approvals;
DELETE FROM shipments;
DELETE FROM purchase_orders;
DELETE FROM suppliers;
DELETE FROM inventory;
DELETE FROM users;

-- Reset auto increment
ALTER TABLE reports AUTO_INCREMENT = 1;
ALTER TABLE approvals AUTO_INCREMENT = 1;
ALTER TABLE shipments AUTO_INCREMENT = 1;
ALTER TABLE purchase_orders AUTO_INCREMENT = 1;
ALTER TABLE suppliers AUTO_INCREMENT = 1;
ALTER TABLE inventory AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;
*/
