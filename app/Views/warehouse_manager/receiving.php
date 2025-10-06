<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WM Receiving</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/wm-receiving.css') ?>">
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
            <li><a href="<?= base_url('warehouse-manager/receiving') ?>" class="active">Receiving</a></li>
            <li><a href="<?= base_url('warehouse-manager/shipping') ?>">Shipping</a></li>
            <li><a href="<?= base_url('warehouse-manager/approvals') ?>">Approvals</a></li>
            <li><a href="<?= base_url('warehouse-manager/batch-tracking') ?>">Batch/Lot Tracking</a></li>
            <li><a href="<?= base_url('warehouse-manager/reports') ?>">Reports</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="dashboard-section" id="receiving-section">
            <h2>Receiving</h2>
            <button class="add-item-btn" id="openAddModalBtn">+ Add Receiving</button>
            <div class="receiving-table-wrapper">
                <table class="receiving-table">
                    <thead>
                        <tr>
                            <th>Reference No.</th>
                            <th>Supplier</th>
                            <th>Material</th>
                            <th>Quantity</th>
                            <th>Date Received</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="receiving-table-body">
                        <!-- JS will populate -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Add Receiving Modal -->
    <div class="modal" id="addModal">
        <div class="modal-content">
            <span class="close" id="closeAddModal">&times;</span>
            <h3>Add Receiving</h3>
            <form id="addReceivingForm" method="post" action="<?= base_url('warehouse-manager/add-receiving') ?>">
                <?= csrf_field() ?>
                <label for="refNo">Reference No.</label>
                <input type="text" id="refNo" name="refNo" required>

                <label for="supplier">Supplier</label>
                <input type="text" id="supplier" name="supplier" required>

                <label for="material">Material</label>
                <input type="text" id="material" name="material" required>

                <label for="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" min="1" required>

                <label for="dateReceived">Date Received</label>
                <input type="date" id="dateReceived" name="dateReceived" required>

                <label for="status">Status</label>
                <select id="status" name="status" required>
                    <option value="">Select Status...</option>
                    <option value="Received">Received</option>
                    <option value="Pending">Pending</option>
                    <option value="Damaged">Damaged</option>
                </select>

                <button type="submit">Add Receiving</button>
                <div class="success-message" id="addSuccessMsg"></div>
            </form>
        </div>
    </div>

    <!-- Edit Receiving Modal -->
    <div class="modal" id="editModal">
        <div class="modal-content">
            <span class="close" id="closeEditModal">&times;</span>
            <h3>Edit Receiving</h3>
            <form id="editReceivingForm" method="post" action="<?= base_url('warehouse-manager/edit-receiving') ?>">
                <?= csrf_field() ?>
                <label for="editRefNo">Reference No.</label>
                <input type="text" id="editRefNo" name="editRefNo" required readonly>

                <label for="editSupplier">Supplier</label>
                <input type="text" id="editSupplier" name="editSupplier" required>

                <label for="editMaterial">Material</label>
                <input type="text" id="editMaterial" name="editMaterial" required>

                <label for="editQuantity">Quantity</label>
                <input type="number" id="editQuantity" name="editQuantity" min="1" required>

                <label for="editDateReceived">Date Received</label>
                <input type="date" id="editDateReceived" name="editDateReceived" required>

                <label for="editStatus">Status</label>
                <select id="editStatus" name="editStatus" required>
                    <option value="">Select Status...</option>
                    <option value="Received">Received</option>
                    <option value="Pending">Pending</option>
                    <option value="Damaged">Damaged</option>
                </select>

                <button type="submit">Save Changes</button>
                <div class="success-message" id="editSuccessMsg"></div>
            </form>
        </div>
    </div>

    <!-- View Receiving Modal -->
    <div class="modal" id="viewModal">
        <div class="modal-content">
            <span class="close" id="closeViewModal">&times;</span>
            <h3>Receiving Details</h3>
            <div id="viewReceivingDetails"></div>
        </div>
    </div>

    <!-- Confirm Delete Modal -->
    <div class="modal" id="deleteModal">
        <div class="modal-content">
            <span class="close" id="closeDeleteModal">&times;</span>
            <h3>Delete Receiving</h3>
            <div id="deleteReceivingDetails"></div>
            <div class="delete-modal-actions">
                <button id="confirmDeleteBtn" class="action-btn" style="background:#d8000c;">Delete</button>
                <button id="cancelDeleteBtn" class="action-btn">Cancel</button>
            </div>
        </div>
    </div>

    <script src="<?= base_url('assets/js/wm-receiving.js') ?>"></script>
</body>
</html>