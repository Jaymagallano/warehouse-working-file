<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WM Shipping</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/wm-shipping.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Warehouse Manager</span>
        </div>
        <ul>
            <li><a href="<?= base_url('warehouse-manager/dashboard') ?>">Dashboard</a></li>
            <li><a href="<?= base_url('warehouse-manager/inventory-overview') ?>">Inventory Overview</a></li>
            <li><a href="<?= base_url('warehouse-manager/receiving') ?>">Receiving</a></li>
            <li><a href="<?= base_url('warehouse-manager/shipping') ?>" class="active">Shipping</a></li>
            <li><a href="<?= base_url('warehouse-manager/approvals') ?>">Approvals</a></li>
            <li><a href="<?= base_url('warehouse-manager/batch-tracking') ?>">Batch/Lot Tracking</a></li>
            <li><a href="<?= base_url('warehouse-manager/reports') ?>">Reports</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="dashboard-section" id="shipping-section">
            <h2>Shipping</h2>
            <button class="add-item-btn" id="openAddModalBtn">+ Add Shipment</button>
            <div class="shipping-table-wrapper">
                <table class="shipping-table">
                    <thead>
                        <tr>
                            <th>Shipment ID</th>
                            <th>Destination</th>
                            <th>Material</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="shipping-table-body">
                        <!-- JS will populate -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Add Shipment Modal -->
    <div class="modal" id="addModal">
        <div class="modal-content">
            <span class="close" id="closeAddModal">&times;</span>
            <h3>Add Shipment</h3>
            <form id="addShippingForm" method="post" action="<?= base_url('warehouse-manager/add-shipment') ?>">
                <?= csrf_field() ?>
                <label for="shipmentId">Shipment ID</label>
                <input type="text" id="shipmentId" name="shipmentId" required>

                <label for="destination">Destination</label>
                <input type="text" id="destination" name="destination" required>

                <label for="material">Material</label>
                <input type="text" id="material" name="material" required>

                <label for="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" min="1" required>

                <label for="date">Shipment Date</label>
                <input type="date" id="date" name="date" required>

                <label for="status">Status</label>
                <select id="status" name="status" required>
                    <option value="">Select Status...</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <button type="submit">Add Shipment</button>
                <div class="success-message" id="addSuccessMsg"></div>
            </form>
        </div>
    </div>

    <!-- Edit Shipment Modal -->
    <div class="modal" id="editModal">
        <div class="modal-content">
            <span class="close" id="closeEditModal">&times;</span>
            <h3>Edit Shipment</h3>
            <form id="editShippingForm" method="post" action="<?= base_url('warehouse-manager/edit-shipment') ?>">
                <?= csrf_field() ?>
                <label for="editShipmentId">Shipment ID</label>
                <input type="text" id="editShipmentId" name="editShipmentId" required readonly>

                <label for="editDestination">Destination</label>
                <input type="text" id="editDestination" name="editDestination" required>

                <label for="editMaterial">Material</label>
                <input type="text" id="editMaterial" name="editMaterial" required>

                <label for="editQuantity">Quantity</label>
                <input type="number" id="editQuantity" name="editQuantity" min="1" required>

                <label for="editDate">Shipment Date</label>
                <input type="date" id="editDate" name="editDate" required>

                <label for="editStatus">Status</label>
                <select id="editStatus" name="editStatus" required>
                    <option value="">Select Status...</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <button type="submit">Save Changes</button>
                <div class="success-message" id="editSuccessMsg"></div>
            </form>
        </div>
    </div>

    <!-- View Shipment Modal -->
    <div class="modal" id="viewModal">
        <div class="modal-content">
            <span class="close" id="closeViewModal">&times;</span>
            <h3>Shipment Details</h3>
            <div id="viewShippingDetails"></div>
        </div>
    </div>

    <!-- Confirm Delete Modal -->
    <div class="modal" id="deleteModal">
        <div class="modal-content">
            <span class="close" id="closeDeleteModal">&times;</span>
            <h3>Delete Shipment</h3>
            <div id="deleteShippingDetails"></div>
            <div class="delete-modal-actions">
                <button id="confirmDeleteBtn" class="action-btn" style="background:#d8000c;">Delete</button>
                <button id="cancelDeleteBtn" class="action-btn">Cancel</button>
            </div>
        </div>
    </div>

    <script src="<?= base_url('assets/js/wm-shipping.js') ?>"></script>
</body>
</html>