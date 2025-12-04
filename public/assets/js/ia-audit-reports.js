document.addEventListener('DOMContentLoaded', function() {
    // Sample reports data
    const reports = [
        {
            id: "RPT-2024-001",
            title: "Monthly Inventory Audit - July 2024",
            type: "full-audit",
            typeDisplay: "Full Inventory Audit",
            warehouse: "All Warehouses",
            dateGenerated: "2024-07-10",
            generatedBy: "John Smith",
            status: "Completed",
            summary: {
                totalItems: 1245,
                totalValue: "$842,500",
                discrepancies: 7,
                accuracy: "99.4%"
            },
            findings: [
                "7 discrepancies found across all warehouses",
                "Warehouse A shows 99.8% inventory accuracy",
                "Warehouse B shows 98.9% inventory accuracy",
                "Warehouse C shows 99.5% inventory accuracy"
            ],
            recommendations: [
                "Review receiving procedures in Warehouse B",
                "Schedule additional cycle counts for high-variance items",
                "Update system for automatic inventory alerts"
            ]
        },
        {
            id: "RPT-2024-002",
            title: "Cycle Count - Building Materials",
            type: "cycle",
            typeDisplay: "Cycle Count",
            warehouse: "Warehouse A",
            dateGenerated: "2024-07-05",
            generatedBy: "Sarah Johnson",
            status: "Completed",
            summary: {
                totalItems: 352,
                totalValue: "$215,600",
                discrepancies: 3,
                accuracy: "99.1%"
            },
            findings: [
                "3 minor discrepancies found in cement inventory",
                "All plywood sheets accounted for",
                "Paint inventory shows slight variance"
            ],
            recommendations: [
                "Improve storage labeling for cement products",
                "Schedule follow-up count in 2 weeks"
            ]
        },
        {
            id: "RPT-2024-003",
            title: "Discrepancy Analysis - Q2 2024",
            type: "discrepancy",
            typeDisplay: "Discrepancy Analysis",
            warehouse: "All Warehouses",
            dateGenerated: "2024-07-01",
            generatedBy: "Michael Brown",
            status: "Completed",
            summary: {
                totalDiscrepancies: 22,
                resolvedDiscrepancies: 18,
                pendingDiscrepancies: 4,
                topCategories: "Building Materials, Electrical"
            },
            findings: [
                "22 total discrepancies identified in Q2",
                "81.8% resolution rate (18 resolved)",
                "4 discrepancies still under investigation",
                "Building materials account for 45% of all discrepancies"
            ],
            recommendations: [
                "Implement double-verification for high-value items",
                "Conduct staff training on inventory procedures",
                "Review supplier packaging for commonly miscounted items"
            ]
        },
        {
            id: "RPT-2024-004",
            title: "Weekly Cycle Count - Electrical Supplies",
            type: "cycle",
            typeDisplay: "Cycle Count",
            warehouse: "Warehouse B",
            dateGenerated: "2024-06-28",
            generatedBy: "Sarah Johnson",
            status: "Completed",
            summary: {
                totalItems: 178,
                totalValue: "$95,200",
                discrepancies: 2,
                accuracy: "98.9%"
            }
        },
        {
            id: "RPT-2024-005",
            title: "Monthly Reconciliation Report",
            type: "reconciliation",
            typeDisplay: "Reconciliation Report",
            warehouse: "All Warehouses",
            dateGenerated: "2024-06-30",
            generatedBy: "John Smith",
            status: "Completed",
            summary: {
                totalAdjustments: 15,
                adjustmentValue: "$3,240",
                systemUpdates: 32
            }
        },
        {
            id: "RPT-2024-006",
            title: "Quarterly Audit Report - Q2 2024",
            type: "full-audit",
            typeDisplay: "Full Inventory Audit",
            warehouse: "All Warehouses",
            dateGenerated: "2024-06-30",
            generatedBy: "John Smith",
            status: "Completed",
            summary: {
                totalItems: 1228,
                totalValue: "$835,100",
                discrepancies: 12,
                accuracy: "99.0%"
            }
        }
    ];

    // Render the reports grid
    function renderReports(filteredReports = null) {
        const reportsToRender = filteredReports || reports;
        const reportsGrid = document.getElementById('reports-grid');
        reportsGrid.innerHTML = '';
        
        if (reportsToRender.length === 0) {
            reportsGrid.innerHTML = '<div class="no-results">No reports found matching your criteria.</div>';
            return;
        }
        
        reportsToRender.forEach(report => {
            const reportCard = document.createElement('div');
            reportCard.className = 'report-card';
            reportCard.dataset.reportId = report.id;
            
            // Get first summary key/value pair for preview
            const summaryKey = Object.keys(report.summary)[0];
            const summaryValue = report.summary[summaryKey];
            
            reportCard.innerHTML = `
                <div class="report-header-section">
                    <h3 class="report-title">${report.title}</h3>
                    <div class="report-type ${report.type}">${report.typeDisplay}</div>
                </div>
                <div class="report-body">
                    <div class="report-info">
                        <div class="report-info-item">
                            <span class="report-info-label">ID:</span>
                            <span class="report-info-value">${report.id}</span>
                        </div>
                        <div class="report-info-item">
                            <span class="report-info-label">Location:</span>
                            <span class="report-info-value">${report.warehouse}</span>
                        </div>
                        <div class="report-info-item">
                            <span class="report-info-label">Summary:</span>
                            <span class="report-info-value">${summaryKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${summaryValue}</span>
                        </div>
                    </div>
                </div>
                <div class="report-footer">
                    <div class="report-date">${report.dateGenerated}</div>
                    <div class="report-status status-${report.status.toLowerCase()}">${report.status}</div>
                </div>
            `;
            
            reportsGrid.appendChild(reportCard);
            
            // Add click event to open report details
            reportCard.addEventListener('click', function() {
                showReportDetails(report.id);
            });
        });
    }

    // Filter reports based on search and filters
    document.getElementById('search-btn').addEventListener('click', function() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const warehouseFilter = document.getElementById('warehouse-filter').value;
        const dateFilter = document.getElementById('date-filter').value;
        
        let filtered = [...reports];
        
        // Apply search term filter
        if (searchTerm) {
            filtered = filtered.filter(report => 
                report.title.toLowerCase().includes(searchTerm) ||
                report.id.toLowerCase().includes(searchTerm) ||
                report.typeDisplay.toLowerCase().includes(searchTerm)
            );
        }
        
        // Apply warehouse filter
        if (warehouseFilter !== 'all') {
            filtered = filtered.filter(report => 
                report.warehouse.toLowerCase().includes(`warehouse ${warehouseFilter}`)
            );
        }
        
        // Apply date filter (simplified for demo)
        if (dateFilter !== 'all') {
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            
            filtered = filtered.filter(report => {
                const reportDate = new Date(report.dateGenerated);
                
                if (dateFilter === 'month') {
                    return reportDate.getMonth() === currentMonth && 
                           reportDate.getFullYear() === currentYear;
                } else if (dateFilter === 'quarter') {
                    const reportQuarter = Math.floor(reportDate.getMonth() / 3);
                    const currentQuarter = Math.floor(currentMonth / 3);
                    return reportQuarter === currentQuarter && 
                           reportDate.getFullYear() === currentYear;
                } else if (dateFilter === 'year') {
                    return reportDate.getFullYear() === currentYear;
                }
                
                return true;
            });
        }
        
        renderReports(filtered);
    });

    // Show report details in modal
    function showReportDetails(reportId) {
        const report = reports.find(r => r.id === reportId);
        if (!report) return;
        
        const reportDetailsElement = document.getElementById('report-details');
        document.getElementById('report-title').textContent = report.title;
        
        // Build the report detail HTML
        let detailsHTML = `
            <div class="report-detail-header">
                <div class="report-detail-info">
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">Report ID</div>
                        <div class="report-detail-info-value">${report.id}</div>
                    </div>
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">Type</div>
                        <div class="report-detail-info-value">${report.typeDisplay}</div>
                    </div>
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">Warehouse</div>
                        <div class="report-detail-info-value">${report.warehouse}</div>
                    </div>
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">Date Generated</div>
                        <div class="report-detail-info-value">${report.dateGenerated}</div>
                    </div>
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">Generated By</div>
                        <div class="report-detail-info-value">${report.generatedBy}</div>
                    </div>
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">Status</div>
                        <div class="report-detail-info-value">
                            <span class="report-status status-${report.status.toLowerCase()}">${report.status}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="report-detail-section">
                <h4>Summary</h4>
                <div class="report-summary-stats">
        `;
        
        // Add summary stats
        for (const [key, value] of Object.entries(report.summary)) {
            const formattedKey = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase());
                
            detailsHTML += `
                <div class="summary-stat">
                    <div class="summary-stat-value">${value}</div>
                    <div class="summary-stat-label">${formattedKey}</div>
                </div>
            `;
        }
        
        detailsHTML += `
                </div>
            </div>
        `;
        
        // Add findings if available
        if (report.findings && report.findings.length > 0) {
            detailsHTML += `
                <div class="report-detail-section">
                    <h4>Key Findings</h4>
                    <ul class="findings-list">
            `;
            
            report.findings.forEach(finding => {
                detailsHTML += `<li>${finding}</li>`;
            });
            
            detailsHTML += `
                    </ul>
                </div>
            `;
        }
        
        // Add recommendations if available
        if (report.recommendations && report.recommendations.length > 0) {
            detailsHTML += `
                <div class="report-detail-section">
                    <h4>Recommendations</h4>
                    <ul class="recommendations-list">
            `;
            
            report.recommendations.forEach(recommendation => {
                detailsHTML += `<li>${recommendation}</li>`;
            });
            
            detailsHTML += `
                    </ul>
                </div>
            `;
        }
        
        reportDetailsElement.innerHTML = detailsHTML;
        document.getElementById('reportModal').style.display = 'flex';
    }

    // Generate Report button click
    document.getElementById('generate-report-btn').addEventListener('click', function() {
        document.getElementById('generateReportModal').style.display = 'flex';
    });

    // Date range selection change
    document.getElementById('report-date-range').addEventListener('change', function() {
        const customDateRange = document.getElementById('custom-date-range');
        if (this.value === 'Custom') {
            customDateRange.style.display = 'block';
        } else {
            customDateRange.style.display = 'none';
        }
    });

    // Generate report form submission
    document.getElementById('generateReportForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const reportType = document.getElementById('report-type').value;
        const warehouse = document.getElementById('report-warehouse').value;
        const dateRange = document.getElementById('report-date-range').value;
        const format = document.getElementById('report-format').value;
        
        // Simulate report generation
        alert(`Generating a ${reportType} report for ${warehouse} covering ${dateRange} in ${format.toUpperCase()} format.`);
        
        // In a real app, this would send the request to the server
        document.getElementById('generateReportModal').style.display = 'none';
        
        // Reset form
        this.reset();
        document.getElementById('custom-date-range').style.display = 'none';
    });

    // Category card click events
    document.querySelectorAll('.report-category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            const filteredReports = reports.filter(report => report.type === category);
            renderReports(filteredReports);
        });
    });

    // Report action buttons
    document.getElementById('print-report-btn').addEventListener('click', function() {
        window.print();
    });
    
    document.getElementById('download-report-btn').addEventListener('click', function() {
        alert('PDF download would start here');
    });
    
    document.getElementById('export-excel-btn').addEventListener('click', function() {
        alert('Excel export would start here');
    });

    // Close modals
    document.getElementById('closeReportModal').addEventListener('click', function() {
        document.getElementById('reportModal').style.display = 'none';
    });
    
    document.getElementById('closeGenerateModal').addEventListener('click', function() {
        document.getElementById('generateReportModal').style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const reportModal = document.getElementById('reportModal');
        const generateModal = document.getElementById('generateReportModal');
        
        if (event.target === reportModal) {
            reportModal.style.display = 'none';
        }
        if (event.target === generateModal) {
            generateModal.style.display = 'none';
        }
    });

    // Initial render
    renderReports();
});
