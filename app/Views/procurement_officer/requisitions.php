<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Requisitions | Procurement Officer</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/procurement-officer.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/po-requisitions.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Procurement Officer</span>
        </div>
        <ul>
            <li><a href="<?= base_url('procurement-officer/dashboard') ?>">Dashboard</a></li>
            <li><a href="<?= base_url('procurement-officer/purchase-orders') ?>">Purchase Orders</a></li>
            <li><a href="<?= base_url('procurement-officer/suppliers') ?>">Suppliers</a></li>
            <li><a href="<?= base_url('procurement-officer/materials') ?>">Materials</a></li>
            <li><a href="<?= base_url('procurement-officer/requisitions') ?>" class="active">Requisitions</a></li>
            <li><a href="<?= base_url('procurement-officer/delivery-tracking') ?>">Delivery Tracking</a></li>
            <li><a href="<?= base_url('procurement-officer/invoices') ?>">Invoices & Payments</a></li>
            <li><a href="<?= base_url('procurement-officer/reports') ?>">Reports</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="requisitions-header">
            <h1>Requisitions</h1>
            <div class="requisitions-actions">
                <div class="search-filter">
                    <input type="text" id="search-input" placeholder="Search requisitions...">
                    <select id="status-filter">
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select id="department-filter">
                        <option value="all">All Departments</option>
                        <option value="construction">Construction</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="facilities">Facilities</option>
                        <option value="office">Office</option>
                    </select>
                    <button id="search-btn" class="action-btn">Search</button>
                </div>
            </div>
        </div>

        <div class="requisitions-stats">
            <div class="stat-card">
                <div class="card-title">Total</div>
                <div class="card-value" id="total-requisitions">42</div>
                <div class="card-status">All requisitions</div>
            </div>
            <div class="stat-card warning">
                <div class="card-title">New</div>
                <div class="card-value" id="new-requisitions">8</div>
                <div class="card-status">Need review</div>
            </div>
            <div class="stat-card info">
                <div class="card-title">In Progress</div>
                <div class="card-value" id="in-progress-requisitions">12</div>
                <div class="card-status">Being processed</div>
            </div>
            <div class="stat-card success">
                <div class="card-title">Completed</div>
                <div class="card-value" id="completed-requisitions">22</div>
                <div class="card-status">Successfully fulfilled</div>
            </div>
        </div>
        
        <div class="requisitions-list-container">
            <table class="data-table" id="requisitions-table">
                <thead>
                    <tr>
                        <th>REQ #</th>
                        <th>Department</th>
                        <th>Requestor</th>
                        <th>Date Created</th>
                        <th>Required By</th>
                        <th>Items</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="requisitions-table-body">
                    <!-- JS will populate this -->
                </tbody>
            </table>
            <div class="pagination">
                <button id="prev-page" class="secondary-btn" disabled>&lt; Previous</button>
                <span class="page-info">Page <span id="current-page">1</span> of <span id="total-pages">5</span></span>
                <button id="next-page" class="secondary-btn">Next &gt;</button>
            </div>
        </div>
    </div>
    
    <!-- View Requisition Modal -->
    <div class="modal" id="viewRequisitionModal">
        <div class="modal-content modal-lg">
            <span class="close" id="closeViewRequisitionModal">&times;</span>
            <h3>Requisition Details</h3>
            <div id="requisition-details">
                <!-- JS will populate this -->
            </div>
            <div class="modal-actions" id="requisition-actions">
                <!-- JS will populate actions based on requisition status -->
            </div>
        </div>
    </div>
    
    <!-- Process Requisition Modal -->
    <div class="modal" id="processRequisitionModal">
        <div class="modal-content modal-lg">
            <span class="close" id="closeProcessModal">&times;</span>
            <h3>Process Requisition</h3>
            <form id="processRequisitionForm" method="post" action="<?= base_url('procurement-officer/process-requisition') ?>">
                <?= csrf_field() ?>
                <input type="hidden" id="req-id" name="requisition_id">
                
                <div class="form-section">
                    <h4>Requisition Information</h4>
                    <div class="requisition-info-container" id="process-req-info">
                        <!-- JS will populate basic info -->
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>Requested Items</h4>
                    <div class="items-container" id="requested-items">
                        <!-- JS will populate requested items -->
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>Fulfillment Options</h4>
                    <div class="form-group">
                        <label>Select action for this requisition:</label>
                        <div class="radio-group">
                            <div class="radio-option">
                                <input type="radio" id="create-po" name="fulfillment_option" value="create-po" checked>
                                <label for="create-po">Create Purchase Order</label>
                            </div>
                            <div class="radio-option">
                                <input type="radio" id="use-inventory" name="fulfillment_option" value="use-inventory">
                                <label for="use-inventory">Fulfill from Inventory</label>
                            </div>
                            <div class="radio-option">
                                <input type="radio" id="partial" name="fulfillment_option" value="partial">
                                <label for="partial">Partial Fulfillment</label>
                            </div>
                        </div>
                    </div>
                    
                    <div id="po-section">
                        <div class="form-group">
                            <label for="supplier-select">Select Supplier</label>
                            <select id="supplier-select" name="supplier" required>
                                <option value="">Choose supplier</option>
                                <!-- JS will populate suppliers -->
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="expected-delivery">Expected Delivery Date</label>
                            <input type="date" id="expected-delivery" name="expected_delivery" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="processing-notes">Notes</label>
                    <textarea id="processing-notes" name="notes" rows="3" placeholder="Add any notes about the processing of this requisition..."></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="primary-btn" id="process-submit-btn">Process Requisition</button>
                    <button type="button" id="reject-req-btn" class="danger-btn">Reject</button>
                    <button type="button" id="cancel-process-btn" class="secondary-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Reject Requisition Modal -->
    <div class="modal" id="rejectRequisitionModal">
        <div class="modal-content">
            <span class="close" id="closeRejectModal">&times;</span>
            <h3>Reject Requisition</h3>
            <form id="rejectRequisitionForm" method="post" action="<?= base_url('procurement-officer/reject-requisition') ?>">
                <?= csrf_field() ?>
                <input type="hidden" id="reject-req-id" name="requisition_id">
                
                <div class="form-group">
                    <label for="rejection-reason">Reason for Rejection</label>
                    <select id="rejection-reason" name="rejection_reason" required>
                        <option value="">Select reason</option>
                        <option value="budget">Budget constraints</option>
                        <option value="availability">Items not available</option>
                        <option value="specifications">Insufficient specifications</option>
                        <option value="policy">Against procurement policy</option>
                        <option value="other">Other reason</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="rejection-notes">Additional Comments</label>
                    <textarea id="rejection-notes" name="rejection_notes" rows="4" required placeholder="Please provide details about the rejection..."></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="danger-btn">Confirm Rejection</button>
                    <button type="button" id="cancel-reject-btn" class="secondary-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <script src="<?= base_url('assets/js/po-requisitions.js') ?>"></script>
</body>
</html>