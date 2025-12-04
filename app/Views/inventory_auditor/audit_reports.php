<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Audit Reports | Inventory Auditor</title>
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
            <li><a href="<?= base_url('inventory-auditor/audit-schedule') ?>">Audit Schedule</a></li>
            <li><a href="<?= base_url('inventory-auditor/discrepancies') ?>">Discrepancies</a></li>
            <li><a href="<?= base_url('inventory-auditor/inventory-view') ?>">Inventory View</a></li>
            <li><a href="<?= base_url('inventory-auditor/audit-reports') ?>" class="active">Audit Reports</a></li>
            <li><a href="<?= base_url('inventory-auditor/reconciliation') ?>">Reconciliation</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="report-header">
            <h1>Audit Reports</h1>
            <div class="report-actions">
                <div class="filter-group">
                    <input type="text" id="search-input" placeholder="Search reports...">
                    <select id="warehouse-filter">
                        <option value="all">All Warehouses</option>
                        <option value="a">Warehouse A</option>
                        <option value="b">Warehouse B</option>
                        <option value="c">Warehouse C</option>
                    </select>
                    <select id="date-filter">
                        <option value="all">All Time</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                    <button id="search-btn">Search</button>
                </div>
                <button id="generate-report-btn" class="primary-btn">Generate Report</button>
            </div>
        </div>

        <div class="dashboard-section">
            <div class="reports-container">
                <h2>Recent Audit Reports</h2>
                <div class="reports-grid" id="reports-grid">
                    <!-- JS will populate -->
                </div>
            </div>
            
            <div class="dashboard-section">
                <h2>Report Categories</h2>
                <div class="report-categories">
                    <div class="report-category-card" data-category="inventory">
                        <div class="category-icon">📦</div>
                        <div class="category-title">Inventory Audits</div>
                        <div class="category-count">15 Reports</div>
                    </div>
                    <div class="report-category-card" data-category="cycle">
                        <div class="category-icon">🔄</div>
                        <div class="category-title">Cycle Counts</div>
                        <div class="category-count">8 Reports</div>
                    </div>
                    <div class="report-category-card" data-category="discrepancy">
                        <div class="category-icon">⚠️</div>
                        <div class="category-title">Discrepancy Analysis</div>
                        <div class="category-count">7 Reports</div>
                    </div>
                    <div class="report-category-card" data-category="reconciliation">
                        <div class="category-icon">✅</div>
                        <div class="category-title">Reconciliation Reports</div>
                        <div class="category-count">5 Reports</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Report Details Modal -->
    <div class="modal" id="reportModal">
        <div class="modal-content modal-lg">
            <span class="close" id="closeReportModal">&times;</span>
            <h3 id="report-title">Report Details</h3>
            <div id="report-details">
                <!-- JS will populate -->
            </div>
            <div class="modal-actions">
                <button id="print-report-btn" class="primary-btn">Print Report</button>
                <button id="download-report-btn" class="secondary-btn">Download PDF</button>
                <button id="export-excel-btn" class="secondary-btn">Export to Excel</button>
            </div>
        </div>
    </div>
    
    <!-- Generate Report Modal -->
    <div class="modal" id="generateReportModal">
        <div class="modal-content">
            <span class="close" id="closeGenerateModal">&times;</span>
            <h3>Generate New Report</h3>
            <form id="generateReportForm" method="post" action="<?= base_url('inventory-auditor/generate-report') ?>">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label for="report-type">Report Type</label>
                    <select id="report-type" name="report_type" required>
                        <option value="">Select Report Type...</option>
                        <option value="full-audit">Full Inventory Audit</option>
                        <option value="cycle-count">Cycle Count</option>
                        <option value="discrepancy">Discrepancy Analysis</option>
                        <option value="reconciliation">Reconciliation Report</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="report-warehouse">Warehouse</label>
                    <select id="report-warehouse" name="warehouse" required>
                        <option value="">Select Warehouse...</option>
                        <option value="Warehouse A">Warehouse A</option>
                        <option value="Warehouse B">Warehouse B</option>
                        <option value="Warehouse C">Warehouse C</option>
                        <option value="All Warehouses">All Warehouses</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="report-date-range">Date Range</label>
                    <select id="report-date-range" name="date_range" required>
                        <option value="">Select Date Range...</option>
                        <option value="Last 7 Days">Last 7 Days</option>
                        <option value="Last 30 Days">Last 30 Days</option>
                        <option value="This Month">This Month</option>
                        <option value="Last Month">Last Month</option>
                        <option value="This Quarter">This Quarter</option>
                        <option value="Custom">Custom Date Range</option>
                    </select>
                </div>
                
                <div id="custom-date-range" style="display: none;">
                    <div class="form-row">
                        <div class="form-group half">
                            <label for="start-date">Start Date</label>
                            <input type="date" id="start-date" name="start_date">
                        </div>
                        <div class="form-group half">
                            <label for="end-date">End Date</label>
                            <input type="date" id="end-date" name="end_date">
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="report-format">Output Format</label>
                    <select id="report-format" name="format" required>
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                        <option value="csv">CSV</option>
                    </select>
                </div>
                
                <button type="submit" class="primary-btn">Generate Report</button>
            </form>
        </div>
    </div>

    <script src="<?= base_url('assets/js/ia-audit-reports.js') ?>"></script>
</body>
</html>