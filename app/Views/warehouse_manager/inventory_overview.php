<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WM Inventory Overview</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/wm-inventory-overview.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Warehouse Manager</span>
        </div>
        <ul>
            <li><a href="<?= base_url('warehouse-manager/dashboard') ?>" id="dashboard-link">Dashboard</a></li>
            <li><a href="<?= base_url('warehouse-manager/inventory-overview') ?>" id="inventory-link" class="active">Inventory Overview</a></li>
            <li><a href="<?= base_url('warehouse-manager/receiving') ?>" id="receiving-link">Receiving</a></li>
            <li><a href="<?= base_url('warehouse-manager/shipping') ?>" id="shipping-link">Shipping</a></li>
            <li><a href="<?= base_url('warehouse-manager/approvals') ?>" id="approvals-link">Approvals</a></li>
            <li><a href="<?= base_url('warehouse-manager/batch-tracking') ?>" id="batch-link">Batch/Lot Tracking</a></li>
            <li><a href="<?= base_url('warehouse-manager/reports') ?>" id="reports-link">Reports</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="dashboard-section" id="inventory-overview-section">
            <h2>Inventory Overview</h2>
            <button class="add-item-btn" id="openAddModalBtn">+ Add Item</button>
            <div class="inventory-table-wrapper">
                <table class="inventory-table">
                    <thead>
                        <tr>
                            <th>Material Name</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Unit</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="inventory-table-body">
                        <!-- JS will populate -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Add Item Modal -->
    <div class="modal" id="addModal">
        <div class="modal-content">
            <span class="close" id="closeAddModal">&times;</span>
            <h3>Add Inventory Item</h3>
            <form id="addInventoryForm" method="post" action="<?= base_url('warehouse-manager/add-inventory') ?>">
                <?= csrf_field() ?>
                <label for="materialName">Material Name</label>
                <input type="text" id="materialName" name="materialName" required>

                <label for="category">Category</label>
                <input type="text" id="category" name="category" required>

                <label for="stock">Stock</label>
                <input type="number" id="stock" name="stock" min="0" required>

                <label for="unit">Unit</label>
                <input type="text" id="unit" name="unit" required>

                <label for="status">Status</label>
                <select id="status" name="status" required>
                    <option value="">Select Status...</option>
                    <option value="OK">OK</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                </select>

                <button type="submit">Add Item</button>
                <div class="success-message" id="addSuccessMsg"></div>
            </form>
        </div>
    </div>

    <!-- Edit Item Modal -->
    <div class="modal" id="editModal">
        <div class="modal-content">
            <span class="close" id="closeEditModal">&times;</span>
            <h3>Edit Inventory Item</h3>
            <form id="editInventoryForm" method="post" action="<?= base_url('warehouse-manager/edit-inventory') ?>">
                <?= csrf_field() ?>
                <label for="editMaterialName">Material Name</label>
                <input type="text" id="editMaterialName" name="editMaterialName" required>

                <label for="editCategory">Category</label>
                <input type="text" id="editCategory" name="editCategory" required>

                <label for="editStock">Stock</label>
                <input type="number" id="editStock" name="editStock" min="0" required>

                <label for="editUnit">Unit</label>
                <input type="text" id="editUnit" name="editUnit" required>

                <label for="editStatus">Status</label>
                <select id="editStatus" name="editStatus" required>
                    <option value="">Select Status...</option>
                    <option value="OK">OK</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                </select>

                <button type="submit">Save Changes</button>
                <div class="success-message" id="editSuccessMsg"></div>
            </form>
        </div>
    </div>

    <!-- View Item Modal -->
    <div class="modal" id="viewModal">
        <div class="modal-content">
            <span class="close" id="closeViewModal">&times;</span>
            <h3>Inventory Item Details</h3>
            <div id="viewItemDetails"></div>
        </div>
    </div>

    <!-- Confirm Delete Modal -->
    <div class="modal" id="deleteModal">
        <div class="modal-content">
            <span class="close" id="closeDeleteModal">&times;</span>
            <h3>Delete Inventory Item</h3>
            <div id="deleteItemDetails"></div>
            <div class="delete-modal-actions">
                <button id="confirmDeleteBtn" class="action-btn" style="background:#d8000c;">Delete</button>
                <button id="cancelDeleteBtn" class="action-btn">Cancel</button>
            </div>
        </div>
    </div>

    <script src="<?= base_url('assets/js/wm-inventory-overview.js') ?>"></script>
</body>
</html>