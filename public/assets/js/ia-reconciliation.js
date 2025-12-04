document.addEventListener('DOMContentLoaded', function() {
    // Sample reconciliation data
    const reconciliations = [
        {
            id: "REC-2024-001",
            warehouse: "Warehouse A",
            dateCreated: "2024-07-10",
            itemCount: 12,
            valueAdjustment: "+$1,250.00",
            createdBy: "John Smith",
            status: "Completed",
            notes: "Monthly reconciliation based on physical count.",
            items: [
                {
                    name: "Portland Cement",
                    sku: "MAT-001",
                    systemQty: 250,
                    actualQty: 245,
                    adjustment: -5,
                    unitValue: "$12.50",
                    totalAdjustment: "-$62.50",
                    reason: "Physical count variance"
                },
                {
                    name: "Steel Rebar (10mm)",
                    sku: "MAT-002",
                    systemQty: 120,
                    actualQty: 122,
                    adjustment: 2,
                    unitValue: "$85.00",
                    totalAdjustment: "+$170.00",
                    reason: "Found additional items in storage"
                },
                {
                    name: "Interior Paint (White)",
                    sku: "MAT-003",
                    systemQty: 75,
                    actualQty: 85,
                    adjustment: 10,
                    unitValue: "$120.00",
                    totalAdjustment: "+$1,200.00",
                    reason: "System entry error from last shipment"
                }
            ]
        },
        {
            id: "REC-2024-002",
            warehouse: "Warehouse B",
            dateCreated: "2024-07-08",
            itemCount: 8,
            valueAdjustment: "-$320.00",
            createdBy: "Sarah Johnson",
            status: "Completed",
            notes: "Adjustment after cycle count of electrical supplies."
        },
        {
            id: "REC-2024-003",
            warehouse: "Warehouse C",
            dateCreated: "2024-07-12",
            itemCount: 5,
            valueAdjustment: "+$450.00",
            createdBy: "Michael Brown",
            status: "Approved",
            notes: "Pending implementation in system."
        },
        {
            id: "REC-2024-004",
            warehouse: "Warehouse A",
            dateCreated: "2024-07-14",
            itemCount: 3,
            valueAdjustment: "-$180.00",
            createdBy: "John Smith",
            status: "Pending",
            notes: "Awaiting manager approval."
        },
        {
            id: "REC-2024-005",
            warehouse: "Warehouse B",
            dateCreated: "2024-07-15",
            itemCount: 7,
            valueAdjustment: "+$840.00",
            createdBy: "Sarah Johnson",
            status: "Pending",
            notes: "Corrections after inventory audit."
        }
    ];
    
    // Sample pending discrepancies for reconciliation
    const pendingDiscrepancies = [
        { id: "DISC-001", material: "Cement", location: "Warehouse A, Zone 1", variance: -5 },
        { id: "DISC-004", material: "Plywood Sheets", location: "Warehouse A, Zone 2", variance: -10 },
        { id: "DISC-007", material: "Safety Helmets", location: "Warehouse A, Zone 3", variance: -3 }
    ];

    // Update reconciliation stats
    function updateStats() {
        document.getElementById('total-reconciliations').textContent = reconciliations.length;
        
        const pendingCount = reconciliations.filter(r => r.status === "Pending").length;
        const approvedCount = reconciliations.filter(r => r.status === "Approved").length;
        const completedCount = reconciliations.filter(r => r.status === "Completed").length;
        
        document.getElementById('pending-reconciliations').textContent = pendingCount;
        document.getElementById('approved-reconciliations').textContent = approvedCount;
        document.getElementById('completed-reconciliations').textContent = completedCount;
    }

    // Render reconciliations table
    function renderReconciliations(filteredReconciliations = null) {
        const reconciliationsToRender = filteredReconciliations || reconciliations;
        const tableBody = document.getElementById('reconciliation-table-body');
        tableBody.innerHTML = '';
        
        reconciliationsToRender.forEach(rec => {
            const tr = document.createElement('tr');
            
            // Determine value adjustment class
            const valueClass = rec.valueAdjustment.startsWith('+') ? 'value-positive' : 
                               rec.valueAdjustment.startsWith('-') ? 'value-negative' : '';
            
            tr.innerHTML = `
                <td>${rec.id}</td>
                <td>${rec.warehouse}</td>
                <td>${rec.dateCreated}</td>
                <td>${rec.itemCount}</td>
                <td class="${valueClass}">${rec.valueAdjustment}</td>
                <td>${rec.createdBy}</td>
                <td><span class="status-${rec.status.toLowerCase()}">${rec.status}</span></td>
                <td><button class="audit-action" data-id="${rec.id}">View</button></td>
            `;
            tableBody.appendChild(tr);
        });
        
        // Add click event to buttons
        document.querySelectorAll('.audit-action').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                showReconciliationDetails(id);
            });
        });
    }

    // Filter reconciliations
    function filterReconciliations() {
        const warehouse = document.getElementById('warehouse-filter').value;
        const status = document.getElementById('status-filter').value;
        
        let filtered = [...reconciliations];
        
        if (warehouse !== 'all') {
            filtered = filtered.filter(rec => 
                rec.warehouse.toLowerCase().includes(`warehouse ${warehouse}`));
        }
        
        if (status !== 'all') {
            filtered = filtered.filter(rec => 
                rec.status.toLowerCase() === status);
        }
        
        renderReconciliations(filtered);
    }

    // Show reconciliation details in modal
    function showReconciliationDetails(reconciliationId) {
        const reconciliation = reconciliations.find(r => r.id === reconciliationId);
        if (!reconciliation) return;
        
        const detailsElement = document.getElementById('reconciliation-details');
        const valueClass = reconciliation.valueAdjustment.startsWith('+') ? 'value-positive' : 
                          reconciliation.valueAdjustment.startsWith('-') ? 'value-negative' : '';
        
        // Build header info
        let detailsHTML = `
            <div class="reconciliation-detail-header">
                <div class="reconciliation-detail-info">
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">ID</div>
                        <div class="report-detail-info-value">${reconciliation.id}</div>
                    </div>
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">Warehouse</div>
                        <div class="report-detail-info-value">${reconciliation.warehouse}</div>
                    </div>
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">Date Created</div>
                        <div class="report-detail-info-value">${reconciliation.dateCreated}</div>
                    </div>
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">Created By</div>
                        <div class="report-detail-info-value">${reconciliation.createdBy}</div>
                    </div>
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">Status</div>
                        <div class="report-detail-info-value">
                            <span class="status-${reconciliation.status.toLowerCase()}">${reconciliation.status}</span>
                        </div>
                    </div>
                    <div class="report-detail-info-item">
                        <div class="report-detail-info-label">Total Adjustment</div>
                        <div class="report-detail-info-value ${valueClass}">${reconciliation.valueAdjustment}</div>
                    </div>
                </div>
                
                <div class="reconciliation-notes">
                    <strong>Notes:</strong> ${reconciliation.notes || 'No notes provided.'}
                </div>
            </div>
        `;
        
        // Add reconciliation items if available
        if (reconciliation.items && reconciliation.items.length > 0) {
            detailsHTML += `
                <h4>Reconciliation Items</h4>
                <div class="reconciliation-item-list">
            `;
            
            reconciliation.items.forEach(item => {
                const adjustmentClass = item.adjustment > 0 ? 'value-positive' : 
                                       item.adjustment < 0 ? 'value-negative' : '';
                
                detailsHTML += `
                    <div class="reconciliation-item">
                        <div class="reconciliation-item-header">
                            <div class="reconciliation-item-name">${item.name}</div>
                            <div class="reconciliation-item-sku">${item.sku}</div>
                        </div>
                        <div class="reconciliation-item-detail">
                            <div>
                                <div class="detail-label">System Quantity</div>
                                <div class="detail-value">${item.systemQty}</div>
                            </div>
                            <div>
                                <div class="detail-label">Actual Quantity</div>
                                <div class="detail-value">${item.actualQty}</div>
                            </div>
                            <div>
                                <div class="detail-label">Adjustment</div>
                                <div class="detail-value ${adjustmentClass}">${item.adjustment > 0 ? '+' : ''}${item.adjustment}</div>
                            </div>
                            <div>
                                <div class="detail-label">Unit Value</div>
                                <div class="detail-value">${item.unitValue}</div>
                            </div>
                            <div>
                                <div class="detail-label">Total Adjustment</div>
                                <div class="detail-value ${item.totalAdjustment.startsWith('+') ? 'value-positive' : 'value-negative'}">${item.totalAdjustment}</div>
                            </div>
                        </div>
                        <div class="reconciliation-item-reason">
                            <strong>Reason:</strong> ${item.reason}
                        </div>
                    </div>
                `;
            });
            
            detailsHTML += `</div>`;
        } else {
            detailsHTML += `<p class="no-items-message">No detailed items available for this reconciliation.</p>`;
        }
        
        detailsElement.innerHTML = detailsHTML;
        
        // Configure buttons based on status
        const approveBtn = document.getElementById('approve-btn');
        const rejectBtn = document.getElementById('reject-btn');
        
        approveBtn.dataset.id = reconciliationId;
        rejectBtn.dataset.id = reconciliationId;
        
        if (reconciliation.status === "Pending") {
            approveBtn.style.display = "block";
            rejectBtn.style.display = "block";
        } else {
            approveBtn.style.display = "none";
            rejectBtn.style.display = "none";
        }
        
        document.getElementById('reconciliationModal').style.display = 'flex';
    }

    // Populate discrepancies for reconciliation
    function populateDiscrepancies() {
        const checkboxList = document.getElementById('discrepancy-checkbox-list');
        checkboxList.innerHTML = '';
        
        pendingDiscrepancies.forEach(disc => {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';
            
            const varianceClass = disc.variance < 0 ? 'value-negative' : 'value-positive';
            const varianceSign = disc.variance > 0 ? '+' : '';
            
            checkboxItem.innerHTML = `
                <label>
                    <input type="checkbox" name="discrepancy" value="${disc.id}">
                    <span>${disc.id}: ${disc.material} - ${disc.location} <span class="${varianceClass}">(${varianceSign}${disc.variance})</span></span>
                </label>
            `;
            
            checkboxList.appendChild(checkboxItem);
        });
    }

    // Initialize page
    updateStats();
    renderReconciliations();
    populateDiscrepancies();

    // Event Listeners
    document.getElementById('filter-btn').addEventListener('click', filterReconciliations);
    
    // New reconciliation button
    document.getElementById('new-reconciliation-btn').addEventListener('click', function() {
        document.getElementById('newReconciliationModal').style.display = 'flex';
    });
    
    // Reconciliation type change
    document.getElementById('rec-type').addEventListener('change', function() {
        const discrepancySelection = document.getElementById('discrepancy-selection');
        if (this.value === 'Discrepancy Resolution') {
            discrepancySelection.style.display = 'block';
        } else {
            discrepancySelection.style.display = 'none';
        }
    });
    
    // New reconciliation form submit
    document.getElementById('newReconciliationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const warehouse = document.getElementById('rec-warehouse').value;
        const reconciliationType = document.getElementById('rec-type').value;
        const notes = document.getElementById('rec-notes').value;
        
        // Get selected discrepancies if applicable
        let selectedDiscrepancies = [];
        if (reconciliationType === 'Discrepancy Resolution') {
            document.querySelectorAll('input[name="discrepancy"]:checked').forEach(checkbox => {
                selectedDiscrepancies.push(checkbox.value);
            });
        }
        
        // In a real app, this would send the data to the server
        alert(`Creating a new ${reconciliationType} reconciliation for ${warehouse} with ${selectedDiscrepancies.length} discrepancies.`);
        
        // Close modal and reset form
        document.getElementById('newReconciliationModal').style.display = 'none';
        this.reset();
        document.getElementById('discrepancy-selection').style.display = 'none';
    });
    
    // Approve button
    document.getElementById('approve-btn').addEventListener('click', function() {
        const reconciliationId = this.dataset.id;
        const reconciliation = reconciliations.find(r => r.id === reconciliationId);
        
        if (reconciliation) {
            reconciliation.status = "Approved";
            updateStats();
            renderReconciliations();
            document.getElementById('reconciliationModal').style.display = 'none';
            alert(`Reconciliation ${reconciliationId} has been approved.`);
        }
    });
    
    // Reject button
    document.getElementById('reject-btn').addEventListener('click', function() {
        const reconciliationId = this.dataset.id;
        document.getElementById('reconciliationModal').style.display = 'none';
        document.getElementById('rejectForm').dataset.id = reconciliationId;
        document.getElementById('rejectModal').style.display = 'flex';
    });
    
    // Reject form submit
    document.getElementById('rejectForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const reconciliationId = this.dataset.id;
        const reason = document.getElementById('rejection-reason').value;
        const reconciliation = reconciliations.find(r => r.id === reconciliationId);
        
        if (reconciliation) {
            reconciliation.status = "Rejected";
            reconciliation.rejectionReason = reason;
            updateStats();
            renderReconciliations();
            document.getElementById('rejectModal').style.display = 'none';
            alert(`Reconciliation ${reconciliationId} has been rejected.`);
            this.reset();
        }
    });
    
    // Print button
    document.getElementById('print-btn').addEventListener('click', function() {
        window.print();
    });

    // Close modal buttons
    document.getElementById('closeReconciliationModal').addEventListener('click', function() {
        document.getElementById('reconciliationModal').style.display = 'none';
    });
    
    document.getElementById('closeNewReconciliationModal').addEventListener('click', function() {
        document.getElementById('newReconciliationModal').style.display = 'none';
    });
    
    document.getElementById('closeRejectModal').addEventListener('click', function() {
        document.getElementById('rejectModal').style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const reconciliationModal = document.getElementById('reconciliationModal');
        const newReconciliationModal = document.getElementById('newReconciliationModal');
        const rejectModal = document.getElementById('rejectModal');
        
        if (event.target === reconciliationModal) {
            reconciliationModal.style.display = 'none';
        }
        if (event.target === newReconciliationModal) {
            newReconciliationModal.style.display = 'none';
        }
        if (event.target === rejectModal) {
            rejectModal.style.display = 'none';
        }
    });
});
