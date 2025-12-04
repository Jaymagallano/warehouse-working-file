<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Discrepancies | Inventory Auditor</title>
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
            <li><a href="<?= base_url('inventory-auditor/discrepancies') ?>" class="active">Discrepancies</a></li>
            <li><a href="<?= base_url('inventory-auditor/inventory-view') ?>">Inventory View</a></li>
            <li><a href="<?= base_url('inventory-auditor/audit-reports') ?>">Audit Reports</a></li>
            <li><a href="<?= base_url('inventory-auditor/reconciliation') ?>">Reconciliation</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="discrepancy-header">
            <h1>Inventory Discrepancies</h1>
            <div class="discrepancy-actions">
                <div class="filter-group">
                    <select id="warehouse-filter">
                        <option value="all">All Warehouses</option>
                        <option value="a">Warehouse A</option>
                        <option value="b">Warehouse B</option>
                        <option value="c">Warehouse C</option>
                    </select>
                    <select id="status-filter">
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="investigating">Investigating</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <button id="filter-btn">Filter</button>
                </div>
            </div>
        </div>

        <div class="dashboard-section">
            <div class="discrepancy-stats">
                <div class="stat-card">
                    <div class="stat-value" id="total-discrepancies">24</div>
                    <div class="stat-label">Total Discrepancies</div>
                </div>
                <div class="stat-card warning">
                    <div class="stat-value" id="pending-discrepancies">15</div>
                    <div class="stat-label">Pending</div>
                </div>
                <div class="stat-card info">
                    <div class="stat-value" id="investigating-discrepancies">5</div>
                    <div class="stat-label">Investigating</div>
                </div>
                <div class="stat-card success">
                    <div class="stat-value" id="resolved-discrepancies">4</div>
                    <div class="stat-label">Resolved</div>
                </div>
            </div>
            
            <div class="discrepancy-table-wrapper">
                <table class="discrepancy-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Material</th>
                            <th>Location</th>
                            <th>System Count</th>
                            <th>Physical Count</th>
                            <th>Variance</th>
                            <th>Date Found</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="discrepancy-table-body">
                        <!-- JS will populate -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <!-- Discrepancy Details Modal -->
    <div class="modal" id="discrepancyModal">
        <div class="modal-content">
            <span class="close" id="closeDiscrepancyModal">&times;</span>
            <h3>Discrepancy Details</h3>
            <div id="discrepancy-details"></div>
            <div class="modal-actions">
                <button id="investigate-btn" class="primary-btn">Investigate</button>
                <button id="resolve-btn" class="secondary-btn">Resolve</button>
            </div>
        </div>
    </div>
    
    <!-- Resolution Modal -->
    <div class="modal" id="resolutionModal">
        <div class="modal-content">
            <span class="close" id="closeResolutionModal">&times;</span>
            <h3>Resolve Discrepancy</h3>
            <form id="resolutionForm" method="post" action="<?= base_url('inventory-auditor/resolve-discrepancy') ?>">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label for="resolution-type">Resolution Type</label>
                    <select id="resolution-type" name="resolution_type" required>
                        <option value="">Select Resolution...</option>
                        <option value="adjustment">Inventory Adjustment</option>
                        <option value="found">Items Found</option>
                        <option value="error">Counting Error</option>
                        <option value="theft">Suspected Theft</option>
                        <option value="damage">Damage/Obsolescence</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="resolution-notes">Resolution Notes</label>
                    <textarea id="resolution-notes" name="resolution_notes" rows="3" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="adjusted-count">Adjusted Count</label>
                    <input type="number" id="adjusted-count" name="adjusted_count" required>
                </div>
                
                <div class="form-group">
                    <label for="responsible-person">Responsible Person</label>
                    <input type="text" id="responsible-person" name="responsible_person" required>
                </div>
                
                <button type="submit" class="primary-btn">Submit Resolution</button>
            </form>
        </div>
    </div>

    <script src="<?= base_url('assets/js/ia-discrepancies.js') ?>"></script>
</body>
</html>