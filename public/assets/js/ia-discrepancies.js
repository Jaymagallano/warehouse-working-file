document.addEventListener('DOMContentLoaded', function() {
    // Sample discrepancies data
    let discrepancies = [
        {
            id: "DISC-001",
            material: "Cement",
            location: "Warehouse A, Zone 1",
            systemCount: 200,
            physicalCount: 195,
            variance: -5,
            dateFound: "2024-07-10",
            audit: "AUD-2024-004",
            status: "Pending",
            notes: "Discrepancy found during monthly cycle count."
        },
        {
            id: "DISC-002",
            material: "Steel Rebar (10mm)",
            location: "Warehouse B, Zone 2",
            systemCount: 150,
            physicalCount: 152,
            variance: 2,
            dateFound: "2024-07-08",
            audit: "AUD-2024-003",
            status: "Resolved",
            notes: "Extra items found in adjacent storage area.",
            resolution: {
                type: "found",
                notes: "Items were misplaced in Zone 3, inventory adjusted.",
                adjustedCount: 152,
                resolvedBy: "John Smith",
                resolvedDate: "2024-07-11"
            }
        },
        {
            id: "DISC-003",
            material: "Paint (White)",
            location: "Warehouse C, Zone 3",
            systemCount: 75,
            physicalCount: 72,
            variance: -3,
            dateFound: "2024-07-09",
            audit: "AUD-2024-005",
            status: "Investigating",
            notes: "Checking records for recent shipments."
        },
        {
            id: "DISC-004",
            material: "Plywood Sheets",
            location: "Warehouse A, Zone 2",
            systemCount: 120,
            physicalCount: 110,
            variance: -10,
            dateFound: "2024-07-05",
            audit: "AUD-2024-002",
            status: "Pending",
            notes: "Significant variance found."
        },
        {
            id: "DISC-005",
            material: "Electrical Conduit",
            location: "Warehouse B, Zone 1",
            systemCount: 300,
            physicalCount: 285,
            variance: -15,
            dateFound: "2024-07-03",
            audit: "AUD-2024-001",
            status: "Resolved",
            notes: "Large variance requires investigation.",
            resolution: {
                type: "adjustment",
                notes: "System error during last shipment. Quantities were not properly deducted.",
                adjustedCount: 285,
                resolvedBy: "Sarah Johnson",
                resolvedDate: "2024-07-07"
            }
        },
        {
            id: "DISC-006",
            material: "Insulation Material",
            location: "Warehouse C, Zone 2",
            systemCount: 50,
            physicalCount: 52,
            variance: 2,
            dateFound: "2024-07-02",
            audit: "AUD-2024-001",
            status: "Resolved",
            notes: "Minor variance.",
            resolution: {
                type: "error",
                notes: "Counting error during last audit.",
                adjustedCount: 52,
                resolvedBy: "Michael Brown",
                resolvedDate: "2024-07-05"
            }
        },
        {
            id: "DISC-007",
            material: "Safety Helmets",
            location: "Warehouse A, Zone 3",
            systemCount: 40,
            physicalCount: 37,
            variance: -3,
            dateFound: "2024-07-01",
            audit: "AUD-2024-001",
            status: "Investigating",
            notes: "Missing safety equipment needs follow-up."
        }
    ];

    // Update stats
    function updateStats() {
        document.getElementById('total-discrepancies').textContent = discrepancies.length;
        
        const pendingCount = discrepancies.filter(d => d.status === "Pending").length;
        const investigatingCount = discrepancies.filter(d => d.status === "Investigating").length;
        const resolvedCount = discrepancies.filter(d => d.status === "Resolved").length;
        
        document.getElementById('pending-discrepancies').textContent = pendingCount;
        document.getElementById('investigating-discrepancies').textContent = investigatingCount;
        document.getElementById('resolved-discrepancies').textContent = resolvedCount;
    }

    // Render discrepancy table
    function renderDiscrepancies(filteredDiscrepancies = null) {
        const discrepanciesToRender = filteredDiscrepancies || discrepancies;
        const tableBody = document.getElementById('discrepancy-table-body');
        tableBody.innerHTML = '';
        
        discrepanciesToRender.forEach(disc => {
            const tr = document.createElement('tr');
            const varianceClass = disc.variance < 0 ? 'variance-negative' : 'variance-positive';
            const varianceSign = disc.variance > 0 ? '+' : '';
            
            tr.innerHTML = `
                <td>${disc.id}</td>
                <td>${disc.material}</td>
                <td>${disc.location}</td>
                <td>${disc.systemCount}</td>
                <td>${disc.physicalCount}</td>
                <td class="${varianceClass}">${varianceSign}${disc.variance}</td>
                <td>${disc.dateFound}</td>
                <td><span class="status-${disc.status.toLowerCase()}">${disc.status}</span></td>
                <td><button class="audit-action" data-id="${disc.id}">View</button></td>
            `;
            tableBody.appendChild(tr);
        });
        
        // Add click event to buttons
        document.querySelectorAll('.audit-action').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                showDiscrepancyDetails(id);
            });
        });
    }

    // Filter discrepancies
    function filterDiscrepancies() {
        const warehouse = document.getElementById('warehouse-filter').value;
        const status = document.getElementById('status-filter').value;
        
        let filtered = [...discrepancies];
        
        if (warehouse !== 'all') {
            filtered = filtered.filter(disc => 
                disc.location.toLowerCase().includes(`warehouse ${warehouse}`));
        }
        
        if (status !== 'all') {
            filtered = filtered.filter(disc => 
                disc.status.toLowerCase() === status);
        }
        
        renderDiscrepancies(filtered);
    }

    // Show discrepancy details in modal
    function showDiscrepancyDetails(id) {
        const disc = discrepancies.find(d => d.id === id);
        if (!disc) return;
        
        const detailsElement = document.getElementById('discrepancy-details');
        const varianceClass = disc.variance < 0 ? 'variance-negative' : 'variance-positive';
        const varianceSign = disc.variance > 0 ? '+' : '';
        
        let detailsHTML = `
            <div class="details-grid">
                <p><strong>Discrepancy ID:</strong> ${disc.id}</p>
                <p><strong>Material:</strong> ${disc.material}</p>
                <p><strong>Location:</strong> ${disc.location}</p>
                <p><strong>System Count:</strong> ${disc.systemCount}</p>
                <p><strong>Physical Count:</strong> ${disc.physicalCount}</p>
                <p><strong>Variance:</strong> <span class="${varianceClass}">${varianceSign}${disc.variance}</span></p>
                <p><strong>Date Found:</strong> ${disc.dateFound}</p>
                <p><strong>Audit Reference:</strong> ${disc.audit}</p>
                <p><strong>Status:</strong> <span class="status-${disc.status.toLowerCase()}">${disc.status}</span></p>
                <p><strong>Notes:</strong> ${disc.notes}</p>
            </div>
        `;
        
        // Add resolution info if available
        if (disc.resolution) {
            detailsHTML += `
                <div class="resolution-section">
                    <h4>Resolution Details</h4>
                    <p><strong>Resolution Type:</strong> ${disc.resolution.type}</p>
                    <p><strong>Resolution Notes:</strong> ${disc.resolution.notes}</p>
                    <p><strong>Adjusted Count:</strong> ${disc.resolution.adjustedCount}</p>
                    <p><strong>Resolved By:</strong> ${disc.resolution.resolvedBy}</p>
                    <p><strong>Resolved Date:</strong> ${disc.resolution.resolvedDate}</p>
                </div>
            `;
        }
        
        detailsElement.innerHTML = detailsHTML;
        
        // Configure buttons based on status
        const investigateBtn = document.getElementById('investigate-btn');
        const resolveBtn = document.getElementById('resolve-btn');
        
        investigateBtn.dataset.id = disc.id;
        resolveBtn.dataset.id = disc.id;
        
        if (disc.status === "Pending") {
            investigateBtn.style.display = "block";
            resolveBtn.style.display = "block";
        } else if (disc.status === "Investigating") {
            investigateBtn.style.display = "none";
            resolveBtn.style.display = "block";
        } else {
            // Resolved
            investigateBtn.style.display = "none";
            resolveBtn.style.display = "none";
        }
        
        document.getElementById('discrepancyModal').style.display = 'flex';
    }

    // Initialize page
    updateStats();
    renderDiscrepancies();

    // Event Listeners
    document.getElementById('filter-btn').addEventListener('click', filterDiscrepancies);
    
    // Investigate button
    document.getElementById('investigate-btn').addEventListener('click', function() {
        const id = this.dataset.id;
        const disc = discrepancies.find(d => d.id === id);
        if (disc) {
            disc.status = "Investigating";
            updateStats();
            renderDiscrepancies();
            document.getElementById('discrepancyModal').style.display = 'none';
            alert(`Status updated to Investigating for ${id}`);
        }
    });
    
    // Resolve button
    document.getElementById('resolve-btn').addEventListener('click', function() {
        const id = this.dataset.id;
        document.getElementById('discrepancyModal').style.display = 'none';
        
        // Pre-fill the form with discrepancy data
        const disc = discrepancies.find(d => d.id === id);
        if (disc) {
            // In a real app, you would pre-fill form values
            document.getElementById('adjusted-count').value = disc.physicalCount;
            
            // Show resolution modal
            document.getElementById('resolutionModal').style.display = 'flex';
            
            // Store the discrepancy ID for form submission
            document.getElementById('resolutionForm').dataset.id = id;
        }
    });
    
    // Resolution form submit
    document.getElementById('resolutionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const id = this.dataset.id;
        const disc = discrepancies.find(d => d.id === id);
        
        if (disc) {
            // Update discrepancy with resolution data
            disc.status = "Resolved";
            disc.resolution = {
                type: document.getElementById('resolution-type').value,
                notes: document.getElementById('resolution-notes').value,
                adjustedCount: parseInt(document.getElementById('adjusted-count').value),
                resolvedBy: document.getElementById('responsible-person').value,
                resolvedDate: new Date().toISOString().split('T')[0] // Today's date
            };
            
            // Update UI
            updateStats();
            renderDiscrepancies();
            document.getElementById('resolutionModal').style.display = 'none';
            alert(`Discrepancy ${id} has been resolved`);
            
            // Reset form
            this.reset();
        }
    });

    // Close buttons for modals
    document.getElementById('closeDiscrepancyModal').addEventListener('click', function() {
        document.getElementById('discrepancyModal').style.display = 'none';
    });
    
    document.getElementById('closeResolutionModal').addEventListener('click', function() {
        document.getElementById('resolutionModal').style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('discrepancyModal')) {
            document.getElementById('discrepancyModal').style.display = 'none';
        }
        if (event.target === document.getElementById('resolutionModal')) {
            document.getElementById('resolutionModal').style.display = 'none';
        }
    });
});
