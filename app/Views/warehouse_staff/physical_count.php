<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Physical Count | Warehouse Staff</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/warehouse-staff.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Warehouse Staff</span>
        </div>
        <ul>
            <li><a href="<?= base_url('warehouse-staff/dashboard') ?>">Dashboard</a></li>
            <li><a href="<?= base_url('warehouse-staff/inventory') ?>">Inventory</a></li>
            <li><a href="<?= base_url('warehouse-staff/receiving') ?>">Receiving</a></li>
            <li><a href="<?= base_url('warehouse-staff/shipping') ?>">Shipping</a></li>
            <li><a href="<?= base_url('warehouse-staff/physical-count') ?>" class="active">Physical Count</a></li>
            <li><a href="<?= base_url('warehouse-staff/scan') ?>">Scan Items</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="dashboard-section">
            <h1>Physical Inventory Count</h1>
            
            <div class="count-actions">
                <button class="primary-btn" id="newCountBtn">+ Start New Count</button>
                <button class="secondary-btn" id="viewHistoryBtn">View History</button>
            </div>
            
            <div class="active-count-section">
                <h2>Active Count Sessions</h2>
                <div class="count-cards" id="active-counts">
                    <div class="count-card">
                        <div class="count-header">
                            <h3>Count #INV-2024-007</h3>
                            <span class="count-status in-progress">In Progress</span>
                        </div>
                        <div class="count-details">
                            <p><strong>Location:</strong> Warehouse A, Zone B</p>
                            <p><strong>Started:</strong> July 12, 2024</p>
                            <p><strong>Items Counted:</strong> 45 of 78</p>
                        </div>
                        <button class="count-action">Continue Count</button>
                    </div>
                    
                    <div class="count-card">
                        <div class="count-header">
                            <h3>Count #INV-2024-006</h3>
                            <span class="count-status pending">Pending Verification</span>
                        </div>
                        <div class="count-details">
                            <p><strong>Location:</strong> Warehouse B, Zone C</p>
                            <p><strong>Started:</strong> July 10, 2024</p>
                            <p><strong>Items Counted:</strong> 120 of 120</p>
                        </div>
                        <button class="count-action">View Results</button>
                    </div>
                </div>
            </div>
            
            <div class="discrepancy-section">
                <h2>Discrepancies Found</h2>
                <table class="count-table">
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>System Count</th>
                            <th>Physical Count</th>
                            <th>Variance</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="discrepancy-table-body">
                        <tr>
                            <td>MAT-002</td>
                            <td>Steel Rebar (10mm)</td>
                            <td>Warehouse B, Zone C</td>
                            <td>85</td>
                            <td>82</td>
                            <td class="negative">-3</td>
                            <td><span class="status-pending">Pending</span></td>
                        </tr>
                        <tr>
                            <td>MAT-005</td>
                            <td>Concrete Blocks</td>
                            <td>Warehouse A, Zone B</td>
                            <td>350</td>
                            <td>352</td>
                            <td class="positive">+2</td>
                            <td><span class="status-resolved">Resolved</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <!-- New Count Modal -->
    <div class="modal" id="newCountModal">
        <div class="modal-content">
            <span class="close" id="closeNewCountModal">&times;</span>
            <h3>Start New Physical Count</h3>
            <form id="newCountForm" method="post" action="<?= base_url('warehouse-staff/start-count') ?>">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label for="countLocation">Warehouse Location</label>
                    <select id="countLocation" name="location" required>
                        <option value="">Select Location...</option>
                        <option value="Warehouse A, Zone A">Warehouse A, Zone A</option>
                        <option value="Warehouse A, Zone B">Warehouse A, Zone B</option>
                        <option value="Warehouse B, Zone A">Warehouse B, Zone A</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="countType">Count Type</label>
                    <select id="countType" name="type" required>
                        <option value="">Select Type...</option>
                        <option value="Full">Full Count</option>
                        <option value="Cycle">Cycle Count</option>
                        <option value="Spot">Spot Check</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="countNotes">Notes</label>
                    <textarea id="countNotes" name="notes" rows="3"></textarea>
                </div>
                
                <button type="submit" class="primary-btn">Start Count</button>
            </form>
        </div>
    </div>

    <script src="<?= base_url('assets/js/warehouse-staff-physical-count.js') ?>"></script>
</body>
</html>