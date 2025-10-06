<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Suppliers | Procurement Officer</title>
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
            <li><a href="<?= base_url('procurement-officer/purchase-orders') ?>">Purchase Orders</a></li>
            <li><a href="<?= base_url('procurement-officer/suppliers') ?>" class="active">Suppliers</a></li>
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
        <div class="suppliers-header">
            <h1>Suppliers</h1>
            <div class="suppliers-actions">
                <div class="search-filter">
                    <input type="text" id="search-input" placeholder="Search suppliers...">
                    <select id="category-filter">
                        <option value="all">All Categories</option>
                        <option value="building">Building Materials</option>
                        <option value="electrical">Electrical</option>
                        <option value="plumbing">Plumbing</option>
                        <option value="tools">Tools & Equipment</option>
                    </select>
                    <button id="search-btn" class="action-btn">Search</button>
                </div>
                <button id="add-supplier-btn" class="primary-btn">+ Add Supplier</button>
            </div>
        </div>

        <div class="suppliers-stats">
            <div class="stat-card">
                <div class="card-title">Total Suppliers</div>
                <div class="card-value" id="total-suppliers">28</div>
                <div class="card-status">Active vendors</div>
            </div>
            <div class="stat-card success">
                <div class="card-title">Top-Rated</div>
                <div class="card-value" id="top-rated">12</div>
                <div class="card-status">4.5+ rating</div>
            </div>
            <div class="stat-card warning">
                <div class="card-title">Under Review</div>
                <div class="card-value" id="review-count">3</div>
                <div class="card-status">Performance issues</div>
            </div>
            <div class="stat-card info">
                <div class="card-title">Recent Orders</div>
                <div class="card-value" id="recent-orders">15</div>
                <div class="card-status">Last 30 days</div>
            </div>
        </div>
        
        <div class="suppliers-view-toggle">
            <button class="view-toggle-btn active" data-view="grid"><i class="fas fa-th"></i> Grid View</button>
            <button class="view-toggle-btn" data-view="list"><i class="fas fa-list"></i> List View</button>
        </div>
        
        <div id="suppliers-grid-view" class="suppliers-grid">
            <!-- JS will populate this -->
        </div>
        
        <div id="suppliers-list-view" class="table-container" style="display:none;">
            <table class="data-table" id="suppliers-table">
                <thead>
                    <tr>
                        <th>Supplier ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Contact</th>
                        <th>Rating</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="suppliers-table-body">
                    <!-- JS will populate this -->
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- Add/Edit Supplier Modal -->
    <div class="modal" id="supplierModal">
        <div class="modal-content">
            <span class="close" id="closeSupplierModal">&times;</span>
            <h3 id="supplier-modal-title">Add New Supplier</h3>
            <form id="supplierForm" method="post" action="<?= base_url('procurement-officer/save-supplier') ?>">
                <?= csrf_field() ?>
                <input type="hidden" id="supplier-id" name="supplier_id">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="supplier-name">Supplier Name</label>
                        <input type="text" id="supplier-name" name="supplier_name" required>
                    </div>
                    <div class="form-group">
                        <label for="supplier-category">Category</label>
                        <select id="supplier-category" name="category" required>
                            <option value="">Select Category</option>
                            <option value="Building Materials">Building Materials</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Tools & Equipment">Tools & Equipment</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="contact-name">Contact Person</label>
                        <input type="text" id="contact-name" name="contact_name" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-phone">Phone Number</label>
                        <input type="tel" id="contact-phone" name="contact_phone" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="contact-email">Email</label>
                    <input type="email" id="contact-email" name="contact_email" required>
                </div>
                
                <div class="form-group">
                    <label for="supplier-address">Address</label>
                    <textarea id="supplier-address" name="address" rows="2" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="supplier-notes">Notes</label>
                    <textarea id="supplier-notes" name="notes" rows="2"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="primary-btn" id="supplier-submit-btn">Add Supplier</button>
                    <button type="button" id="cancel-supplier-btn" class="secondary-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- View Supplier Modal -->
    <div class="modal" id="viewSupplierModal">
        <div class="modal-content modal-lg">
            <span class="close" id="closeViewSupplierModal">&times;</span>
            <h3>Supplier Details</h3>
            <div id="supplier-details">
                <!-- JS will populate this -->
            </div>
            <div class="modal-actions">
                <button id="edit-supplier-btn" class="primary-btn">Edit Supplier</button>
                <button id="order-from-supplier-btn" class="secondary-btn">Create Order</button>
            </div>
        </div>
    </div>

    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <script src="<?= base_url('assets/js/po-suppliers.js') ?>"></script>
</body>
</html>