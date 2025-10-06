<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Audit Schedule | Inventory Auditor</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/inventory-auditor.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Inventory Auditor</span>
        </div>
        <ul>
            <li><a href="<?= base_url('inventory-auditor/dashboard') ?>">Dashboard</a></li>
            <li><a href="<?= base_url('inventory-auditor/audit-schedule') ?>" class="active">Audit Schedule</a></li>
            <li><a href="<?= base_url('inventory-auditor/discrepancies') ?>">Discrepancies</a></li>
            <li><a href="<?= base_url('inventory-auditor/inventory-view') ?>">Inventory View</a></li>
            <li><a href="<?= base_url('inventory-auditor/audit-reports') ?>">Audit Reports</a></li>
            <li><a href="<?= base_url('inventory-auditor/reconciliation') ?>">Reconciliation</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="schedule-header">
            <h1>Audit Schedule</h1>
            <div class="schedule-actions">
                <button id="new-audit-btn" class="primary-btn">+ New Audit</button>
                <div class="filter-group">
                    <select id="warehouse-filter">
                        <option value="all">All Warehouses</option>
                        <option value="a">Warehouse A</option>
                        <option value="b">Warehouse B</option>
                        <option value="c">Warehouse C</option>
                    </select>
                    <select id="status-filter">
                        <option value="all">All Statuses</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button id="filter-btn">Filter</button>
                </div>
            </div>
        </div>

        <div class="dashboard-section">
            <div class="schedule-tabs">
                <button class="schedule-tab active" data-view="calendar">Calendar View</button>
                <button class="schedule-tab" data-view="list">List View</button>
            </div>
            
            <div class="schedule-view" id="calendar-view">
                <div class="calendar-full-container">
                    <div class="calendar-header-full">
                        <button id="prev-month-full">&lt;</button>
                        <h3 id="calendar-month-full">July 2024</h3>
                        <button id="next-month-full">&gt;</button>
                    </div>
                    <div class="calendar-grid-full">
                        <div class="calendar-day day-header">Sun</div>
                        <div class="calendar-day day-header">Mon</div>
                        <div class="calendar-day day-header">Tue</div>
                        <div class="calendar-day day-header">Wed</div>
                        <div class="calendar-day day-header">Thu</div>
                        <div class="calendar-day day-header">Fri</div>
                        <div class="calendar-day day-header">Sat</div>
                        <!-- JS will populate days -->
                    </div>
                </div>
            </div>
            
            <div class="schedule-view" id="list-view" style="display: none;">
                <table class="audit-schedule-table">
                    <thead>
                        <tr>
                            <th>Audit ID</th>
                            <th>Date</th>
                            <th>Warehouse</th>
                            <th>Type</th>
                            <th>Auditor</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="schedule-table-body">
                        <!-- JS will populate -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <!-- New Audit Modal -->
    <div class="modal" id="newAuditModal">
        <div class="modal-content">
            <span class="close" id="closeNewAuditModal">&times;</span>
            <h3>Schedule New Audit</h3>
            <form id="newAuditForm" method="post" action="<?= base_url('inventory-auditor/schedule-audit') ?>">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label for="auditType">Audit Type</label>
                    <select id="auditType" name="auditType" required>
                        <option value="">Select Type...</option>
                        <option value="Full Inventory">Full Inventory</option>
                        <option value="Cycle Count">Cycle Count</option>
                        <option value="Spot Check">Spot Check</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="auditWarehouse">Warehouse</label>
                    <select id="auditWarehouse" name="auditWarehouse" required>
                        <option value="">Select Warehouse...</option>
                        <option value="Warehouse A">Warehouse A</option>
                        <option value="Warehouse B">Warehouse B</option>
                        <option value="Warehouse C">Warehouse C</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="auditZone">Zone/Area</label>
                    <select id="auditZone" name="auditZone">
                        <option value="All Zones">All Zones</option>
                        <option value="Zone A">Zone A</option>
                        <option value="Zone B">Zone B</option>
                        <option value="Zone C">Zone C</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="auditDate">Date</label>
                    <input type="date" id="auditDate" name="auditDate" required>
                </div>
                
                <div class="form-group">
                    <label for="auditAssignee">Assigned To</label>
                    <select id="auditAssignee" name="auditAssignee" required>
                        <option value="">Select Auditor...</option>
                        <option value="John Smith">John Smith</option>
                        <option value="Sarah Johnson">Sarah Johnson</option>
                        <option value="Michael Brown">Michael Brown</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="auditNotes">Notes</label>
                    <textarea id="auditNotes" name="auditNotes" rows="3"></textarea>
                </div>
                
                <button type="submit" class="primary-btn">Schedule Audit</button>
            </form>
        </div>
    </div>
    
    <!-- Audit Details Modal -->
    <div class="modal" id="auditDetailsModal">
        <div class="modal-content">
            <span class="close" id="closeAuditDetailsModal">&times;</span>
            <h3>Audit Details</h3>
            <div id="schedule-audit-details"></div>
            <div class="modal-actions">
                <button id="start-schedule-audit-btn" class="primary-btn">Start Audit</button>
                <button id="edit-schedule-btn" class="secondary-btn">Edit</button>
                <button id="delete-schedule-btn" class="danger-btn">Delete</button>
            </div>
        </div>
    </div>

    <script src="<?= base_url('assets/js/ia-audit-schedule.js') ?>"></script>
</body>
</html>