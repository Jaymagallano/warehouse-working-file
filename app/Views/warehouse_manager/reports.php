<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WM Reports</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/wm-reports.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Warehouse Manager</span>
        </div>
        <ul>
            <li><a href="<?= base_url('warehouse-manager/dashboard') ?>">Dashboard</a></li>
            <li><a href="<?= base_url('warehouse-manager/inventory-overview') ?>">Inventory Overview</a></li>
            <li><a href="<?= base_url('warehouse-manager/receiving') ?>">Receiving</a></li>
            <li><a href="<?= base_url('warehouse-manager/shipping') ?>">Shipping</a></li>
            <li><a href="<?= base_url('warehouse-manager/approvals') ?>">Approvals</a></li>
            <li><a href="<?= base_url('warehouse-manager/batch-tracking') ?>">Batch/Lot Tracking</a></li>
            <li><a href="<?= base_url('warehouse-manager/reports') ?>" class="active">Reports</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="dashboard-section" id="reports-section">
            <h2>Reports</h2>
            <form id="reportFilterForm" class="report-filter-form" method="post" action="<?= base_url('warehouse-manager/generate-report') ?>">
                <?= csrf_field() ?>
                <label for="reportType">Report Type:</label>
                <select id="reportType" name="reportType">
                    <option value="inventory">Inventory Overview</option>
                    <option value="lowstock">Low Stock Alerts</option>
                    <option value="movement">Stock Movement Logs</option>
                    <option value="approval">Approval Requests</option>
                    <option value="summary">Warehouse Reports</option>
                    <option value="batch">Batch/Lot Tracking</option>
                </select>
                <label for="fromDate">From:</label>
                <input type="date" id="fromDate" name="fromDate">
                <label for="toDate">To:</label>
                <input type="date" id="toDate" name="toDate">
                <button type="submit">Generate</button>
            </form>
            <div class="reports-table-wrapper">
                <table class="reports-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody id="reports-table-body">
                        <!-- JS will populate -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="<?= base_url('assets/js/wm-reports.js') ?>"></script>
</body>
</html>