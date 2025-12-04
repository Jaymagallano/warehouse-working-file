<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Materials | Procurement Officer</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/procurement-officer.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/po-materials.css') ?>">
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
            <li><a href="<?= base_url('procurement-officer/materials') ?>" class="active">Materials</a></li>
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
        <div class="materials-header">
            <h1>Materials</h1>
            <div class="materials-actions">
                <div class="search-filter">
                    <input type="text" id="search-input" placeholder="Search materials...">
                    <select id="category-filter">
                        <option value="all">All Categories</option>
                        <option value="building">Building Materials</option>
                        <option value="electrical">Electrical</option>
                        <option value="plumbing">Plumbing</option>
                        <option value="tools">Tools & Equipment</option>
                        <option value="finishing">Finishing Materials</option>
                    </select>
                    <select id="status-filter">
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="low">Low Stock</option>
                        <option value="out">Out of Stock</option>
                    </select>
                    <button id="search-btn" class="action-btn">Search</button>
                </div>
                <button id="add-material-btn" class="primary-btn">+ Add Material</button>
            </div>
        </div>

        <div class="materials-stats">
            <div class="stat-card">
                <div class="card-title">Total Materials</div>
                <div class="card-value" id="total-materials">86</div>
                <div class="card-status">Active catalog</div>
            </div>
            <div class="stat-card warning">
                <div class="card-title">Low Stock</div>
                <div class="card-value" id="low-stock">12</div>
                <div class="card-status">Need reordering</div>
            </div>
            <div class="stat-card danger">
                <div class="card-title">Out of Stock</div>
                <div class="card-value" id="out-of-stock">4</div>
                <div class="card-status">Urgent attention</div>
            </div>
            <div class="stat-card success">
                <div class="card-title">On Order</div>
                <div class="card-value" id="on-order">18</div>
                <div class="card-status">In procurement</div>
            </div>
        </div>
        
        <div class="materials-view-toggle">
            <button class="view-toggle-btn active" data-view="card"><i class="fas fa-th"></i> Card View</button>
            <button class="view-toggle-btn" data-view="table"><i class="fas fa-list"></i> Table View</button>
        </div>
        
        <div id="materials-card-view" class="materials-card-view">
            <!-- JS will populate this -->
        </div>
        
        <div id="materials-table-view" class="table-container" style="display:none;">
            <table class="data-table" id="materials-table">
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Unit</th>
                        <th>Price</th>
                        <th>Current Stock</th>
                        <th>Min. Level</th>
                        <th>Status</th>
                        <th>Lead Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="materials-table-body">
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
    
    <!-- Add/Edit Material Modal -->
    <div class="modal" id="materialModal">
        <div class="modal-content">
            <span class="close" id="closeMaterialModal">&times;</span>
            <h3 id="material-modal-title">Add New Material</h3>
            <form id="materialForm" method="post" action="<?= base_url('procurement-officer/save-material') ?>">
                <?= csrf_field() ?>
                <input type="hidden" id="material-id" name="material_id">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="material-sku">SKU</label>
                        <input type="text" id="material-sku" name="sku" required>
                    </div>
                    <div class="form-group">
                        <label for="material-category">Category</label>
                        <select id="material-category" name="category" required>
                            <option value="">Select Category</option>
                            <option value="Building Materials">Building Materials</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Tools & Equipment">Tools & Equipment</option>
                            <option value="Finishing Materials">Finishing Materials</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="material-name">Material Name</label>
                    <input type="text" id="material-name" name="name" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="material-unit">Unit of Measure</label>
                        <select id="material-unit" name="unit" required>
                            <option value="">Select Unit</option>
                            <option value="Each">Each</option>
                            <option value="Box">Box</option>
                            <option value="Bundle">Bundle</option>
                            <option value="Sheet">Sheet</option>
                            <option value="Roll">Roll</option>
                            <option value="Meter">Meter</option>
                            <option value="Liter">Liter</option>
                            <option value="Bag">Bag</option>
                            <option value="Ton">Ton</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="material-price">Unit Price ($)</label>
                        <input type="number" id="material-price" name="price" step="0.01" min="0" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="material-min-level">Min Stock Level</label>
                        <input type="number" id="material-min-level" name="min_level" min="0" required>
                    </div>
                    <div class="form-group">
                        <label for="material-lead-time">Lead Time (days)</label>
                        <input type="number" id="material-lead-time" name="lead_time" min="1" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="material-desc">Description</label>
                    <textarea id="material-desc" name="description" rows="2"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="material-supplier">Preferred Supplier</label>
                    <select id="material-supplier" name="supplier">
                        <option value="">Select Supplier</option>
                        <!-- JS will populate this -->
                    </select>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="primary-btn" id="material-submit-btn">Add Material</button>
                    <button type="button" id="cancel-material-btn" class="secondary-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- View Material Modal -->
    <div class="modal" id="viewMaterialModal">
        <div class="modal-content modal-lg">
            <span class="close" id="closeViewMaterialModal">&times;</span>
            <h3>Material Details</h3>
            <div id="material-details">
                <!-- JS will populate this -->
            </div>
            <div class="modal-actions">
                <button id="edit-material-btn" class="primary-btn">Edit</button>
                <button id="order-material-btn" class="secondary-btn">Create PO</button>
                <button id="price-history-btn" class="secondary-btn">Price History</button>
            </div>
        </div>
    </div>

    <!-- Price History Modal -->
    <div class="modal" id="priceHistoryModal">
        <div class="modal-content">
            <span class="close" id="closePriceHistoryModal">&times;</span>
            <h3>Price History</h3>
            <div id="price-history-content">
                <div class="price-history-chart">
                    <canvas id="priceHistoryChart" height="250"></canvas>
                </div>
                <div class="price-history-table">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Supplier</th>
                                <th>PO Reference</th>
                            </tr>
                        </thead>
                        <tbody id="price-history-body">
                            <!-- JS will populate this -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
    <script src="<?= base_url('assets/js/po-materials.js') ?>"></script>
</body>
</html>