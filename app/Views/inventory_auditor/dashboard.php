<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Inventory Auditor Dashboard</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/inventory-auditor.css') ?>">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Logo" class="sidebar-logo">
            <span class="sidebar-title">Inventory Auditor</span>
        </div>
        <ul>
            <li><a href="<?= base_url('inventory-auditor/dashboard') ?>" class="active">Dashboard</a></li>
            <li><a href="<?= base_url('inventory-auditor/audit-schedule') ?>">Audit Schedule</a></li>
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
        <div id="dashboard-section">
            <h1>Welcome, Inventory Auditor!</h1>
            <div class="dashboard-row">
                <div class="dashboard-col">
                    <div class="dashboard-cards">
                        <div class="dashboard-card">
                            <div class="card-title">Scheduled Audits</div>
                            <div class="card-value" id="stat-audits">3</div>
                        </div>
                        <div class="dashboard-card">
                            <div class="card-title">Open Discrepancies</div>
                            <div class="card-value" id="stat-discrepancies">7</div>
                        </div>
                        <div class="dashboard-card">
                            <div class="card-title">Completed Audits</div>
                            <div class="card-value" id="stat-completed">12</div>
                        </div>
                    </div>
                    
                    <div class="dashboard-section">
                        <h2>Upcoming Audits</h2>
                        <table class="audit-table">
                            <thead>
                                <tr>
                                    <th>Audit ID</th>
                                    <th>Date</th>
                                    <th>Warehouse</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="audit-table-body">
                                <!-- JS will populate -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="dashboard-section">
                        <h2>Recent Audit Reports</h2>
                        <div class="reports-list" id="audit-reports-list">
                            <!-- JS will populate -->
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-col dashboard-col-right">
                    <div class="dashboard-section">
                        <h2>Recent Discrepancies</h2>
                        <ul class="discrepancy-list" id="discrepancy-list">
                            <!-- JS will populate -->
                        </ul>
                        <a href="<?= base_url('inventory-auditor/discrepancies') ?>" class="view-all-link">View all discrepancies &rarr;</a>
                    </div>
                    
                    <div class="dashboard-section">
                        <h2>Audit Calendar</h2>
                        <div class="calendar-container" id="audit-calendar">
                            <div class="calendar-header">
                                <button id="prev-month">&lt;</button>
                                <h3 id="calendar-month">July 2024</h3>
                                <button id="next-month">&gt;</button>
                            </div>
                            <div class="calendar-grid">
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
                </div>
            </div>
        </div>
    </div>
    
    <!-- Audit Details Modal -->
    <div class="modal" id="auditModal">
        <div class="modal-content">
            <span class="close" id="closeAuditModal">&times;</span>
            <h3>Audit Details</h3>
            <div id="audit-details"></div>
            <div class="modal-actions">
                <button id="start-audit-btn" class="primary-btn">Start Audit</button>
                <button id="reschedule-btn" class="secondary-btn">Reschedule</button>
            </div>
        </div>
    </div>
    
    <script src="<?= base_url('assets/js/inventory-auditor.js') ?>"></script>
</body>
</html>