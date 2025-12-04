<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Batch/Lot Tracking</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/wm-batch-tracking.css') ?>">
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
            <li><a href="<?= base_url('warehouse-manager/batch-tracking') ?>" class="active">Batch/Lot Tracking</a></li>
            <li><a href="<?= base_url('warehouse-manager/reports') ?>">Reports</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="dashboard-section" id="batch-section">
            <h2>Batch/Lot Tracking</h2>
            <div class="batch-search-bar">
                <input type="text" id="batchSearchInput" placeholder="Search by Batch/Lot No., Material, or Status...">
            </div>
            <div class="batch-table-wrapper">
                <table class="batch-table">
                    <thead>
                        <tr>
                            <th>Batch/Lot No.</th>
                            <th>Material</th>
                            <th>Quantity</th>
                            <th>Received Date</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="batch-table-body">
                        <!-- JS will populate -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Batch Details Modal -->
    <div class="modal" id="batchModal">
        <div class="modal-content">
            <span class="close" id="closeBatchModal">&times;</span>
            <h3>Batch/Lot Details</h3>
            <div id="batchDetails"></div>
        </div>
    </div>
    <script src="<?= base_url('assets/js/wm-batch-tracking.js') ?>"></script>
</body>
</html>