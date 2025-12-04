<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Warehouse Staff Dashboard</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/warehouse-staff.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Warehouse Staff</span>
        </div>
        <ul>
            <li><a href="<?= base_url('warehouse-staff/dashboard') ?>" class="active">Dashboard</a></li>
            <li><a href="<?= base_url('warehouse-staff/inventory') ?>">Inventory</a></li>
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
        <div id="dashboard-section">
            <h1>Welcome, Warehouse Staff!</h1>
            <div class="dashboard-row">
                <div class="dashboard-col">
                    <div class="dashboard-cards">
                        <div class="dashboard-card">
                            <div class="card-title">Pending Tasks</div>
                            <div class="card-value" id="stat-tasks">5</div>
                        </div>
                        <div class="dashboard-card">
                            <div class="card-title">Items Received Today</div>
                            <div class="card-value" id="stat-received">12</div>
                        </div>
                        <div class="dashboard-card">
                            <div class="card-title">Items Shipped Today</div>
                            <div class="card-value" id="stat-shipped">8</div>
                        </div>
                    </div>
                    <div class="dashboard-section">
                        <h2>Today's Tasks</h2>
                        <div class="task-list">
                            <div class="task-card">
                                <div class="task-header">Receive Shipment</div>
                                <div class="task-details">Cement delivery from Supplier A</div>
                                <div class="task-status">Pending</div>
                                <button class="task-action">Start Task</button>
                            </div>
                            <div class="task-card">
                                <div class="task-header">Physical Count</div>
                                <div class="task-details">Verify steel rebar inventory in Zone B</div>
                                <div class="task-status">Pending</div>
                                <button class="task-action">Start Task</button>
                            </div>
                            <div class="task-card">
                                <div class="task-header">Prepare Shipment</div>
                                <div class="task-details">Paint materials for Site C</div>
                                <div class="task-status">In Progress</div>
                                <button class="task-action">Continue</button>
                            </div>
                        </div>
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
                        <h2>Recent Activity</h2>
                        <ul class="activity-list" id="activity-list">
                            <!-- JS will populate -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="<?= base_url('assets/js/warehouse-staff.js') ?>"></script>
</body>
</html>