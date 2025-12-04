document.addEventListener('DOMContentLoaded', function() {
    // Sample requisitions data - Update to have more "New" status items
    const requisitions = [
        {
            id: "REQ-2024-001",
            department: "Construction",
            requestor: "John Smith",
            dateCreated: "2024-07-01",
            requiredBy: "2024-07-15",
            items: [
                { name: "Portland Cement", quantity: 50, unit: "Bags", estimatedPrice: 12.50 },
                { name: "Steel Rebar (10mm)", quantity: 20, unit: "Bundles", estimatedPrice: 85.00 }
            ],
            priority: "High",
            status: "New", // New status - shows Process button
            notes: "Urgent materials needed for Project XYZ foundation work.",
            activityLog: [
                { date: "2024-07-01 09:15", actor: "John Smith", action: "Created requisition", description: "Initial requisition created for Project XYZ materials." }
            ]
        },
        {
            id: "REQ-2024-002",
            department: "Maintenance",
            requestor: "Sarah Johnson",
            dateCreated: "2024-06-28",
            requiredBy: "2024-07-20",
            items: [
                { name: "Interior Paint (White)", quantity: 15, unit: "5-Gallon Buckets", estimatedPrice: 120.00 },
                { name: "Paint Brushes", quantity: 25, unit: "Each", estimatedPrice: 8.50 },
                { name: "Painter's Tape", quantity: 30, unit: "Rolls", estimatedPrice: 4.25 }
            ],
            priority: "Medium",
            status: "In Progress", // In Progress status - no Process button
            notes: "Materials for office repaint project.",
            activityLog: [
                { date: "2024-06-28 14:20", actor: "Sarah Johnson", action: "Created requisition", description: "Initial requisition created for office repaint project." },
                { date: "2024-07-01 10:45", actor: "Michael Brown", action: "Started processing", description: "Started sourcing materials from approved suppliers." }
            ]
        },
        {
            id: "REQ-2024-003",
            department: "Facilities",
            requestor: "David Lee",
            dateCreated: "2024-06-25",
            requiredBy: "2024-07-10",
            items: [
                { name: "Electrical Conduit", quantity: 10, unit: "Bundles", estimatedPrice: 45.00 },
                { name: "Circuit Breakers", quantity: 5, unit: "Each", estimatedPrice: 65.00 },
                { name: "Electrical Wiring", quantity: 200, unit: "Meters", estimatedPrice: 2.00 }
            ],
            priority: "Low",
            status: "Approved", // Approved status - no Process button
            notes: "Materials for electrical upgrade in Building B.",
            activityLog: [
                { date: "2024-06-25 08:30", actor: "David Lee", action: "Created requisition", description: "Initial requisition created for electrical upgrades." },
                { date: "2024-06-26 11:20", actor: "Michael Brown", action: "Started processing", description: "Checking inventory and supplier availability." },
                { date: "2024-07-02 09:40", actor: "Michael Brown", action: "Approved requisition", description: "Approved and created PO-2024-039 for items." }
            ]
        },
        {
            id: "REQ-2024-004",
            department: "Construction",
            requestor: "Emily Wilson",
            dateCreated: "2024-06-20",
            requiredBy: "2024-06-30",
            items: [
                { name: "Copper Pipes (1/2\")", quantity: 15, unit: "Bundles", estimatedPrice: 210.00 },
                { name: "PVC Fittings", quantity: 50, unit: "Each", estimatedPrice: 6.30 }
            ],
            priority: "High",
            status: "Completed", // Completed status - no Process button
            notes: "Urgent plumbing materials for Project ABC.",
            activityLog: [
                { date: "2024-06-20 13:15", actor: "Emily Wilson", action: "Created requisition", description: "Initial requisition created for plumbing materials." },
                { date: "2024-06-21 09:30", actor: "Michael Brown", action: "Started processing", description: "Sourcing materials from approved suppliers." },
                { date: "2024-06-22 14:20", actor: "Michael Brown", action: "Approved requisition", description: "Approved and created PO-2024-035 for items." },
                { date: "2024-06-28 10:45", actor: "Alex Turner", action: "Completed requisition", description: "All materials delivered and requisition fulfilled." }
            ]
        },
        {
            id: "REQ-2024-005",
            department: "Office",
            requestor: "Robert Taylor",
            dateCreated: "2024-06-15",
            requiredBy: "2024-07-01",
            items: [
                { name: "Office Chairs", quantity: 10, unit: "Each", estimatedPrice: 150.00 },
                { name: "Desks", quantity: 5, unit: "Each", estimatedPrice: 280.00 },
                { name: "Filing Cabinets", quantity: 3, unit: "Each", estimatedPrice: 120.00 }
            ],
            priority: "Medium",
            status: "Rejected", // Rejected status - no Process button
            notes: "New furniture for expanded office area.",
            activityLog: [
                { date: "2024-06-15 11:20", actor: "Robert Taylor", action: "Created requisition", description: "Initial requisition created for office furniture." },
                { date: "2024-06-16 14:30", actor: "Michael Brown", action: "Started processing", description: "Reviewing budget allocation for furniture." },
                { date: "2024-06-18 09:15", actor: "Michael Brown", action: "Rejected requisition", description: "Rejected due to budget constraints. Suggested to reduce quantities or choose more economical options." }
            ]
        },
        // Add two more requisitions with "New" status to show more Process buttons
        {
            id: "REQ-2024-006",
            department: "Construction",
            requestor: "Mark Johnson",
            dateCreated: "2024-07-03",
            requiredBy: "2024-07-20",
            items: [
                { name: "Plywood Sheets (3/4\")", quantity: 30, unit: "Sheets", estimatedPrice: 32.50 },
                { name: "Wood Screws", quantity: 10, unit: "Boxes", estimatedPrice: 15.00 }
            ],
            priority: "Medium",
            status: "New", // New status - shows Process button
            notes: "Materials for Project DEF carpentry work.",
            activityLog: [
                { date: "2024-07-03 13:45", actor: "Mark Johnson", action: "Created requisition", description: "Initial requisition created for carpentry materials." }
            ]
        },
        {
            id: "REQ-2024-007",
            department: "Maintenance",
            requestor: "Lisa Chen",
            dateCreated: "2024-07-02",
            requiredBy: "2024-07-25",
            items: [
                { name: "Safety Gloves", quantity: 50, unit: "Pairs", estimatedPrice: 8.50 },
                { name: "Hard Hats", quantity: 15, unit: "Each", estimatedPrice: 22.00 },
                { name: "Safety Goggles", quantity: 30, unit: "Each", estimatedPrice: 12.75 }
            ],
            priority: "Low",
            status: "New", // New status - shows Process button
            notes: "Safety equipment replenishment for maintenance team.",
            activityLog: [
                { date: "2024-07-02 10:20", actor: "Lisa Chen", action: "Created requisition", description: "Initial requisition created for safety equipment." }
            ]
        }
    ];
    
    // Sample suppliers for dropdown
    const suppliers = [
        "ABC Building Supplies",
        "Steel Works Inc.",
        "Metro Paints",
        "Electrical Supplies Co.",
        "Plumbing Pro",
        "Office Furniture Plus"
    ];
    
    // DOM element references
    const requisitionsTableBody = document.getElementById('requisitions-table-body');
    const searchBtn = document.getElementById('search-btn');
    const viewRequisitionModal = document.getElementById('viewRequisitionModal');
    const processRequisitionModal = document.getElementById('processRequisitionModal');
    const rejectRequisitionModal = document.getElementById('rejectRequisitionModal');
    const closeViewRequisitionModal = document.getElementById('closeViewRequisitionModal');
    const closeProcessModal = document.getElementById('closeProcessModal');
    const closeRejectModal = document.getElementById('closeRejectModal');
    const processRequisitionForm = document.getElementById('processRequisitionForm');
    const rejectRequisitionForm = document.getElementById('rejectRequisitionForm');
    const cancelProcessBtn = document.getElementById('cancel-process-btn');
    const cancelRejectBtn = document.getElementById('cancel-reject-btn');
    const rejectReqBtn = document.getElementById('reject-req-btn');
    
    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(requisitions.length / itemsPerPage);
    
    // Update pagination info
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    // Update requisition statistics
    updateRequisitionStats();
    
    // Populate requisitions table
    renderRequisitionsTable();
    
    // Search button click handler
    searchBtn.addEventListener('click', filterRequisitions);
    
    // Modal close buttons
    closeViewRequisitionModal.addEventListener('click', function() {
        viewRequisitionModal.style.display = 'none';
    });
    
    closeProcessModal.addEventListener('click', function() {
        processRequisitionModal.style.display = 'none';
    });
    
    closeRejectModal.addEventListener('click', function() {
        rejectRequisitionModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === viewRequisitionModal) {
            viewRequisitionModal.style.display = 'none';
        }
        if (event.target === processRequisitionModal) {
            processRequisitionModal.style.display = 'none';
        }
        if (event.target === rejectRequisitionModal) {
            rejectRequisitionModal.style.display = 'none';
        }
    });
    
    // Cancel process form
    cancelProcessBtn.addEventListener('click', function() {
        processRequisitionModal.style.display = 'none';
    });
    
    // Cancel reject form
    cancelRejectBtn.addEventListener('click', function() {
        rejectRequisitionModal.style.display = 'none';
    });
    
    // Reject button in process modal
    rejectReqBtn.addEventListener('click', function() {
        const reqId = document.getElementById('req-id').value;
        processRequisitionModal.style.display = 'none';
        openRejectModal(reqId);
    });
    
    // Process requisition form submission
    processRequisitionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const reqId = document.getElementById('req-id').value;
        const fulfillmentOption = document.querySelector('input[name="fulfillment-option"]:checked').value;
        const supplier = document.getElementById('supplier-select').value;
        const expectedDelivery = document.getElementById('expected-delivery').value;
        const notes = document.getElementById('processing-notes').value;
        
        // Find requisition
        const requisition = requisitions.find(r => r.id === reqId);
        if (!requisition) return;
        
        // Update requisition status
        requisition.status = "Approved";
        
        // Add to activity log
        requisition.activityLog.push({
            date: new Date().toISOString().slice(0, 10) + " " + new Date().toTimeString().slice(0, 5),
            actor: "Michael Brown", // In a real app, this would be the logged-in user
            action: "Approved requisition",
            description: `Approved and ${fulfillmentOption === 'create-po' ? 'created purchase order' : 'processed'} for items. ${notes}`
        });
        
        // In a real app, this would send data to the server
        alert(`Requisition ${reqId} has been approved and is being processed.`);
        
        // Close modal
        processRequisitionModal.style.display = 'none';
        
        // Update UI
        updateRequisitionStats();
        renderRequisitionsTable();
    });
    
    // Reject requisition form submission
    rejectRequisitionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const reqId = document.getElementById('reject-req-id').value;
        const reason = document.getElementById('rejection-reason').value;
        const notes = document.getElementById('rejection-notes').value;
        
        // Find requisition
        const requisition = requisitions.find(r => r.id === reqId);
        if (!requisition) return;
        
        // Update requisition status
        requisition.status = "Rejected";
        
        // Add to activity log
        requisition.activityLog.push({
            date: new Date().toISOString().slice(0, 10) + " " + new Date().toTimeString().slice(0, 5),
            actor: "Michael Brown", // In a real app, this would be the logged-in user
            action: "Rejected requisition",
            description: `Rejected due to ${reason}. ${notes}`
        });
        
        // In a real app, this would send data to the server
        alert(`Requisition ${reqId} has been rejected.`);
        
        // Close modal
        rejectRequisitionModal.style.display = 'none';
        
        // Update UI
        updateRequisitionStats();
        renderRequisitionsTable();
    });
    
    // Pagination controls
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            document.getElementById('current-page').textContent = currentPage;
            renderRequisitionsTable();
            updatePaginationButtons();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            document.getElementById('current-page').textContent = currentPage;
            renderRequisitionsTable();
            updatePaginationButtons();
        }
    });
    
    // Functions
    
    // Update requisition statistics
    function updateRequisitionStats() {
        document.getElementById('total-requisitions').textContent = requisitions.length;
        document.getElementById('new-requisitions').textContent = requisitions.filter(r => r.status === "New").length;
        document.getElementById('in-progress-requisitions').textContent = requisitions.filter(r => r.status === "In Progress").length;
        document.getElementById('completed-requisitions').textContent = requisitions.filter(r => r.status === "Completed").length;
    }
    
    // Render requisitions table
    function renderRequisitionsTable(filteredRequisitions = null) {
        const reqsToRender = filteredRequisitions || requisitions;
        requisitionsTableBody.innerHTML = '';
        
        // Calculate start and end indices for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, reqsToRender.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const req = reqsToRender[i];
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${req.id}</td>
                <td>${req.department}</td>
                <td>${req.requestor}</td>
                <td>${req.dateCreated}</td>
                <td>${req.requiredBy}</td>
                <td>${req.items.length} item${req.items.length > 1 ? 's' : ''}</td>
                <td><span class="priority-badge priority-${req.priority.toLowerCase()}">${req.priority}</span></td>
                <td><span class="status-badge status-${req.status.toLowerCase().replace(/\s+/g, '-')}">${req.status}</span></td>
                <td>
                    <button class="action-btn view-req-btn" data-id="${req.id}">View</button>
                    ${req.status === "New" ? `<button class="secondary-btn process-req-btn" data-id="${req.id}">Process</button>` : ''}
                </td>
            `;
            
            requisitionsTableBody.appendChild(row);
        }
        
        // Add event listeners to buttons
        document.querySelectorAll('.view-req-btn').forEach(button => {
            button.addEventListener('click', function() {
                const reqId = this.getAttribute('data-id');
                viewRequisition(reqId);
            });
        });
        
        document.querySelectorAll('.process-req-btn').forEach(button => {
            button.addEventListener('click', function() {
                const reqId = this.getAttribute('data-id');
                openProcessModal(reqId);
            });
        });
        
        updatePaginationButtons();
    }
    
    // Filter requisitions
    function filterRequisitions() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const statusFilter = document.getElementById('status-filter').value;
        const departmentFilter = document.getElementById('department-filter').value;
        
        let filtered = [...requisitions];
        
        if (searchTerm) {
            filtered = filtered.filter(req => 
                req.id.toLowerCase().includes(searchTerm) ||
                req.requestor.toLowerCase().includes(searchTerm) ||
                req.items.some(item => item.name.toLowerCase().includes(searchTerm))
            );
        }
        
        if (statusFilter !== 'all') {
            filtered = filtered.filter(req => 
                req.status.toLowerCase().replace(/\s+/g, '-') === statusFilter
            );
        }
        
        if (departmentFilter !== 'all') {
            filtered = filtered.filter(req => 
                req.department.toLowerCase() === departmentFilter
            );
        }
        
        // Reset pagination for filtered results
        currentPage = 1;
        document.getElementById('current-page').textContent = currentPage;
        
        // Update total pages for filtered results
        const totalFilteredPages = Math.ceil(filtered.length / itemsPerPage) || 1;
        document.getElementById('total-pages').textContent = totalFilteredPages;
        
        renderRequisitionsTable(filtered);
    }
    
    // View requisition details
    function viewRequisition(reqId) {
        const req = requisitions.find(r => r.id === reqId);
        if (!req) return;
        
        const reqDetails = document.getElementById('requisition-details');
        const reqActions = document.getElementById('requisition-actions');
        
        // Calculate total estimated value
        const totalEstimatedValue = req.items.reduce((sum, item) => sum + (item.quantity * item.estimatedPrice), 0);
        
        // Generate HTML for requisition details
        let detailsHTML = `
            <div class="requisition-detail-header">
                <div class="requisition-basic-info">
                    <div class="requisition-title">
                        <h2 class="requisition-id">${req.id}</h2>
                        <span class="status-badge status-${req.status.toLowerCase().replace(/\s+/g, '-')}">${req.status}</span>
                    </div>
                    <div class="requisition-detail-list">
                        <div class="requisition-detail-item">
                            <div class="detail-label">Department</div>
                            <div class="detail-value">${req.department}</div>
                        </div>
                        <div class="requisition-detail-item">
                            <div class="detail-label">Requestor</div>
                            <div class="detail-value">${req.requestor}</div>
                        </div>
                        <div class="requisition-detail-item">
                            <div class="detail-label">Date Created</div>
                            <div class="detail-value">${req.dateCreated}</div>
                        </div>
                        <div class="requisition-detail-item">
                            <div class="detail-label">Required By</div>
                            <div class="detail-value">${req.requiredBy}</div>
                        </div>
                        <div class="requisition-detail-item">
                            <div class="detail-label">Priority</div>
                            <div class="detail-value">
                                <span class="priority-badge priority-${req.priority.toLowerCase()}">${req.priority}</span>
                            </div>
                        </div>
                        <div class="requisition-detail-item">
                            <div class="detail-label">Est. Value</div>
                            <div class="detail-value">$${totalEstimatedValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="requisition-section">
                <h4>Notes</h4>
                <p>${req.notes || 'No notes provided.'}</p>
            </div>
            
            <div class="requisition-section">
                <h4>Requested Items</h4>
                <table class="requisition-items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Est. Unit Price</th>
                            <th>Est. Total</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        // Add items
        req.items.forEach(item => {
            const itemTotal = item.quantity * item.estimatedPrice;
            detailsHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unit}</td>
                    <td>$${item.estimatedPrice.toFixed(2)}</td>
                    <td>$${itemTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                </tr>
            `;
        });
        
        detailsHTML += `
                    </tbody>
                </table>
            </div>
            
            <div class="requisition-section">
                <h4>Activity Log</h4>
                <div class="activity-timeline">
        `;
        
        // Add activity log entries
        req.activityLog.forEach(entry => {
            detailsHTML += `
                <div class="timeline-item">
                    <div class="timeline-date">${entry.date}</div>
                    <div class="timeline-content">
                        <div class="timeline-title">${entry.actor} - ${entry.action}</div>
                        <div class="timeline-description">${entry.description}</div>
                    </div>
                </div>
            `;
        });
        
        detailsHTML += `
                </div>
            </div>
        `;
        
        reqDetails.innerHTML = detailsHTML;
        
        // Set action buttons based on requisition status
        reqActions.innerHTML = '';
        
        if (req.status === "New") {
            reqActions.innerHTML = `
                <button id="view-process-req-btn" class="primary-btn">Process</button>
                <button id="view-reject-req-btn" class="danger-btn">Reject</button>
            `;
            
            // Add event listeners to action buttons
            document.getElementById('view-process-req-btn').addEventListener('click', function() {
                viewRequisitionModal.style.display = 'none';
                openProcessModal(req.id);
            });
            
            document.getElementById('view-reject-req-btn').addEventListener('click', function() {
                viewRequisitionModal.style.display = 'none';
                openRejectModal(req.id);
            });
        } else if (req.status === "In Progress") {
            reqActions.innerHTML = `
                <button id="view-complete-req-btn" class="primary-btn">Complete</button>
                <button id="view-reject-req-btn" class="danger-btn">Reject</button>
            `;
            
            // Add event listeners
            document.getElementById('view-complete-req-btn').addEventListener('click', function() {
                alert(`This would open a form to complete requisition ${req.id}`);
            });
            
            document.getElementById('view-reject-req-btn').addEventListener('click', function() {
                viewRequisitionModal.style.display = 'none';
                openRejectModal(req.id);
            });
        } else if (req.status === "Approved") {
            reqActions.innerHTML = `
                <button id="view-complete-req-btn" class="primary-btn">Complete</button>
            `;
            
            document.getElementById('view-complete-req-btn').addEventListener('click', function() {
                alert(`This would open a form to complete requisition ${req.id}`);
            });
        }
        
        // Show modal
        viewRequisitionModal.style.display = 'flex';
    }
    
    // Open process requisition modal
    function openProcessModal(reqId) {
        const req = requisitions.find(r => r.id === reqId);
        if (!req) return;
        
        // Set requisition ID in form
        document.getElementById('req-id').value = req.id;
        
        // Populate requisition info
        const reqInfoContainer = document.getElementById('process-req-info');
        reqInfoContainer.innerHTML = `
            <div class="info-item">
                <div class="info-label">Requisition ID</div>
                <div class="info-value">${req.id}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Department</div>
                <div class="info-value">${req.department}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Requestor</div>
                <div class="info-value">${req.requestor}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Required By</div>
                <div class="info-value">${req.requiredBy}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Priority</div>
                <div class="info-value">
                    <span class="priority-badge priority-${req.priority.toLowerCase()}">${req.priority}</span>
                </div>
            </div>
        `;
        
        // Populate requested items
        const requestedItems = document.getElementById('requested-items');
        requestedItems.innerHTML = `
            <table class="requisition-items-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Est. Unit Price</th>
                        <th>Est. Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${req.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${item.unit}</td>
                            <td>$${item.estimatedPrice.toFixed(2)}</td>
                            <td>$${(item.quantity * item.estimatedPrice).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        // Populate supplier dropdown
        const supplierSelect = document.getElementById('supplier-select');
        supplierSelect.innerHTML = '<option value="">Choose supplier</option>';
        
        suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier;
            option.textContent = supplier;
            supplierSelect.appendChild(option);
        });
        
        // Set default delivery date to 7 days from now
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7);
        document.getElementById('expected-delivery').valueAsDate = deliveryDate;
        
        // Show modal
        processRequisitionModal.style.display = 'flex';
    }
    
    // Open reject requisition modal
    function openRejectModal(reqId) {
        document.getElementById('reject-req-id').value = reqId;
        rejectRequisitionForm.reset();
        rejectRequisitionModal.style.display = 'flex';
    }
    
    // Update pagination buttons
    function updatePaginationButtons() {
        document.getElementById('prev-page').disabled = (currentPage === 1);
        document.getElementById('next-page').disabled = (currentPage === parseInt(document.getElementById('total-pages').textContent));
    }
});
