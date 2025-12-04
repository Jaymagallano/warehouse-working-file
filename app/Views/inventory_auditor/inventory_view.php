<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Inventory View | Inventory Auditor</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/inventory-auditor.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Inventory Auditor</span>
        </div>
        <ul>
            <li><a href="<?= base_url('inventory-auditor/dashboard') ?>">Dashboard</a></li>
            <li><a href="<?= base_url('inventory-auditor/audit-schedule') ?>">Audit Schedule</a></li>
            <li><a href="<?= base_url('inventory-auditor/discrepancies') ?>">Discrepancies</a></li>
            <li><a href="<?= base_url('inventory-auditor/inventory-view') ?>" class="active">Inventory View</a></li>
            <li><a href="<?= base_url('inventory-auditor/audit-reports') ?>">Audit Reports</a></li>
            <li><a href="<?= base_url('inventory-auditor/reconciliation') ?>">Reconciliation</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content inventory-view">
        <div class="inventory-header">
            <h1>Inventory View</h1>
            <div class="inventory-actions">
                <div class="search-filter-group">
                    <input type="text" id="inventory-search" placeholder="Search inventory...">
                    <select id="warehouse-filter">
                        <option value="all">All Warehouses</option>
                        <option value="a">Warehouse A</option>
                        <option value="b">Warehouse B</option>
                        <option value="c">Warehouse C</option>
                    </select>
                    <select id="category-filter">
                        <option value="all">All Categories</option>
                        <option value="building">Building Materials</option>
                        <option value="electrical">Electrical</option>
                        <option value="tools">Tools & Equipment</option>
                        <option value="plumbing">Plumbing</option>
                        <option value="finishing">Finishing Materials</option>
                    </select>
                    <button id="search-btn" class="action-btn">Search</button>
                </div>
                <div class="view-controls">
                    <button class="view-btn active" data-view="grid"><i class="fas fa-th"></i> Grid</button>
                    <button class="view-btn" data-view="list"><i class="fas fa-list"></i> List</button>
                </div>
            </div>
        </div>

        <div class="dashboard-section">
            <div class="inventory-stats">
                <div class="inventory-metric">
                    <div class="metric-value" id="total-items">1,245</div>
                    <div class="metric-label">Total Items</div>
                </div>
                <div class="inventory-metric">
                    <div class="metric-value" id="total-value">$842,500</div>
                    <div class="metric-label">Total Value</div>
                </div>
                <div class="inventory-metric warning">
                    <div class="metric-value" id="low-stock">24</div>
                    <div class="metric-label">Low Stock</div>
                </div>
                <div class="inventory-metric danger">
                    <div class="metric-value" id="out-of-stock">8</div>
                    <div class="metric-label">Out of Stock</div>
                </div>
            </div>
            
            <div id="grid-view" class="inventory-grid-view">
                <!-- JS will populate this with inventory item cards -->
            </div>
            
            <div id="list-view" class="inventory-list-view" style="display:none;">
                <table class="inventory-table">
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Warehouse</th>
                            <th>Location</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Value</th>
                            <th>Last Audited</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="inventory-table-body">
                        <!-- JS will populate -->
                    </tbody>
                </table>
            </div>
            
            <div class="pagination-controls">
                <button class="pagination-btn" id="prev-page" disabled>&lt; Previous</button>
                <div class="pagination-info">Page <span id="current-page">1</span> of <span id="total-pages">5</span></div>
                <button class="pagination-btn" id="next-page">Next &gt;</button>
            </div>
        </div>
    </div>
    
    <!-- Inventory Item Details Modal -->
    <div class="modal" id="itemModal">
        <div class="modal-content">
            <span class="close" id="closeItemModal">&times;</span>
            <h3>Item Details</h3>
            <div id="item-details"></div>
            <div class="modal-actions">
                <button id="audit-history-btn" class="secondary-btn">View Audit History</button>
                <button id="print-details-btn" class="primary-btn">Print Details</button>
            </div>
        </div>
    </div>
    
    <!-- Audit History Modal -->
    <div class="modal" id="auditHistoryModal">
        <div class="modal-content modal-lg">
            <span class="close" id="closeAuditHistoryModal">&times;</span>
            <h3>Audit History</h3>
            <div id="audit-history-content">
                <table class="audit-history-table">
                    <thead>
                        <tr>
                            <th>Audit ID</th>
                            <th>Date</th>
                            <th>Auditor</th>
                            <th>System Qty</th>
                            <th>Physical Qty</th>
                            <th>Variance</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody id="audit-history-body">
                        <!-- JS will populate -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <script src="<?= base_url('assets/js/ia-inventory-view.js') ?>"></script>
</body>
</html>