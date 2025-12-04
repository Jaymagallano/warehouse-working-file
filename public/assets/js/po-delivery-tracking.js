document.addEventListener('DOMContentLoaded', function() {
    // Sample deliveries data
    const deliveries = [
        {
            id: "DEL-2024-001",
            poNumber: "PO-2024-032",
            supplier: "ABC Building Supplies",
            trackingNumber: "1Z999AA10123456784",
            carrier: "UPS",
            estimatedDelivery: "2024-07-15",
            items: [
                { name: "Portland Cement", quantity: 50, unit: "Bags" },
                { name: "Sand", quantity: 30, unit: "Bags" }
            ],
            status: "In Transit",
            trackingHistory: [
                { date: "2024-07-01 09:30", location: "Supplier Facility", description: "Order processed", status: "Ordered" },
                { date: "2024-07-03 14:20", location: "Supplier Warehouse", description: "Shipment prepared", status: "Shipped" },
                { date: "2024-07-05 08:45", location: "Regional Distribution Center", description: "Shipment in transit", status: "In Transit" }
            ]
        },
        {
            id: "DEL-2024-002",
            poNumber: "PO-2024-028",
            supplier: "Steel Works Inc.",
            trackingNumber: "7891234560",
            carrier: "FedEx",
            estimatedDelivery: "2024-07-12",
            items: [
                { name: "Steel Rebar (10mm)", quantity: 20, unit: "Bundles" }
            ],
            status: "Shipped",
            trackingHistory: [
                { date: "2024-06-28 11:15", location: "Supplier Facility", description: "Order processed", status: "Ordered" },
                { date: "2024-07-01 16:40", location: "Steel Works Warehouse", description: "Shipment prepared and ready for pickup", status: "Shipped" }
            ]
        },
        {
            id: "DEL-2024-003",
            poNumber: "PO-2024-022",
            supplier: "Metro Paints",
            trackingNumber: "MP-56789",
            carrier: "Metro Delivery",
            estimatedDelivery: "2024-07-08",
            items: [
                { name: "Interior Paint (White)", quantity: 15, unit: "5-Gallon Buckets" },
                { name: "Paint Brushes", quantity: 25, unit: "Each" },
                { name: "Painter's Tape", quantity: 30, unit: "Rolls" }
            ],
            status: "Delivered",
            trackingHistory: [
                { date: "2024-06-20 10:20", location: "Metro Paints HQ", description: "Order processed", status: "Ordered" },
                { date: "2024-06-22 09:15", location: "Metro Paints Warehouse", description: "Shipment prepared", status: "Shipped" },
                { date: "2024-06-24 14:30", location: "Local Distribution Center", description: "Shipment received at local hub", status: "In Transit" },
                { date: "2024-06-25 08:10", location: "Delivery Vehicle", description: "Out for delivery", status: "Out for Delivery" },
                { date: "2024-06-25 14:45", location: "Project Site", description: "Delivered and signed for by John Smith", status: "Delivered" }
            ]
        },
        {
            id: "DEL-2024-004",
            poNumber: "PO-2024-026",
            supplier: "Electrical Supplies Co.",
            trackingNumber: "ESC20248976",
            carrier: "DHL",
            estimatedDelivery: "2024-07-10",
            items: [
                { name: "Electrical Conduit", quantity: 10, unit: "Bundles" },
                { name: "Circuit Breakers", quantity: 5, unit: "Each" },
                { name: "Electrical Wiring", quantity: 200, unit: "Meters" }
            ],
            status: "Delayed",
            trackingHistory: [
                { date: "2024-06-25 13:10", location: "Supplier Facility", description: "Order processed", status: "Ordered" },
                { date: "2024-06-28 11:30", location: "Supplier Warehouse", description: "Shipment prepared", status: "Shipped" },
                { date: "2024-06-30 09:45", location: "Regional Distribution Center", description: "Shipment in transit", status: "In Transit" },
                { date: "2024-07-02 16:20", location: "Regional Hub", description: "Shipping delay due to weather conditions", status: "Delayed" }
            ]
        },
        {
            id: "DEL-2024-005",
            poNumber: "PO-2024-033",
            supplier: "ABC Building Supplies",
            trackingNumber: "1Z999AA10123456791",
            carrier: "UPS",
            estimatedDelivery: "2024-07-16",
            items: [
                { name: "Plywood Sheets (3/4\")", quantity: 30, unit: "Sheets" }
            ],
            status: "Ordered",
            trackingHistory: [
                { date: "2024-07-02 15:45", location: "ABC Building Supplies", description: "Order processed", status: "Ordered" }
            ]
        },
        {
            id: "DEL-2024-006",
            poNumber: "PO-2024-024",
            supplier: "Plumbing Pro",
            trackingNumber: "PP-456-789-123",
            carrier: "Plumbing Pro Logistics",
            estimatedDelivery: "2024-07-07",
            items: [
                { name: "Copper Pipes (1/2\")", quantity: 15, unit: "Bundles" },
                { name: "PVC Fittings", quantity: 50, unit: "Each" }
            ],
            status: "Out for Delivery",
            trackingHistory: [
                { date: "2024-06-22 11:20", location: "Plumbing Pro HQ", description: "Order processed", status: "Ordered" },
                { date: "2024-06-24 09:15", location: "Plumbing Pro Warehouse", description: "Shipment prepared", status: "Shipped" },
                { date: "2024-06-27 14:30", location: "Local Distribution Center", description: "Shipment received at local hub", status: "In Transit" },
                { date: "2024-07-05 08:45", location: "Delivery Vehicle", description: "Out for delivery", status: "Out for Delivery" }
            ]
        }
    ];
    
    // DOM element references
    const deliveriesTableBody = document.getElementById('deliveries-table-body');
    const searchBtn = document.getElementById('search-btn');
    const deliveryDetailsModal = document.getElementById('deliveryDetailsModal');
    const closeDeliveryDetailsModal = document.getElementById('closeDeliveryDetailsModal');
    const updateTrackingModal = document.getElementById('updateTrackingModal');
    const closeUpdateTrackingModal = document.getElementById('closeUpdateTrackingModal');
    const reportIssueModal = document.getElementById('reportIssueModal');
    const closeReportIssueModal = document.getElementById('closeReportIssueModal');
    const updateTrackingForm = document.getElementById('updateTrackingForm');
    const reportIssueForm = document.getElementById('reportIssueForm');
    const cancelUpdateBtn = document.getElementById('cancel-update-btn');
    const cancelIssueBtn = document.getElementById('cancel-issue-btn');
    
    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(deliveries.length / itemsPerPage);
    
    // Update pagination info
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    // Update delivery statistics
    updateDeliveryStats();
    
    // Render deliveries table
    renderDeliveriesTable();
    
    // Event listeners for search button
    searchBtn.addEventListener('click', filterDeliveries);
    
    // Modal close buttons
    closeDeliveryDetailsModal.addEventListener('click', function() {
        deliveryDetailsModal.style.display = 'none';
    });
    
    closeUpdateTrackingModal.addEventListener('click', function() {
        updateTrackingModal.style.display = 'none';
    });
    
    closeReportIssueModal.addEventListener('click', function() {
        reportIssueModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === deliveryDetailsModal) {
            deliveryDetailsModal.style.display = 'none';
        }
        if (event.target === updateTrackingModal) {
            updateTrackingModal.style.display = 'none';
        }
        if (event.target === reportIssueModal) {
            reportIssueModal.style.display = 'none';
        }
    });
    
    // Cancel buttons
    cancelUpdateBtn.addEventListener('click', function() {
        updateTrackingModal.style.display = 'none';
    });
    
    cancelIssueBtn.addEventListener('click', function() {
        reportIssueModal.style.display = 'none';
    });
    
    // Form submissions
    updateTrackingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const deliveryId = document.getElementById('update-delivery-id').value;
        const trackingNumber = document.getElementById('tracking-number').value;
        const carrier = document.getElementById('carrier').value;
        const estimatedDelivery = document.getElementById('est-delivery-date').value;
        const status = document.getElementById('tracking-status').value;
        const notes = document.getElementById('tracking-notes').value;
        
        // Find delivery
        const delivery = deliveries.find(d => d.id === deliveryId);
        if (!delivery) return;
        
        // Update delivery information
        delivery.trackingNumber = trackingNumber;
        delivery.carrier = carrier;
        delivery.estimatedDelivery = estimatedDelivery;
        delivery.status = status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ');
        
        // Add new tracking event
        const newEvent = {
            date: new Date().toISOString().slice(0, 10) + " " + new Date().toTimeString().slice(0, 5),
            location: "System Update",
            description: `Tracking information updated${notes ? ': ' + notes : ''}`,
            status: delivery.status
        };
        
        delivery.trackingHistory.push(newEvent);
        
        // In a real app, this would send data to the server
        alert(`Tracking information for ${deliveryId} has been updated.`);
        
        // Close modal
        updateTrackingModal.style.display = 'none';
        
        // Update UI
        updateDeliveryStats();
        renderDeliveriesTable();
    });
    
    reportIssueForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const deliveryId = document.getElementById('issue-delivery-id').value;
        const issueType = document.getElementById('issue-type').value;
        const issueSeverity = document.getElementById('issue-severity').value;
        const issueDescription = document.getElementById('issue-description').value;
        
        // In a real app, this would send data to the server
        alert(`Issue reported for ${deliveryId}. The supplier will be notified.`);
        
        // Close modal
        reportIssueModal.style.display = 'none';
    });
    
    // Pagination controls
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            document.getElementById('current-page').textContent = currentPage;
            renderDeliveriesTable();
            updatePaginationButtons();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            document.getElementById('current-page').textContent = currentPage;
            renderDeliveriesTable();
            updatePaginationButtons();
        }
    });
    
    // Notify warehouse button in delivery details
    document.getElementById('notify-warehouse-btn').addEventListener('click', function() {
        alert('Warehouse has been notified about this incoming delivery.');
    });
    
    // Report issue button in delivery details
    document.getElementById('report-issue-btn').addEventListener('click', function() {
        const deliveryId = document.getElementById('delivery-details').getAttribute('data-delivery-id');
        openReportIssueModal(deliveryId);
    });
    
    // Functions
    
    // Update delivery statistics
    function updateDeliveryStats() {
        document.getElementById('total-deliveries').textContent = deliveries.length;
        document.getElementById('in-transit').textContent = deliveries.filter(d => d.status === "In Transit").length;
        document.getElementById('delayed').textContent = deliveries.filter(d => d.status === "Delayed").length;
        document.getElementById('delivered').textContent = deliveries.filter(d => d.status === "Delivered").length;
    }
    
    // Render deliveries table
    function renderDeliveriesTable(filteredDeliveries = null) {
        const delsToRender = filteredDeliveries || deliveries;
        deliveriesTableBody.innerHTML = '';
        
        // Calculate start and end indices for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, delsToRender.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const delivery = delsToRender[i];
            const row = document.createElement('tr');
            
            // Format status for display
            const statusClass = delivery.status.toLowerCase().replace(/\s+/g, '-');
            
            row.innerHTML = `
                <td>${delivery.poNumber}</td>
                <td>${delivery.supplier}</td>
                <td>${delivery.trackingNumber}</td>
                <td>${delivery.estimatedDelivery}</td>
                <td>${delivery.items.length} item${delivery.items.length > 1 ? 's' : ''}</td>
                <td>${delivery.carrier}</td>
                <td><span class="status-badge status-${statusClass}">${delivery.status}</span></td>
                <td>
                    <button class="action-btn view-delivery-btn" data-id="${delivery.id}">View</button>
                    <button class="secondary-btn update-tracking-btn" data-id="${delivery.id}">Update</button>
                </td>
            `;
            
            deliveriesTableBody.appendChild(row);
        }
        
        // Add event listeners to buttons
        document.querySelectorAll('.view-delivery-btn').forEach(button => {
            button.addEventListener('click', function() {
                const deliveryId = this.getAttribute('data-id');
                viewDeliveryDetails(deliveryId);
            });
        });
        
        document.querySelectorAll('.update-tracking-btn').forEach(button => {
            button.addEventListener('click', function() {
                const deliveryId = this.getAttribute('data-id');
                openUpdateTrackingModal(deliveryId);
            });
        });
        
        updatePaginationButtons();
    }
    
    // Filter deliveries
    function filterDeliveries() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const statusFilter = document.getElementById('status-filter').value;
        
        let filtered = [...deliveries];
        
        if (searchTerm) {
            filtered = filtered.filter(delivery => 
                delivery.poNumber.toLowerCase().includes(searchTerm) ||
                delivery.trackingNumber.toLowerCase().includes(searchTerm) ||
                delivery.supplier.toLowerCase().includes(searchTerm)
            );
        }
        
        if (statusFilter !== 'all') {
            filtered = filtered.filter(delivery => 
                delivery.status.toLowerCase().replace(/\s+/g, '-') === statusFilter
            );
        }
        
        // Reset pagination for filtered results
        currentPage = 1;
        document.getElementById('current-page').textContent = currentPage;
        
        // Update total pages for filtered results
        const totalFilteredPages = Math.ceil(filtered.length / itemsPerPage) || 1;
        document.getElementById('total-pages').textContent = totalFilteredPages;
        
        renderDeliveriesTable(filtered);
    }
    
    // View delivery details
    function viewDeliveryDetails(deliveryId) {
        const delivery = deliveries.find(d => d.id === deliveryId);
        if (!delivery) return;
        
        const deliveryDetails = document.getElementById('delivery-details');
        deliveryDetails.setAttribute('data-delivery-id', deliveryId);
        
        // Calculate total items
        const totalItems = delivery.items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Generate HTML for delivery details
        let detailsHTML = `
            <div class="delivery-detail-header">
                <h2 class="delivery-id">${delivery.id} - ${delivery.poNumber}</h2>
                <div class="delivery-info-container">
                    <div class="delivery-info-column">
                        <div class="delivery-info-item">
                            <div class="info-label">Supplier</div>
                            <div class="info-value">${delivery.supplier}</div>
                        </div>
                        <div class="delivery-info-item">
                            <div class="info-label">Estimated Delivery</div>
                            <div class="info-value">${delivery.estimatedDelivery}</div>
                        </div>
                        <div class="delivery-info-item">
                            <div class="info-label">Total Items</div>
                            <div class="info-value">${totalItems} across ${delivery.items.length} line${delivery.items.length > 1 ? 's' : ''}</div>
                        </div>
                    </div>
                    <div class="delivery-info-column">
                        <div class="delivery-info-item">
                            <div class="info-label">Carrier</div>
                            <div class="info-value">${delivery.carrier}</div>
                        </div>
                        <div class="delivery-info-item">
                            <div class="info-label">Tracking Number</div>
                            <div class="info-value">${delivery.trackingNumber}</div>
                        </div>
                        <div class="delivery-info-item">
                            <div class="info-label">Current Status</div>
                            <div class="info-value">
                                <span class="status-badge status-${delivery.status.toLowerCase().replace(/\s+/g, '-')}">${delivery.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <h3>Tracking Timeline</h3>
            <div class="tracking-timeline">
        `;
        
        // Sort tracking events by date, most recent first
        const sortedHistory = [...delivery.trackingHistory].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        // Add tracking events
        sortedHistory.forEach((event, index) => {
            detailsHTML += `
                <div class="tracking-event ${index === 0 ? 'active' : ''}">
                    <div class="tracking-date">${event.date}</div>
                    <div class="tracking-location">${event.location}</div>
                    <div class="tracking-description">${event.description}</div>
                </div>
            `;
        });
        
        detailsHTML += `
            </div>
            
            <div class="delivery-items-section">
                <h4>Delivery Items</h4>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        // Add items
        delivery.items.forEach(item => {
            detailsHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unit}</td>
                </tr>
            `;
        });
        
        detailsHTML += `
                    </tbody>
                </table>
            </div>
        `;
        
        deliveryDetails.innerHTML = detailsHTML;
        
        // Show modal
        deliveryDetailsModal.style.display = 'flex';
    }
    
    // Open update tracking modal
    function openUpdateTrackingModal(deliveryId) {
        const delivery = deliveries.find(d => d.id === deliveryId);
        if (!delivery) return;
        
        // Set delivery ID in form
        document.getElementById('update-delivery-id').value = deliveryId;
        
        // Populate form fields
        document.getElementById('tracking-number').value = delivery.trackingNumber;
        
        // Set carrier dropdown
        const carrierSelect = document.getElementById('carrier');
        for (let i = 0; i < carrierSelect.options.length; i++) {
            if (carrierSelect.options[i].value === delivery.carrier.toLowerCase()) {
                carrierSelect.selectedIndex = i;
                break;
            }
        }
        
        // Set delivery date
        document.getElementById('est-delivery-date').value = delivery.estimatedDelivery;
        
        // Set status dropdown
        const statusSelect = document.getElementById('tracking-status');
        for (let i = 0; i < statusSelect.options.length; i++) {
            if (statusSelect.options[i].value === delivery.status.toLowerCase().replace(/\s+/g, '-')) {
                statusSelect.selectedIndex = i;
                break;
            }
        }
        
        document.getElementById('tracking-notes').value = '';
        
        // Show modal
        updateTrackingModal.style.display = 'flex';
    }
    
    // Open report issue modal
    function openReportIssueModal(deliveryId) {
        document.getElementById('issue-delivery-id').value = deliveryId;
        reportIssueForm.reset();
        reportIssueModal.style.display = 'flex';
    }
    
    // Update pagination buttons
    function updatePaginationButtons() {
        document.getElementById('prev-page').disabled = (currentPage === 1);
        document.getElementById('next-page').disabled = (currentPage === parseInt(document.getElementById('total-pages').textContent));
    }
});
