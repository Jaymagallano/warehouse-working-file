<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reports | Procurement Officer</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/procurement-officer.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/po-reports.css') ?>">
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
            <li><a href="<?= base_url('procurement-officer/delivery-tracking') ?>">Delivery Tracking</a></li>
            <li><a href="<?= base_url('procurement-officer/invoices') ?>">Invoices & Payments</a></li>
            <li><a href="<?= base_url('procurement-officer/reports') ?>" class="active">Reports</a></li>
        </ul>
        <div class="logout-box">
            <a href="<?= base_url('auth/logout') ?>" class="logout-link">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="reports-header">
            <h1>Reports & Analytics</h1>
            <div class="date-filter">
                <label for="date-range">Date Range:</label>
                <select id="date-range">
                    <option value="last30">Last 30 Days</option>
                    <option value="last90">Last 90 Days</option>
                    <option value="year">Year to Date</option>
                    <option value="custom">Custom Range</option>
                </select>
                <div id="custom-date-range" style="display: none;">
                    <input type="date" id="start-date">
                    <span>to</span>
                    <input type="date" id="end-date">
                    <button id="apply-date-range" class="secondary-btn">Apply</button>
                </div>
            </div>
        </div>

        <div class="key-metrics">
            <div class="metric-card">
                <div class="metric-icon">
                    <i class="fas fa-file-invoice-dollar"></i>
                </div>
                <div class="metric-content">
                    <div class="metric-value">$438,250</div>
                    <div class="metric-label">Total Spend</div>
                </div>
                <div class="metric-change up">+12.4%</div>
            </div>
            <div class="metric-card">
                <div class="metric-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="metric-content">
                    <div class="metric-value">82</div>
                    <div class="metric-label">Purchase Orders</div>
                </div>
                <div class="metric-change up">+5.1%</div>
            </div>
            <div class="metric-card">
                <div class="metric-icon">
                    <i class="fas fa-boxes"></i>
                </div>
                <div class="metric-content">
                    <div class="metric-value">312</div>
                    <div class="metric-label">Items Ordered</div>
                </div>
                <div class="metric-change up">+8.7%</div>
            </div>
            <div class="metric-card">
                <div class="metric-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="metric-content">
                    <div class="metric-value">5.2 days</div>
                    <div class="metric-label">Avg. Processing Time</div>
                </div>
                <div class="metric-change down">-1.3 days</div>
            </div>
        </div>

        <div class="report-sections">
            <div class="report-section" id="spending-analysis">
                <div class="section-header">
                    <h2>Spend Analysis</h2>
                    <div class="section-actions">
                        <button class="download-btn" data-report="spending">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
                <div class="chart-container">
                    <div class="chart-row">
                        <div class="chart-card">
                            <h3>Monthly Spend Trend</h3>
                            <canvas id="spendTrendChart" height="250"></canvas>
                        </div>
                        <div class="chart-card">
                            <h3>Spend by Category</h3>
                            <canvas id="spendByCategoryChart" height="250"></canvas>
                        </div>
                    </div>
                    <div class="chart-row">
                        <div class="chart-card">
                            <h3>Top 10 Suppliers by Spend</h3>
                            <canvas id="topSuppliersChart" height="250"></canvas>
                        </div>
                        <div class="chart-card">
                            <h3>Spend by Project</h3>
                            <canvas id="spendByProjectChart" height="250"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="report-section" id="supplier-performance">
                <div class="section-header">
                    <h2>Supplier Performance</h2>
                    <div class="section-actions">
                        <button class="download-btn" data-report="supplier">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
                <div class="chart-container">
                    <div class="chart-row">
                        <div class="chart-card">
                            <h3>On-Time Delivery Rate</h3>
                            <canvas id="deliveryRateChart" height="250"></canvas>
                        </div>
                        <div class="chart-card">
                            <h3>Quality Compliance</h3>
                            <canvas id="qualityChart" height="250"></canvas>
                        </div>
                    </div>
                    <div class="chart-row">
                        <div class="chart-card full-width">
                            <h3>Supplier Performance Scorecard</h3>
                            <div class="table-wrapper">
                                <table class="data-table" id="supplier-scorecard">
                                    <thead>
                                        <tr>
                                            <th>Supplier</th>
                                            <th>Orders</th>
                                            <th>On-Time Delivery</th>
                                            <th>Quality Rating</th>
                                            <th>Response Time</th>
                                            <th>Price Competitiveness</th>
                                            <th>Overall Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- JS will populate this -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="report-section" id="inventory-efficiency">
                <div class="section-header">
                    <h2>Inventory & Procurement Efficiency</h2>
                    <div class="section-actions">
                        <button class="download-btn" data-report="inventory">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
                <div class="chart-container">
                    <div class="chart-row">
                        <div class="chart-card">
                            <h3>Order Fulfillment Time</h3>
                            <canvas id="fulfillmentTimeChart" height="250"></canvas>
                        </div>
                        <div class="chart-card">
                            <h3>Purchase Order Status</h3>
                            <canvas id="poStatusChart" height="250"></canvas>
                        </div>
                    </div>
                    <div class="chart-row">
                        <div class="chart-card">
                            <h3>Price Variance Analysis</h3>
                            <canvas id="priceVarianceChart" height="250"></canvas>
                        </div>
                        <div class="chart-card">
                            <h3>Stock Turnover Rate</h3>
                            <canvas id="stockTurnoverChart" height="250"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="report-section" id="standard-reports">
            <div class="section-header">
                <h2>Standard Reports</h2>
            </div>
            <div class="reports-grid">
                <div class="report-item">
                    <div class="report-icon">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div class="report-details">
                        <h3>Monthly Procurement Summary</h3>
                        <p>Complete overview of all procurement activities for the current month</p>
                    </div>
                    <button class="secondary-btn">Generate</button>
                </div>
                <div class="report-item">
                    <div class="report-icon">
                        <i class="fas fa-file-excel"></i>
                    </div>
                    <div class="report-details">
                        <h3>Supplier Performance Analysis</h3>
                        <p>Detailed analysis of supplier performance metrics and trends</p>
                    </div>
                    <button class="secondary-btn">Generate</button>
                </div>
                <div class="report-item">
                    <div class="report-icon">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div class="report-details">
                        <h3>Cost Savings Report</h3>
                        <p>Analysis of procurement savings against budgeted costs</p>
                    </div>
                    <button class="secondary-btn">Generate</button>
                </div>
                <div class="report-item">
                    <div class="report-icon">
                        <i class="fas fa-file-excel"></i>
                    </div>
                    <div class="report-details">
                        <h3>Inventory Valuation</h3>
                        <p>Current valuation of all inventory items with historical comparison</p>
                    </div>
                    <button class="secondary-btn">Generate</button>
                </div>
                <div class="report-item">
                    <div class="report-icon">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div class="report-details">
                        <h3>Purchase Order History</h3>
                        <p>Comprehensive list of all purchase orders with status and details</p>
                    </div>
                    <button class="secondary-btn">Generate</button>
                </div>
                <div class="report-item">
                    <div class="report-icon">
                        <i class="fas fa-file-excel"></i>
                    </div>
                    <div class="report-details">
                        <h3>Material Price Trends</h3>
                        <p>Analysis of price trends for key materials over time</p>
                    </div>
                    <button class="secondary-btn">Generate</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Report Generation Modal -->
    <div class="modal" id="reportModal">
        <div class="modal-content">
            <span class="close" id="closeReportModal">&times;</span>
            <h3>Generate Report</h3>
            <form id="reportForm" method="post" action="<?= base_url('procurement-officer/generate-report') ?>">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label for="report-title">Report Title</label>
                    <input type="text" id="report-title" name="report_title" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="report-format">Format</label>
                        <select id="report-format" name="format" required>
                            <option value="pdf">PDF</option>
                            <option value="excel">Excel</option>
                            <option value="csv">CSV</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="report-period">Period</label>
                        <select id="report-period" name="period" required>
                            <option value="current-month">Current Month</option>
                            <option value="previous-month">Previous Month</option>
                            <option value="quarter">Current Quarter</option>
                            <option value="year">Year to Date</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
                
                <div id="custom-report-date" style="display: none;">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="report-start-date">Start Date</label>
                            <input type="date" id="report-start-date" name="start_date">
                        </div>
                        <div class="form-group">
                            <label for="report-end-date">End Date</label>
                            <input type="date" id="report-end-date" name="end_date">
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Additional Options</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" id="include-charts" name="include_charts"> Include Charts</label>
                        <label><input type="checkbox" id="include-details" name="include_details"> Include Detailed Data</label>
                        <label><input type="checkbox" id="include-summary" name="include_summary"> Include Executive Summary</label>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="primary-btn">Generate Report</button>
                    <button type="button" id="cancel-report-btn" class="secondary-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
    <script src="<?= base_url('assets/js/po-reports.js') ?>"></script>
</body>
</html>