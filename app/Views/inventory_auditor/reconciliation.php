<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reconciliation | Inventory Auditor</title>
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
            <li><a href="<?= base_url('inventory-auditor/inventory-view') ?>">Inventory View</a></li>
            <li><a href="<?= base_url('inventory-auditor/audit-reports') ?>">Audit Reports</a></li>
            <li><a href="<?= base_url('inventory-auditor/reconciliation') ?>" class="active">Reconciliation</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="reconciliation-header">
            <h1>Inventory Reconciliation</h1>
            <div class="reconciliation-actions">
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
                        <option value="approved">Approved</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button id="filter-btn">Filter</button>
                </div>
                <button id="new-reconciliation-btn" class="primary-btn">New Reconciliation</button>
            </div>
        </div>

        <div class="dashboard-section">
            <div class="reconciliation-stats">
                <div class="stat-card">
                    <div class="stat-value" id="total-reconciliations">18</div>
                    <div class="stat-label">Total Reconciliations</div>
                </div>
                <div class="stat-card warning">
                    <div class="stat-value" id="pending-reconciliations">5</div>
                    <div class="stat-label">Pending</div>
                </div>
                <div class="stat-card info">
                    <div class="stat-value" id="approved-reconciliations">3</div>
                    <div class="stat-label">Approved</div>
                </div>
                <div class="stat-card success">
                    <div class="stat-value" id="completed-reconciliations">10</div>
                    <div class="stat-label">Completed</div>
                </div>
            </div>
            
            <div class="reconciliation-table-wrapper">
                <table class="reconciliation-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Warehouse</th>
                            <th>Date Created</th>
                            <th>Items</th>
                            <th>Value Adjustment</th>
                            <th>Created By</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="reconciliation-table-body">
                        <!-- JS will populate -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <!-- Reconciliation Details Modal -->
    <div class="modal" id="reconciliationModal">
        <div class="modal-content modal-lg">
            <span class="close" id="closeReconciliationModal">&times;</span>
            <h3>Reconciliation Details</h3>
            <div id="reconciliation-details"></div>
            <div class="modal-actions">
                <button id="approve-btn" class="primary-btn">Approve</button>
                <button id="reject-btn" class="danger-btn">Reject</button>
                <button id="print-btn" class="secondary-btn">Print</button>
            </div>
        </div>
    </div>
    
    <!-- New Reconciliation Modal -->
    <div class="modal" id="newReconciliationModal">
        <div class="modal-content">
            <span class="close" id="closeNewReconciliationModal">&times;</span>
            <h3>New Reconciliation</h3>
            <form id="newReconciliationForm" method="post" action="<?= base_url('inventory-auditor/create-reconciliation') ?>">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label for="rec-warehouse">Warehouse</label>
                    <select id="rec-warehouse" name="warehouse" required>
                        <option value="">Select Warehouse...</option>
                        <option value="Warehouse A">Warehouse A</option>
                        <option value="Warehouse B">Warehouse B</option>
                        <option value="Warehouse C">Warehouse C</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="rec-type">Reconciliation Type</label>
                    <select id="rec-type" name="type" required>
                        <option value="">Select Type...</option>
                        <option value="Inventory Count">Inventory Count</option>
                        <option value="System Adjustment">System Adjustment</option>
                        <option value="Discrepancy Resolution">Discrepancy Resolution</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="rec-notes">Notes</label>
                    <textarea id="rec-notes" name="notes" rows="3"></textarea>
                </div>
                
                <div class="form-group" id="discrepancy-selection">
                    <label for="rec-discrepancies">Select Discrepancies to Reconcile</label>
                    <div class="checkbox-list" id="discrepancy-checkbox-list">
                        <!-- JS will populate -->
                    </div>
                </div>
                
                <button type="submit" class="primary-btn">Create Reconciliation</button>
            </form>
        </div>
    </div>
    
    <!-- Reject Reconciliation Modal -->
    <div class="modal" id="rejectModal">
        <div class="modal-content">
            <span class="close" id="closeRejectModal">&times;</span>
            <h3>Reject Reconciliation</h3>
            <form id="rejectForm" method="post" action="<?= base_url('inventory-auditor/reject-reconciliation') ?>">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label for="rejection-reason">Reason for Rejection</label>
                    <textarea id="rejection-reason" name="rejection_reason" rows="3" required></textarea>
                </div>
                
                <button type="submit" class="danger-btn">Confirm Rejection</button>
            </form>
        </div>
    </div>

    <script src="<?= base_url('assets/js/ia-reconciliation.js') ?>"></script>
</body>
</html>