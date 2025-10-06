<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Warehouse Manager Dashboard</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/warehouse-manager.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Warehouse Manager</span>
        </div>
        <ul>
            <li><a href="<?= base_url('warehouse-manager/dashboard') ?>" id="dashboard-link" class="active">Dashboard</a></li>
            <li><a href="<?= base_url('warehouse-manager/inventory-overview') ?>" id="inventory-link">Inventory Overview</a></li>
            <li><a href="<?= base_url('warehouse-manager/receiving') ?>" id="receiving-link">Receiving</a></li>
            <li><a href="<?= base_url('warehouse-manager/shipping') ?>" id="shipping-link">Shipping</a></li>
            <li><a href="<?= base_url('warehouse-manager/approvals') ?>" id="approvals-link">Approvals</a></li>
            <li><a href="<?= base_url('warehouse-manager/batch-tracking') ?>" id="batch-link">Batch/Lot Tracking</a></li>
            <li><a href="<?= base_url('warehouse-manager/reports') ?>" id="reports-link">Reports</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div id="dashboard-section">
            <h1>Welcome, Warehouse Manager!</h1>
            <div class="dashboard-row">
                <div class="dashboard-col">
                    <div class="dashboard-cards">
                        <div class="dashboard-card">
                            <div class="card-title">Total Inventory Items</div>
                            <div class="card-value" id="stat-inventory">--</div>
                        </div>
                        <div class="dashboard-card">
                            <div class="card-title">Low Stock Alerts</div>
                            <div class="card-value" id="stat-lowstock">--</div>
                        </div>
                        <div class="dashboard-card">
                            <div class="card-title">Pending Shipments</div>
                            <div class="card-value" id="stat-shipments">--</div>
                        </div>
                        <div class="dashboard-card">
                            <div class="card-title">Pending Receivings</div>
                            <div class="card-value" id="stat-receivings">--</div>
                        </div>
                        <div class="dashboard-card">
                            <div class="card-title">Active Users/Staff</div>
                            <div class="card-value" id="stat-users">--</div>
                        </div>
                    </div>
                    <div class="dashboard-section">
                        <h2>Inventory & Shipment Trends</h2>
                        <div class="dashboard-chart-placeholder">
                            <span>Charts/Graphs (Inventory trends, Shipment volume over time) - Coming Soon</span>
                        </div>
                    </div>
                    <div class="dashboard-section">
                        <h2>Recent Activity</h2>
                        <ul class="activity-list" id="activity-list">
                            <!-- JS will populate -->
                        </ul>
                    </div>
                </div>
                <div class="dashboard-col dashboard-col-right">
                    <div class="dashboard-section">
                        <h2>Notifications & Alerts</h2>
                        <ul class="notification-list" id="notification-list">
                            <!-- JS will populate -->
                        </ul>
                    </div>
                    <div class="dashboard-section">
                        <h2>Approval Requests</h2>
                        <ul class="approval-list" id="approval-list">
                            <!-- JS will populate -->
                        </ul>
                        <a href="<?= base_url('warehouse-manager/approvals') ?>" class="approval-link">View all approval requests &rarr;</a>
                    </div>
                </div>
            </div>
        </div>
        <div id="dynamic-content"></div>
    </div>
    <script src="<?= base_url('assets/js/warehouse-manager.js') ?>"></script>
</body>
</html>