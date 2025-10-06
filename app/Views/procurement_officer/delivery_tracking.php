<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Delivery Tracking | Procurement Officer</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/procurement-officer.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/po-delivery-tracking.css') ?>">
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
            <li><a href="<?= base_url('procurement-officer/delivery-tracking') ?>" class="active">Delivery Tracking</a></li>
            <li><a href="<?= base_url('procurement-officer/invoices') ?>">Invoices & Payments</a></li>
            <li><a href="<?= base_url('procurement-officer/reports') ?>">Reports</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="delivery-header">
            <h1>Delivery Tracking</h1>
            <div class="delivery-actions">
                <div class="search-filter">
                    <input type="text" id="search-input" placeholder="Search by PO, tracking number...">
                    <select id="status-filter">
                        <option value="all">All Statuses</option>
                        <option value="ordered">Ordered</option>
                        <option value="shipped">Shipped</option>
                        <option value="in-transit">In Transit</option>
                        <option value="out-for-delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="delayed">Delayed</option>
                    </select>
                    <button id="search-btn" class="action-btn">Search</button>
                </div>
            </div>
        </div>

        <div class="delivery-stats">
            <div class="stat-card">
                <div class="card-title">Total Shipments</div>
                <div class="card-value" id="total-deliveries">34</div>
                <div class="card-status">All orders</div>
            </div>
            <div class="stat-card info">
                <div class="card-title">In Transit</div>
                <div class="card-value" id="in-transit">12</div>
                <div class="card-status">On the way</div>
            </div>
            <div class="stat-card warning">
                <div class="card-title">Delayed</div>
                <div class="card-value" id="delayed">3</div>
                <div class="card-status">Behind schedule</div>
            </div>
            <div class="stat-card success">
                <div class="card-title">Delivered</div>
                <div class="card-value" id="delivered">19</div>
                <div class="card-status">Successfully received</div>
            </div>
        </div>
        
        <div class="delivery-map-container">
            <h2>Shipment Tracking Map</h2>
            <div id="delivery-map">
                <div class="map-placeholder">
                    <p>Interactive shipment tracking map will display here.</p>
                    <p>Click on a shipment below to view its journey details.</p>
                </div>
            </div>
        </div>
        
        <div class="table-container">
            <h2>Incoming Deliveries</h2>
            <table class="data-table" id="deliveries-table">
                <thead>
                    <tr>
                        <th>PO #</th>
                        <th>Supplier</th>
                        <th>Tracking #</th>
                        <th>Est. Delivery</th>
                        <th>Items</th>
                        <th>Carrier</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="deliveries-table-body">
                    <!-- JS will populate this -->
                </tbody>
            </table>
            <div class="pagination">
                <button id="prev-page" class="secondary-btn" disabled>&lt; Previous</button>
                <span class="page-info">Page <span id="current-page">1</span> of <span id="total-pages">4</span></span>
                <button id="next-page" class="secondary-btn">Next &gt;</button>
            </div>
        </div>
    </div>
    
    <!-- View Delivery Details Modal -->
    <div class="modal" id="deliveryDetailsModal">
        <div class="modal-content modal-lg">
            <span class="close" id="closeDeliveryDetailsModal">&times;</span>
            <h3>Delivery Details</h3>
            <div id="delivery-details">
                <!-- JS will populate this -->
            </div>
            <div class="modal-actions">
                <button id="notify-warehouse-btn" class="primary-btn">Notify Warehouse</button>
                <button id="report-issue-btn" class="secondary-btn">Report Issue</button>
            </div>
        </div>
    </div>
    
    <!-- Update Tracking Modal -->
    <div class="modal" id="updateTrackingModal">
        <div class="modal-content">
            <span class="close" id="closeUpdateTrackingModal">&times;</span>
            <h3>Update Tracking Information</h3>
            <form id="updateTrackingForm" method="post" action="<?= base_url('procurement-officer/update-tracking') ?>">
                <?= csrf_field() ?>
                <input type="hidden" id="update-delivery-id" name="delivery_id">
                
                <div class="form-group">
                    <label for="tracking-number">Tracking Number</label>
                    <input type="text" id="tracking-number" name="tracking_number">
                </div>
                
                <div class="form-group">
                    <label for="carrier">Carrier</label>
                    <select id="carrier" name="carrier">
                        <option value="fedex">FedEx</option>
                        <option value="ups">UPS</option>
                        <option value="usps">USPS</option>
                        <option value="dhl">DHL</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="est-delivery-date">Estimated Delivery Date</label>
                    <input type="date" id="est-delivery-date" name="estimated_delivery">
                </div>
                
                <div class="form-group">
                    <label for="tracking-status">Current Status</label>
                    <select id="tracking-status" name="status">
                        <option value="ordered">Ordered</option>
                        <option value="shipped">Shipped</option>
                        <option value="in-transit">In Transit</option>
                        <option value="out-for-delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="delayed">Delayed</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="tracking-notes">Notes</label>
                    <textarea id="tracking-notes" name="notes" rows="3"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="primary-btn">Save Updates</button>
                    <button type="button" id="cancel-update-btn" class="secondary-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Report Issue Modal -->
    <div class="modal" id="reportIssueModal">
        <div class="modal-content">
            <span class="close" id="closeReportIssueModal">&times;</span>
            <h3>Report Delivery Issue</h3>
            <form id="reportIssueForm" method="post" action="<?= base_url('procurement-officer/report-delivery-issue') ?>">
                <?= csrf_field() ?>
                <input type="hidden" id="issue-delivery-id" name="delivery_id">
                
                <div class="form-group">
                    <label for="issue-type">Issue Type</label>
                    <select id="issue-type" name="issue_type" required>
                        <option value="">Select Issue Type</option>
                        <option value="delayed">Delayed Shipment</option>
                        <option value="damaged">Damaged Items</option>
                        <option value="missing">Missing Items</option>
                        <option value="incorrect">Incorrect Items</option>
                        <option value="quantity">Quantity Discrepancy</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="issue-severity">Severity</label>
                    <select id="issue-severity" name="severity" required>
                        <option value="low">Low - No Immediate Impact</option>
                        <option value="medium">Medium - Some Delays Expected</option>
                        <option value="high">High - Critical Impact</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="issue-description">Description</label>
                    <textarea id="issue-description" name="description" rows="4" required placeholder="Describe the issue in detail..."></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="primary-btn">Submit Issue</button>
                    <button type="button" id="cancel-issue-btn" class="secondary-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <script src="<?= base_url('assets/js/po-delivery-tracking.js') ?>"></script>
</body>
</html>