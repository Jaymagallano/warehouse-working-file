<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Warehouse Staff Scan Items</title>
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
            <li><a href="<?= base_url('warehouse-staff/inventory') ?>">Inventory</a></li>
            <li><a href="<?= base_url('warehouse-staff/receiving') ?>">Receiving</a></li>
            <li><a href="<?= base_url('warehouse-staff/shipping') ?>">Shipping</a></li>
            <li><a href="<?= base_url('warehouse-staff/physical-count') ?>">Physical Count</a></li>
            <li><a href="<?= base_url('warehouse-staff/scan') ?>" class="active">Scan Items</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="dashboard-section" id="scan-section">
            <h1>Scan QR/Barcode</h1>
            
            <div class="scan-options">
                <button class="scan-option-btn active" data-option="receive">Receive Items</button>
                <button class="scan-option-btn" data-option="check">Check Inventory</button>
                <button class="scan-option-btn" data-option="move">Move Items</button>
                <button class="scan-option-btn" data-option="ship">Ship Items</button>
            </div>
            
            <div class="scan-container">
                <div class="video-container">
                    <video id="scanner-video" autoplay></video>
                    <div class="scanner-overlay">
                        <div class="scanner-box"></div>
                    </div>
                </div>
                <div class="scan-controls">
                    <button id="start-scan">Start Camera</button>
                    <button id="capture-scan">Capture</button>
                    <button id="toggle-camera">Switch Camera</button>
                </div>
            </div>
            
            <div class="scan-result">
                <h3>Last Scan Result</h3>
                <div id="result-container">No items scanned yet</div>
            </div>
            
            <div class="scan-history">
                <h3>Recent Scans</h3>
                <ul id="scan-history-list">
                    <!-- JS will populate -->
                </ul>
            </div>
        </div>
    </div>

    <!-- Item Details Modal -->
    <div class="modal" id="itemModal">
        <div class="modal-content">
            <span class="close" id="closeItemModal">&times;</span>
            <h3>Item Details</h3>
            <div id="scanned-item-details"></div>
            <div class="item-actions">
                <button id="update-item-btn">Update Quantity</button>
                <button id="move-item-btn">Move Item</button>
            </div>
        </div>
    </div>

    <script src="<?= base_url('assets/js/warehouse-staff-scan.js') ?>"></script>
</body>
</html>