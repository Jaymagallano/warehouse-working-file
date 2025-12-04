<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Warehouse Staff Inventory</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/warehouse-staff.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Warehouse Staff</span>
        </div>
        <ul>
            <li><a href="<?= base_url('warehouse-staff/dashboard') ?>">Dashboard</a></li>
            <li><a href="<?= base_url('warehouse-staff/inventory') ?>" class="active">Inventory</a></li>
            <li><a href="<?= base_url('warehouse-staff/receiving') ?>">Receiving</a></li>
            <li><a href="<?= base_url('warehouse-staff/shipping') ?>">Shipping</a></li>
            <li><a href="<?= base_url('warehouse-staff/physical-count') ?>">Physical Count</a></li>
            <li><a href="<?= base_url('warehouse-staff/scan') ?>">Scan Items</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="dashboard-section" id="inventory-section">
            <h1>Inventory Overview</h1>
            <div class="inventory-search-bar">
                <input type="text" id="inventorySearchInput" placeholder="Search inventory...">
                <select id="categoryFilter">
                    <option value="all">All Categories</option>
                    <option value="building">Building Materials</option>
                    <option value="steel">Steel Products</option>
                    <option value="finishing">Finishing Materials</option>
                    <option value="tools">Tools & Equipment</option>
                </select>
                <button id="searchBtn">Search</button>
            </div>
            <div class="inventory-table-wrapper">
                <table class="inventory-table">
                    <thead>
                        <tr>
                            <th>Material ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Unit</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="inventory-table-body">
                        <!-- JS will populate -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Item Details Modal -->
    <div class="modal" id="itemModal">
        <div class="modal-content">
            <span class="close" id="closeItemModal">&times;</span>
            <h3>Item Details</h3>
            <div id="itemDetails"></div>
        </div>
    </div>

    <script src="<?= base_url('assets/js/warehouse-staff-inventory.js') ?>"></script>
</body>
</html>