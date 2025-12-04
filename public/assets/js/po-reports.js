document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeCharts();
    
    // Populate supplier scorecard table
    populateSupplierScorecard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Functions
    
    // Initialize all charts
    function initializeCharts() {
        // Spend Trend Chart - Line Chart
        const spendTrendCtx = document.getElementById('spendTrendChart').getContext('2d');
        new Chart(spendTrendCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [{
                    label: '2024 Spend ($)',
                    data: [42000, 38000, 52500, 48000, 54000, 61000, 58000, 65000, 70000],
                    borderColor: '#1a1aff',
                    backgroundColor: 'rgba(26, 26, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
        
        // Spend by Category - Doughnut Chart
        const spendByCategoryCtx = document.getElementById('spendByCategoryChart').getContext('2d');
        new Chart(spendByCategoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Building Materials', 'Electrical', 'Plumbing', 'Tools & Equipment', 'Finishing Materials'],
                datasets: [{
                    data: [35, 20, 15, 10, 20],
                    backgroundColor: [
                        '#1a1aff',
                        '#4f8cff',
                        '#00c2ff',
                        '#5753ff',
                        '#9e91ff'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
        
        // Top 10 Suppliers - Horizontal Bar Chart
        const topSuppliersCtx = document.getElementById('topSuppliersChart').getContext('2d');
        new Chart(topSuppliersCtx, {
            type: 'bar',
            data: {
                labels: ['ABC Building Supplies', 'Steel Works Inc.', 'Metro Paints', 'Electrical Supplies Co.', 'Plumbing Pro'],
                datasets: [{
                    label: 'Spend ($)',
                    data: [120000, 85000, 65000, 48000, 42000],
                    backgroundColor: '#1a1aff',
                    barThickness: 20,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.x.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000) + 'k';
                            }
                        }
                    }
                }
            }
        });
        
        // Spend by Project - Pie Chart
        const spendByProjectCtx = document.getElementById('spendByProjectChart').getContext('2d');
        new Chart(spendByProjectCtx, {
            type: 'pie',
            data: {
                labels: ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta', 'Other Projects'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        '#1a1aff',
                        '#4f8cff',
                        '#00c2ff',
                        '#5753ff',
                        '#9e91ff'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
        
        // On-Time Delivery Rate - Line Chart with Dataset
        const deliveryRateCtx = document.getElementById('deliveryRateChart').getContext('2d');
        new Chart(deliveryRateCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [{
                    label: 'On-Time Delivery (%)',
                    data: [82, 84, 86, 85, 89, 92, 90, 91, 93],
                    borderColor: '#1a8f1a',
                    backgroundColor: 'rgba(26, 143, 26, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        min: 75,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
        
        // Quality Compliance - Bar Chart
        const qualityCtx = document.getElementById('qualityChart').getContext('2d');
        new Chart(qualityCtx, {
            type: 'bar',
            data: {
                labels: ['ABC Building', 'Steel Works', 'Metro Paints', 'Electrical Co.', 'Plumbing Pro'],
                datasets: [{
                    label: 'Quality Rating',
                    data: [4.8, 4.5, 4.7, 4.2, 4.6],
                    backgroundColor: '#1a1aff',
                    barThickness: 30,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 3.5,
                        max: 5,
                        ticks: {
                            stepSize: 0.5
                        }
                    }
                }
            }
        });
        
        // Order Fulfillment Time - Line Chart
        const fulfillmentTimeCtx = document.getElementById('fulfillmentTimeChart').getContext('2d');
        new Chart(fulfillmentTimeCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [{
                    label: 'Average Days',
                    data: [6.2, 6.0, 5.8, 5.5, 5.7, 5.4, 5.2, 5.0, 4.8],
                    borderColor: '#e6a700',
                    backgroundColor: 'rgba(230, 167, 0, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 4,
                        max: 7
                    }
                }
            }
        });
        
        // Purchase Order Status - Doughnut Chart
        const poStatusCtx = document.getElementById('poStatusChart').getContext('2d');
        new Chart(poStatusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'In Transit', 'Processing', 'Pending', 'Delayed'],
                datasets: [{
                    data: [45, 20, 15, 12, 8],
                    backgroundColor: [
                        '#1a8f1a',
                        '#1a1aff',
                        '#4f8cff',
                        '#e6a700',
                        '#d8000c'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
        
        // Price Variance Analysis - Bar Chart
        const priceVarianceCtx = document.getElementById('priceVarianceChart').getContext('2d');
        new Chart(priceVarianceCtx, {
            type: 'bar',
            data: {
                labels: ['Cement', 'Steel', 'Lumber', 'Electrical', 'Plumbing'],
                datasets: [{
                    label: 'Price Variance (%)',
                    data: [2.5, 4.8, -1.2, 0.8, -0.5],
                    backgroundColor: function(context) {
                        const value = context.dataset.data[context.dataIndex];
                        return value >= 0 ? '#d8000c' : '#1a8f1a';
                    },
                    barThickness: 30
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
        
        // Stock Turnover Rate - Line Chart
        const stockTurnoverCtx = document.getElementById('stockTurnoverChart').getContext('2d');
        new Chart(stockTurnoverCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [{
                    label: 'Turnover Rate',
                    data: [3.2, 3.4, 3.6, 3.8, 4.0, 4.2, 4.0, 4.3, 4.5],
                    borderColor: '#4f8cff',
                    backgroundColor: 'rgba(79, 140, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 2,
                        max: 5
                    }
                }
            }
        });
    }
    
    // Populate the supplier scorecard table
    function populateSupplierScorecard() {
        const scoreTableBody = document.querySelector('#supplier-scorecard tbody');
        
        // Sample supplier data
        const suppliers = [
            {
                name: "ABC Building Supplies",
                orders: 32,
                onTimeDelivery: 93,
                qualityRating: 4.8,
                responseTime: "4 hrs",
                priceCompetitiveness: 4.5,
                overallScore: 4.7
            },
            {
                name: "Steel Works Inc.",
                orders: 24,
                onTimeDelivery: 88,
                qualityRating: 4.5,
                responseTime: "6 hrs",
                priceCompetitiveness: 4.3,
                overallScore: 4.4
            },
            {
                name: "Metro Paints",
                orders: 18,
                onTimeDelivery: 91,
                qualityRating: 4.7,
                responseTime: "2 hrs",
                priceCompetitiveness: 4.1,
                overallScore: 4.5
            },
            {
                name: "Electrical Supplies Co.",
                orders: 15,
                onTimeDelivery: 82,
                qualityRating: 4.2,
                responseTime: "12 hrs",
                priceCompetitiveness: 4.6,
                overallScore: 4.2
            },
            {
                name: "Plumbing Pro",
                orders: 14,
                onTimeDelivery: 90,
                qualityRating: 4.6,
                responseTime: "8 hrs",
                priceCompetitiveness: 4.4,
                overallScore: 4.5
            }
        ];
        
        // Generate HTML for each supplier row
        suppliers.forEach(supplier => {
            const row = document.createElement('tr');
            
            // Create color class for overall score
            let scoreClass = '';
            if (supplier.overallScore >= 4.5) {
                scoreClass = 'score-excellent';
            } else if (supplier.overallScore >= 4.0) {
                scoreClass = 'score-good';
            } else if (supplier.overallScore >= 3.5) {
                scoreClass = 'score-average';
            } else {
                scoreClass = 'score-poor';
            }
            
            row.innerHTML = `
                <td>${supplier.name}</td>
                <td>${supplier.orders}</td>
                <td>${supplier.onTimeDelivery}%</td>
                <td>${supplier.qualityRating}/5</td>
                <td>${supplier.responseTime}</td>
                <td>${supplier.priceCompetitiveness}/5</td>
                <td class="${scoreClass}">${supplier.overallScore}/5</td>
            `;
            
            scoreTableBody.appendChild(row);
        });
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Date range selector
        const dateRangeSelect = document.getElementById('date-range');
        const customDateRange = document.getElementById('custom-date-range');
        
        dateRangeSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customDateRange.style.display = 'flex';
            } else {
                customDateRange.style.display = 'none';
                
                // Update charts based on selected date range
                updateChartsForDateRange(this.value);
            }
        });
        
        // Apply custom date range
        document.getElementById('apply-date-range').addEventListener('click', function() {
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            
            if (startDate && endDate) {
                // Update charts based on custom date range
                updateChartsForCustomDateRange(startDate, endDate);
            }
        });
        
        // Download report buttons
        document.querySelectorAll('.download-btn').forEach(button => {
            button.addEventListener('click', function() {
                const reportType = this.dataset.report;
                openReportModal(reportType);
            });
        });
        
        // Standard report generate buttons
        document.querySelectorAll('.report-item .secondary-btn').forEach(button => {
            button.addEventListener('click', function() {
                const reportName = this.parentElement.querySelector('h3').textContent;
                openReportModal('standard', reportName);
            });
        });
        
        // Report form period selector
        document.getElementById('report-period').addEventListener('change', function() {
            const customDateDiv = document.getElementById('custom-report-date');
            if (this.value === 'custom') {
                customDateDiv.style.display = 'block';
            } else {
                customDateDiv.style.display = 'none';
            }
        });
        
        // Report form submit
        document.getElementById('reportForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const reportTitle = document.getElementById('report-title').value;
            const format = document.getElementById('report-format').value;
            
            // Simulate report generation
            alert(`Generating ${reportTitle} in ${format.toUpperCase()} format. The download will start shortly.`);
            
            // Close the modal
            document.getElementById('reportModal').style.display = 'none';
        });
        
        // Cancel report generation
        document.getElementById('cancel-report-btn').addEventListener('click', function() {
            document.getElementById('reportModal').style.display = 'none';
        });
        
        // Close report modal
        document.getElementById('closeReportModal').addEventListener('click', function() {
            document.getElementById('reportModal').style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const reportModal = document.getElementById('reportModal');
            if (event.target === reportModal) {
                reportModal.style.display = 'none';
            }
        });
    }
    
    // Update charts based on selected date range
    function updateChartsForDateRange(range) {
        // In a real application, this function would fetch data for the selected date range
        // and update the charts accordingly
        console.log(`Updating charts for date range: ${range}`);
        
        // For demo purposes, we'll just show an alert
        alert(`Charts updated for ${getDateRangeLabel(range)}`);
    }
    
    // Update charts based on custom date range
    function updateChartsForCustomDateRange(startDate, endDate) {
        // In a real application, this function would fetch data for the custom date range
        // and update the charts accordingly
        console.log(`Updating charts for custom date range: ${startDate} to ${endDate}`);
        
        // For demo purposes, we'll just show an alert
        alert(`Charts updated for custom range: ${startDate} to ${endDate}`);
    }
    
    // Open report generation modal
    function openReportModal(reportType, reportName = '') {
        const modal = document.getElementById('reportModal');
        const titleInput = document.getElementById('report-title');
        
        // Set default title based on report type
        let defaultTitle = 'Procurement Report';
        
        switch (reportType) {
            case 'spending':
                defaultTitle = 'Spend Analysis Report';
                break;
            case 'supplier':
                defaultTitle = 'Supplier Performance Report';
                break;
            case 'inventory':
                defaultTitle = 'Inventory & Procurement Efficiency Report';
                break;
            case 'standard':
                defaultTitle = reportName;
                break;
        }
        
        titleInput.value = defaultTitle;
        
        // Show the modal
        modal.style.display = 'flex';
    }
    
    // Get label for date range
    function getDateRangeLabel(range) {
        switch (range) {
            case 'last30':
                return 'Last 30 Days';
            case 'last90':
                return 'Last 90 Days';
            case 'year':
                return 'Year to Date';
            default:
                return 'Custom Range';
        }
    }
});
