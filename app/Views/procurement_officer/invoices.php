<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoices & Payments | Procurement Officer</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/procurement-officer.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/po-invoices.css') ?>">
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
            <li><a href="<?= base_url('procurement-officer/requisitions') ?>">Requisitions</a></li>
            <li><a href="<?= base_url('procurement-officer/delivery-tracking') ?>">Delivery Tracking</a></li>
            <li><a href="<?= base_url('procurement-officer/invoices') ?>" class="active">Invoices & Payments</a></li>
            <li><a href="<?= base_url('procurement-officer/reports') ?>">Reports</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="invoices-header">
            <h1>Invoices & Payments</h1>
            <div class="invoices-actions">
                <div class="search-filter">
                    <input type="text" id="search-input" placeholder="Search invoices...">
                    <select id="status-filter">
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending Review</option>
                        <option value="matched">Matched</option>
                        <option value="approved">Approved</option>
                        <option value="paid">Paid</option>
                        <option value="disputed">Disputed</option>
                    </select>
                    <button id="search-btn" class="action-btn">Search</button>
                </div>
                <button id="register-invoice-btn" class="primary-btn">+ Register Invoice</button>
            </div>
        </div>

        <div class="invoices-stats">
            <div class="stat-card">
                <div class="card-title">Total Invoices</div>
                <div class="card-value" id="total-invoices">48</div>
                <div class="card-status">Current month</div>
            </div>
            <div class="stat-card warning">
                <div class="card-title">Pending Review</div>
                <div class="card-value" id="pending-invoices">12</div>
                <div class="card-status">Need attention</div>
            </div>
            <div class="stat-card danger">
                <div class="card-title">Overdue</div>
                <div class="card-value" id="overdue-invoices">3</div>
                <div class="card-status">Past due date</div>
            </div>
            <div class="stat-card success">
                <div class="card-title">Paid</div>
                <div class="card-value" id="paid-invoices">28</div>
                <div class="card-status">This month</div>
            </div>
        </div>

        <div class="invoices-tabs">
            <button class="tab-btn active" data-tab="all-invoices">All Invoices</button>
            <button class="tab-btn" data-tab="pending-review">Pending Review</button>
            <button class="tab-btn" data-tab="approved">Approved</button>
            <button class="tab-btn" data-tab="disputed">Disputed</button>
        </div>
        
        <div class="tab-content active" id="all-invoices">
            <div class="table-container">
                <table class="data-table" id="invoices-table">
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>PO Reference</th>
                            <th>Supplier</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="invoices-table-body">
                        <!-- JS will populate this -->
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <button id="prev-page" class="secondary-btn" disabled>&lt; Previous</button>
                <span class="page-info">Page <span id="current-page">1</span> of <span id="total-pages">5</span></span>
                <button id="next-page" class="secondary-btn">Next &gt;</button>
            </div>
        </div>
    </div>
    
    <!-- Register Invoice Modal -->
    <div class="modal" id="registerInvoiceModal">
        <div class="modal-content">
            <span class="close" id="closeRegisterModal">&times;</span>
            <h3>Register New Invoice</h3>
            <form id="registerInvoiceForm" method="post" action="<?= base_url('procurement-officer/register-invoice') ?>" enctype="multipart/form-data">
                <?= csrf_field() ?>
                <div class="form-row">
                    <div class="form-group">
                        <label for="invoice-number">Invoice Number</label>
                        <input type="text" id="invoice-number" name="invoice_number" required>
                    </div>
                    <div class="form-group">
                        <label for="po-reference">PO Reference</label>
                        <select id="po-reference" name="po_reference" required>
                            <option value="">Select Purchase Order</option>
                            <!-- JS will populate this -->
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="supplier">Supplier</label>
                        <select id="supplier" name="supplier" required>
                            <option value="">Select Supplier</option>
                            <!-- JS will populate this -->
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="invoice-amount">Invoice Amount ($)</label>
                        <input type="number" id="invoice-amount" name="amount" step="0.01" min="0" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="invoice-date">Invoice Date</label>
                        <input type="date" id="invoice-date" name="invoice_date" required>
                    </div>
                    <div class="form-group">
                        <label for="due-date">Due Date</label>
                        <input type="date" id="due-date" name="due_date" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="invoice-notes">Notes</label>
                    <textarea id="invoice-notes" name="notes" rows="2"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="invoice-file">Upload Invoice Document</label>
                    <input type="file" id="invoice-file" name="invoice_file" accept=".pdf,.jpg,.png">
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="primary-btn">Register Invoice</button>
                    <button type="button" id="cancel-register-btn" class="secondary-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- View Invoice Modal -->
    <div class="modal" id="viewInvoiceModal">
        <div class="modal-content modal-lg">
            <span class="close" id="closeViewModal">&times;</span>
            <h3>Invoice Details</h3>
            <div id="invoice-details">
                <!-- JS will populate this -->
            </div>
            <div class="modal-actions" id="invoice-actions">
                <!-- JS will populate actions based on invoice status -->
            </div>
        </div>
    </div>
    
    <!-- Process Invoice Modal -->
    <div class="modal" id="processInvoiceModal">
        <div class="modal-content">
            <span class="close" id="closeProcessModal">&times;</span>
            <h3>Review & Process Invoice</h3>
            <form id="processInvoiceForm" method="post" action="<?= base_url('procurement-officer/process-invoice') ?>">
                <?= csrf_field() ?>
                <input type="hidden" id="process-invoice-id" name="invoice_id">
                
                <div class="form-section">
                    <h4>Invoice Information</h4>
                    <div class="invoice-info-container" id="process-invoice-info">
                        <!-- JS will populate basic info -->
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>3-Way Match Verification</h4>
                    <div class="match-verification">
                        <div class="match-item">
                            <span class="match-label">Purchase Order Match:</span>
                            <div class="match-status" id="po-match-status">Verifying...</div>
                        </div>
                        <div class="match-item">
                            <span class="match-label">Goods Receipt Match:</span>
                            <div class="match-status" id="gr-match-status">Verifying...</div>
                        </div>
                        <div class="match-item">
                            <span class="match-label">Price/Quantity Match:</span>
                            <div class="match-status" id="price-match-status">Verifying...</div>
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>Processing Decision</h4>
                    <div class="radio-group">
                        <div class="radio-option">
                            <input type="radio" id="approve-invoice" name="invoice_decision" value="approve" required>
                            <label for="approve-invoice">Approve for Payment</label>
                        </div>
                        <div class="radio-option">
                            <input type="radio" id="hold-invoice" name="invoice_decision" value="hold">
                            <label for="hold-invoice">Hold for Further Review</label>
                        </div>
                        <div class="radio-option">
                            <input type="radio" id="dispute-invoice" name="invoice_decision" value="dispute">
                            <label for="dispute-invoice">Dispute Invoice</label>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="processing-notes">Notes for Accounts Payable</label>
                    <textarea id="processing-notes" name="processing_notes" rows="3" placeholder="Add any notes about the invoice processing..."></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="primary-btn" id="process-submit-btn">Submit</button>
                    <button type="button" id="cancel-process-btn" class="secondary-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <script src="<?= base_url('assets/js/po-invoices.js') ?>"></script>
</body>
</html>