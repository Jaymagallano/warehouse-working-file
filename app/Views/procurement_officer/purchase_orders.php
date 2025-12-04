<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Purchase Orders | Procurement Officer</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/procurement-officer.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Procurement Officer</span>
        </div>
        <ul>
            <li><a href="<?= base_url('procurement-officer/dashboard') ?>">Dashboard</a></li>
            <li><a href="<?= base_url('procurement-officer/purchase-orders') ?>" class="active">Purchase Orders</a></li>
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
        <div class="po-header">
            <h1>Purchase Orders</h1>
            <div class="po-actions">
                <div class="search-filter">
                    <input type="text" id="search-input" placeholder="Search POs...">
                    <select id="status-filter">
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <select id="supplier-filter">
                        <option value="all">All Suppliers</option>
                        <!-- JS will populate this -->
                    </select>
                    <button id="search-btn" class="action-btn">Search</button>
                </div>
                <button id="create-po-btn" class="primary-btn">+ Create PO</button>
            </div>
        </div>

        <div class="po-stats">
            <div class="stat-card">
                <div class="card-title">Total POs</div>
                <div class="card-value" id="total-pos">42</div>
                <div class="card-status">All purchase orders</div>
            </div>
            <div class="stat-card warning">
                <div class="card-title">Pending</div>
                <div class="card-value" id="pending-pos">5</div>
                <div class="card-status">Awaiting approval</div>
            </div>
            <div class="stat-card info">
                <div class="card-title">In Transit</div>
                <div class="card-value" id="in-transit-pos">8</div>
                <div class="card-status">Expected soon</div>
            </div>
            <div class="stat-card success">
                <div class="card-title">Delivered</div>
                <div class="card-value" id="delivered-pos">29</div>
                <div class="card-status">Successfully received</div>
            </div>
        </div>
        
        <div class="table-container">
            <table class="data-table" id="po-table">
                <thead>
                    <tr>
                        <th>PO #</th>
                        <th>Supplier</th>
                        <th>Date Created</th>
                        <th>Delivery Date</th>
                        <th>Total Value</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="po-table-body">
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
    
    <!-- Create PO Modal -->
    <div class="modal" id="createPoModal">
        <div class="modal-content modal-lg">
            <span class="close" id="closeCreatePoModal">&times;</span>
            <h3>Create Purchase Order</h3>
            <form id="createPoForm" method="post" action="<?= base_url('procurement-officer/create-purchase-order') ?>">
                <?= csrf_field() ?>
                <div class="form-row">
                    <div class="form-group">
                        <label for="po-supplier">Supplier</label>
                        <select id="po-supplier" name="supplier" required>
                            <option value="">Select Supplier</option>
                            <!-- JS will populate this -->
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="po-delivery-date">Required Delivery Date</label>
                        <input type="date" id="po-delivery-date" name="delivery_date" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="po-notes">Notes</label>
                    <textarea id="po-notes" name="notes" rows="2"></textarea>
                </div>
                
                <h4>Order Items</h4>
                <div class="line-items-container">
                    <table class="line-items-table">
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="line-items-body">
                            <tr class="line-item">
                                <td>
                                    <select class="item-select" name="items[0][material]" required>
                                        <option value="">Select Material</option>
                                        <!-- JS will populate this -->
                                    </select>
                                </td>
                                <td><input type="number" class="item-quantity" name="items[0][quantity]" min="1" value="1" required></td>
                                <td><input type="number" class="item-price" name="items[0][price]" min="0" step="0.01" value="0.00" required></td>
                                <td class="line-total">$0.00</td>
                                <td><button type="button" class="remove-line-btn">×</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" id="add-line-btn" class="secondary-btn">+ Add Item</button>
                </div>
                
                <div class="po-summary">
                    <div class="po-total-container">
                        <span>Total:</span>
                        <span id="po-total">$0.00</span>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="primary-btn">Create Purchase Order</button>
                    <button type="button" id="cancel-po-btn" class="secondary-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- View PO Modal -->
    <div class="modal" id="viewPoModal">
        <div class="modal-content modal-lg">
            <span class="close" id="closeViewPoModal">&times;</span>
            <h3>Purchase Order Details</h3>
            <div id="po-details">
                <!-- JS will populate this -->
            </div>
            <div class="modal-actions">
                <button id="print-po-btn" class="secondary-btn">Print PO</button>
                <button id="email-po-btn" class="secondary-btn">Email to Supplier</button>
                <button id="edit-po-btn" class="primary-btn">Edit</button>
            </div>
        </div>
    </div>

    <script src="<?= base_url('assets/js/po-purchase-orders.js') ?>"></script>
</body>
</html>