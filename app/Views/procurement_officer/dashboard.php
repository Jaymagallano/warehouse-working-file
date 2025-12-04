<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Procurement Officer Dashboard</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/procurement-officer.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Procurement Officer</span>
        </div>
        <ul>
            <li><a href="<?= base_url('procurement-officer/dashboard') ?>" class="active">Dashboard</a></li>
            <li><a href="<?= base_url('procurement-officer/purchase-orders') ?>">Purchase Orders</a></li>
            <li><a href="<?= base_url('procurement-officer/suppliers') ?>">Suppliers</a></li>
            <li><a href="<?= base_url('procurement-officer/materials') ?>">Materials</a></li>
            <li><a href="<?= base_url('procurement-officer/requisitions') ?>">Requisitions</a></li>
            <li><a href="<?= base_url('procurement-officer/delivery-tracking') ?>">Delivery Tracking</a></li>
            <li><a href="<?= base_url('procurement-officer/invoices') ?>">Invoices & Payments</a></li>
            <li><a href="<?= base_url('procurement-officer/reports') ?>">Reports</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div id="dashboard-section">
            <h1>Welcome, Procurement Officer!</h1>
            <div class="dashboard-row">
                <div class="dashboard-col">
                    <div class="dashboard-cards">
                        <div class="dashboard-card">
                            <div class="card-title">Purchase Orders</div>
                            <div class="card-value" id="po-count">15</div>
                            <div class="card-status">3 pending approval</div>
                        </div>
                        <div class="dashboard-card">
                            <div class="card-title">Requisitions</div>
                            <div class="card-value" id="req-count">8</div>
                            <div class="card-status">2 need attention</div>
                        </div>
                        <div class="dashboard-card">
                            <div class="card-title">Deliveries</div>
                            <div class="card-value" id="delivery-count">5</div>
                            <div class="card-status">Expected this week</div>
                        </div>
                        <div class="dashboard-card">
                            <div class="card-title">Invoices</div>
                            <div class="card-value" id="invoice-count">12</div>
                            <div class="card-status">4 pending review</div>
                        </div>
                    </div>
                    
                    <div class="dashboard-section">
                        <h2>Low Stock Items</h2>
                        <div class="table-wrapper">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Item ID</th>
                                        <th>Name</th>
                                        <th>Current Stock</th>
                                        <th>Min. Level</th>
                                        <th>Supplier</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="low-stock-table">
                                    <!-- JS will populate this -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="dashboard-section">
                        <h2>Recent Purchase Orders</h2>
                        <div class="table-wrapper">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>PO #</th>
                                        <th>Supplier</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="recent-po-table">
                                    <!-- JS will populate this -->
                                </tbody>
                            </table>
                        </div>
                        <div class="view-all-link">
                            <a href="<?= base_url('procurement-officer/purchase-orders') ?>">View all purchase orders →</a>
                        </div>
                    </div>

                    <div class="dashboard-section">
                        <h2>Pending Invoices</h2>
                        <div class="table-wrapper">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Invoice #</th>
                                        <th>Supplier</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="recent-invoices-table">
                                    <!-- JS will populate this -->
                                </tbody>
                            </table>
                        </div>
                        <div class="view-all-link">
                            <a href="<?= base_url('procurement-officer/invoices') ?>">View all invoices →</a>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-col dashboard-col-right">
                    <div class="dashboard-section">
                        <h2>Action Items</h2>
                        <ul class="action-items" id="action-items">
                            <!-- JS will populate this -->
                        </ul>
                    </div>
                    
                    <div class="dashboard-section">
                        <h2>Upcoming Deliveries</h2>
                        <div class="delivery-timeline" id="delivery-timeline">
                            <!-- JS will populate this -->
                        </div>
                    </div>
                    
                    <div class="dashboard-section">
                        <h2>Supplier Performance</h2>
                        <div class="supplier-performance">
                            <div class="performance-chart" id="supplier-chart">
                                <!-- Canvas for chart -->
                                <canvas id="supplierChart" height="220"></canvas>
                            </div>
                            <div class="top-suppliers">
                                <h3>Top Suppliers</h3>
                                <ul id="top-suppliers-list">
                                    <!-- JS will populate this -->
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Quick Order Modal -->
    <div class="modal" id="quickOrderModal">
        <div class="modal-content">
            <span class="close" id="closeQuickOrderModal">&times;</span>
            <h3>Create Purchase Order</h3>
            <form id="quickOrderForm" method="post" action="<?= base_url('procurement-officer/create-po') ?>">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label for="item-id">Item</label>
                    <input type="text" id="item-id" name="item_id" readonly>
                    <input type="text" id="item-name" name="item_name" readonly>
                </div>
                
                <div class="form-group">
                    <label for="supplier">Supplier</label>
                    <select id="supplier" name="supplier" required>
                        <!-- JS will populate this -->
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="quantity">Quantity</label>
                    <input type="number" id="quantity" name="quantity" min="1" required>
                </div>
                
                <div class="form-group">
                    <label for="delivery-date">Required Delivery Date</label>
                    <input type="date" id="delivery-date" name="delivery_date" required>
                </div>
                
                <button type="submit" class="primary-btn">Create PO</button>
            </form>
        </div>
    </div>

    <!-- Include Chart.js for supplier performance chart -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
    <script src="<?= base_url('assets/js/procurement-officer.js') ?>"></script>
</body>
</html>