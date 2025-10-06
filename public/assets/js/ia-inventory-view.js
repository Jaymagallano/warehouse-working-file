document.addEventListener('DOMContentLoaded', function() {
    // Sample inventory data
    const inventory = [
        {
            id: "MAT-001",
            name: "Portland Cement",
            category: "Building Materials",
            warehouse: "Warehouse A",
            location: "Zone 1, Rack A",
            quantity: 250,
            unit: "Bags",
            unitValue: 12.50,
            totalValue: 3125.00,
            lastAudited: "2024-06-15",
            status: "OK",
            description: "Standard Portland cement for general construction use.",
            image: "../images/cement.jpg",
            auditHistory: [
                { auditId: "AUD-2024-004", date: "2024-06-15", auditor: "John Smith", systemQty: 250, physicalQty: 250, variance: 0, notes: "All quantities verified." },
                { auditId: "AUD-2024-001", date: "2024-05-10", auditor: "Sarah Johnson", systemQty: 300, physicalQty: 295, variance: -5, notes: "Minor discrepancy found." }
            ]
        },
        {
            id: "MAT-002",
            name: "Steel Rebar (10mm)",
            category: "Steel Products",
            warehouse: "Warehouse B",
            location: "Zone 2, Rack C",
            quantity: 120,
            unit: "Bundles",
            unitValue: 85.00,
            totalValue: 10200.00,
            lastAudited: "2024-06-20",
            status: "OK",
            description: "10mm diameter steel reinforcement bars for concrete structures.",
            image: "../images/rebar.jpg",
            auditHistory: [
                { auditId: "AUD-2024-005", date: "2024-06-20", auditor: "Michael Brown", systemQty: 120, physicalQty: 120, variance: 0, notes: "Inventory accurate." }
            ]
        },
        {
            id: "MAT-003",
            name: "Interior Paint (White)",
            category: "Finishing Materials",
            warehouse: "Warehouse C",
            location: "Zone 1, Shelf B",
            quantity: 15,
            unit: "5-Gallon Buckets",
            unitValue: 120.00,
            totalValue: 1800.00,
            lastAudited: "2024-07-02",
            status: "Low",
            description: "Premium interior latex paint, matte finish.",
            image: "../images/paint.jpg",
            auditHistory: [
                { auditId: "AUD-2024-006", date: "2024-07-02", auditor: "John Smith", systemQty: 20, physicalQty: 15, variance: -5, notes: "Missing 5 buckets. Investigation needed." }
            ]
        },
        {
            id: "MAT-004",
            name: "Electrical Conduit",
            category: "Electrical",
            warehouse: "Warehouse B",
            location: "Zone 3, Rack D",
            quantity: 0,
            unit: "Bundles",
            unitValue: 45.00,
            totalValue: 0.00,
            lastAudited: "2024-07-05",
            status: "Out",
            description: "PVC electrical conduit for wiring protection.",
            image: "../images/conduit.jpg",
            auditHistory: [
                { auditId: "AUD-2024-007", date: "2024-07-05", auditor: "Sarah Johnson", systemQty: 0, physicalQty: 0, variance: 0, notes: "Confirmed out of stock." }
            ]
        },
        {
            id: "MAT-005",
            name: "Plywood Sheets (3/4\")",
            category: "Building Materials",
            warehouse: "Warehouse A",
            location: "Zone 2, Stack A",
            quantity: 85,
            unit: "Sheets",
            unitValue: 32.50,
            totalValue: 2762.50,
            lastAudited: "2024-06-25",
            status: "OK",
            description: "3/4-inch thick plywood sheets for construction.",
            image: "../images/plywood.jpg",
            auditHistory: [
                { auditId: "AUD-2024-005", date: "2024-06-25", auditor: "Michael Brown", systemQty: 80, physicalQty: 85, variance: 5, notes: "Found extra sheets not in system." }
            ]
        },
        {
            id: "MAT-006",
            name: "Copper Pipes (1/2\")",
            category: "Plumbing",
            warehouse: "Warehouse C",
            location: "Zone 2, Rack B",
            quantity: 8,
            unit: "Bundles",
            unitValue: 210.00,
            totalValue: 1680.00,
            lastAudited: "2024-07-01",
            status: "Low",
            description: "1/2-inch diameter copper pipes for plumbing installations.",
            image: "../images/copper-pipes.jpg",
            auditHistory: [
                { auditId: "AUD-2024-006", date: "2024-07-01", auditor: "John Smith", systemQty: 8, physicalQty: 8, variance: 0, notes: "Quantity correct but low stock." }
            ]
        }
    ];

    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 12;
    const totalItems = inventory.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Update pagination info
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    // Render inventory in grid view (default)
    renderGridView();
    
    // Render inventory in list view
    renderListView();
    
    // Update inventory statistics
    updateInventoryStats();
    
    // Event Listeners
    
    // Switch between grid and list views
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.view;
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (view === 'grid') {
                document.getElementById('grid-view').style.display = 'grid';
                document.getElementById('list-view').style.display = 'none';
            } else {
                document.getElementById('grid-view').style.display = 'none';
                document.getElementById('list-view').style.display = 'block';
            }
        });
    });
    
    // Search and filter functionality
    document.getElementById('search-btn').addEventListener('click', function() {
        const searchTerm = document.getElementById('inventory-search').value.toLowerCase();
        const warehouseFilter = document.getElementById('warehouse-filter').value;
        const categoryFilter = document.getElementById('category-filter').value;
        
        filterInventory(searchTerm, warehouseFilter, categoryFilter);
    });
    
    // Pagination controls
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            document.getElementById('current-page').textContent = currentPage;
            renderGridView();
            updatePaginationButtons();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            document.getElementById('current-page').textContent = currentPage;
            renderGridView();
            updatePaginationButtons();
        }
    });
    
    // Modal close buttons
    document.getElementById('closeItemModal').addEventListener('click', function() {
        document.getElementById('itemModal').style.display = 'none';
    });
    
    document.getElementById('closeAuditHistoryModal').addEventListener('click', function() {
        document.getElementById('auditHistoryModal').style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const itemModal = document.getElementById('itemModal');
        const auditHistoryModal = document.getElementById('auditHistoryModal');
        
        if (event.target === itemModal) {
            itemModal.style.display = 'none';
        }
        if (event.target === auditHistoryModal) {
            auditHistoryModal.style.display = 'none';
        }
    });
    
    // Print details button
    document.getElementById('print-details-btn').addEventListener('click', function() {
        const itemDetails = document.getElementById('item-details').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Item Details</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h2 { color: #1a1aff; }
                    </style>
                </head>
                <body>
                    <h2>Item Details</h2>
                    ${itemDetails}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    });
    
    // Functions
    
    // Render inventory in grid view
    function renderGridView() {
        const gridView = document.getElementById('grid-view');
        gridView.innerHTML = '';
        
        // Calculate start and end indices for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        
        for (let i = startIndex; i < endIndex; i++) {
            const item = inventory[i];
            if (!item) continue;
            
            const card = document.createElement('div');
            card.className = 'inventory-card';
            card.setAttribute('data-item-id', item.id);
            
            card.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title">${item.name}</h3>
                    <div class="card-category">${item.category}</div>
                </div>
                <div class="card-body">
                    <div class="card-info">
                        <div class="card-label">Location</div>
                        <div class="card-value">${item.warehouse}, ${item.location}</div>
                    </div>
                    <div class="card-info">
                        <div class="card-label">Quantity</div>
                        <div class="card-value">${item.quantity} ${item.unit}</div>
                    </div>
                    <div class="card-info">
                        <div class="card-label">Value</div>
                        <div class="card-value">$${item.totalValue.toFixed(2)}</div>
                    </div>
                    <div class="card-info">
                        <div class="card-label">Last Audited</div>
                        <div class="card-value">${item.lastAudited}</div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="status-${item.status.toLowerCase()}">${item.status}</div>
                    <button class="card-action view-item-btn">View Details</button>
                </div>
            `;
            
            gridView.appendChild(card);
            
            // Add event listener to view button
            card.querySelector('.view-item-btn').addEventListener('click', function() {
                showItemDetails(item.id);
            });
        }
        
        updatePaginationButtons();
    }
    
    // Render inventory in list view
    function renderListView() {
        const tableBody = document.getElementById('inventory-table-body');
        tableBody.innerHTML = '';
        
        inventory.forEach(item => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.warehouse}</td>
                <td>${item.location}</td>
                <td>${item.quantity}</td>
                <td>${item.unit}</td>
                <td>$${item.totalValue.toFixed(2)}</td>
                <td>${item.lastAudited}</td>
                <td><span class="status-${item.status.toLowerCase()}">${item.status}</span></td>
                <td><button class="action-btn">View</button></td>
            `;
            
            tableBody.appendChild(tr);
            
            // Add event listener to view button
            tr.querySelector('.action-btn').addEventListener('click', function() {
                showItemDetails(item.id);
            });
        });
    }
    
    // Filter inventory based on search and filters
    function filterInventory(searchTerm, warehouse, category) {
        const filteredItems = inventory.filter(item => {
            // Check if item matches search term
            const matchesSearch = searchTerm === '' || 
                item.name.toLowerCase().includes(searchTerm) || 
                item.id.toLowerCase().includes(searchTerm);
            
            // Check if item matches warehouse filter
            const matchesWarehouse = warehouse === 'all' || 
                item.warehouse.toLowerCase().includes('warehouse ' + warehouse.toLowerCase());
            
            // Check if item matches category filter
            const matchesCategory = category === 'all' || 
                item.category.toLowerCase().includes(category.toLowerCase());
            
            return matchesSearch && matchesWarehouse && matchesCategory;
        });
        
        // Reset pagination for filtered results
        currentPage = 1;
        document.getElementById('current-page').textContent = currentPage;
        
        // Render filtered results
        renderFilteredResults(filteredItems);
    }
    
    // Render filtered results
    function renderFilteredResults(filteredItems) {
        // Update grid view
        const gridView = document.getElementById('grid-view');
        gridView.innerHTML = '';
        
        if (filteredItems.length === 0) {
            gridView.innerHTML = '<div class="no-results">No items found matching your criteria.</div>';
        } else {
            const startIndex = 0;
            const endIndex = Math.min(itemsPerPage, filteredItems.length);
            
            for (let i = startIndex; i < endIndex; i++) {
                const item = filteredItems[i];
                const card = document.createElement('div');
                card.className = 'inventory-card';
                card.setAttribute('data-item-id', item.id);
                
                card.innerHTML = `
                    <div class="card-header">
                        <h3 class="card-title">${item.name}</h3>
                        <div class="card-category">${item.category}</div>
                    </div>
                    <div class="card-body">
                        <div class="card-info">
                            <div class="card-label">Location</div>
                            <div class="card-value">${item.warehouse}, ${item.location}</div>
                        </div>
                        <div class="card-info">
                            <div class="card-label">Quantity</div>
                            <div class="card-value">${item.quantity} ${item.unit}</div>
                        </div>
                        <div class="card-info">
                            <div class="card-label">Value</div>
                            <div class="card-value">$${item.totalValue.toFixed(2)}</div>
                        </div>
                        <div class="card-info">
                            <div class="card-label">Last Audited</div>
                            <div class="card-value">${item.lastAudited}</div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="status-${item.status.toLowerCase()}">${item.status}</div>
                        <button class="card-action view-item-btn">View Details</button>
                    </div>
                `;
                
                gridView.appendChild(card);
                
                card.querySelector('.view-item-btn').addEventListener('click', function() {
                    showItemDetails(item.id);
                });
            }
        }
        
        // Update list view
        const tableBody = document.getElementById('inventory-table-body');
        tableBody.innerHTML = '';
        
        if (filteredItems.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="11" class="no-results">No items found matching your criteria.</td>';
            tableBody.appendChild(tr);
        } else {
            filteredItems.forEach(item => {
                const tr = document.createElement('tr');
                
                tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.warehouse}</td>
                    <td>${item.location}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unit}</td>
                    <td>$${item.totalValue.toFixed(2)}</td>
                    <td>${item.lastAudited}</td>
                    <td><span class="status-${item.status.toLowerCase()}">${item.status}</span></td>
                    <td><button class="action-btn">View</button></td>
                `;
                
                tableBody.appendChild(tr);
                
                tr.querySelector('.action-btn').addEventListener('click', function() {
                    showItemDetails(item.id);
                });
            });
        }
        
        // Update pagination for filtered results
        const totalFilteredPages = Math.ceil(filteredItems.length / itemsPerPage);
        document.getElementById('total-pages').textContent = totalFilteredPages || 1;
        updatePaginationButtons(totalFilteredPages);
    }
    
    // Show item details in modal
    function showItemDetails(itemId) {
        const item = inventory.find(i => i.id === itemId);
        if (!item) return;
        
        const detailsElement = document.getElementById('item-details');
        
        detailsElement.innerHTML = `
            <div class="item-detail-grid">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p><strong>ID:</strong> ${item.id}</p>
                    <p><strong>Category:</strong> ${item.category}</p>
                    <p><strong>Description:</strong> ${item.description}</p>
                    <p><strong>Location:</strong> ${item.warehouse}, ${item.location}</p>
                    <p><strong>Quantity:</strong> ${item.quantity} ${item.unit}</p>
                    <p><strong>Unit Value:</strong> $${item.unitValue.toFixed(2)}</p>
                    <p><strong>Total Value:</strong> $${item.totalValue.toFixed(2)}</p>
                    <p><strong>Status:</strong> <span class="status-${item.status.toLowerCase()}">${item.status}</span></p>
                    <p><strong>Last Audited:</strong> ${item.lastAudited}</p>
                </div>
            </div>
        `;
        
        // Store item ID for audit history
        document.getElementById('audit-history-btn').dataset.itemId = itemId;
        
        // Show modal
        document.getElementById('itemModal').style.display = 'flex';
        
        // Set up audit history button
        document.getElementById('audit-history-btn').addEventListener('click', function() {
            const id = this.dataset.itemId;
            showAuditHistory(id);
            document.getElementById('itemModal').style.display = 'none';
        });
    }
    
    // Show audit history in modal
    function showAuditHistory(itemId) {
        const item = inventory.find(i => i.id === itemId);
        if (!item || !item.auditHistory) return;
        
        const historyTable = document.getElementById('audit-history-body');
        historyTable.innerHTML = '';
        
        item.auditHistory.forEach(audit => {
            const tr = document.createElement('tr');
            const varianceClass = audit.variance < 0 ? 'variance-negative' : audit.variance > 0 ? 'variance-positive' : '';
            const varianceSign = audit.variance > 0 ? '+' : '';
            
            tr.innerHTML = `
                <td>${audit.auditId}</td>
                <td>${audit.date}</td>
                <td>${audit.auditor}</td>
                <td>${audit.systemQty}</td>
                <td>${audit.physicalQty}</td>
                <td class="${varianceClass}">${varianceSign}${audit.variance}</td>
                <td>${audit.notes}</td>
            `;
            
            historyTable.appendChild(tr);
        });
        
        // Add title with item name
        document.querySelector('#auditHistoryModal h3').textContent = `Audit History: ${item.name}`;
        
        // Show modal
        document.getElementById('auditHistoryModal').style.display = 'flex';
    }
    
    // Update inventory statistics
    function updateInventoryStats() {
        // Calculate statistics
        let totalItems = 0;
        let totalValue = 0;
        let lowStockItems = 0;
        let outOfStockItems = 0;
        
        inventory.forEach(item => {
            totalItems += item.quantity;
            totalValue += item.totalValue;
            
            if (item.status === 'Low') {
                lowStockItems++;
            } else if (item.status === 'Out') {
                outOfStockItems++;
            }
        });
        
        // Format total value with commas
        const formattedValue = totalValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        // Update display
        document.getElementById('total-items').textContent = totalItems.toLocaleString();
        document.getElementById('total-value').textContent = formattedValue;
        document.getElementById('low-stock').textContent = lowStockItems;
        document.getElementById('out-of-stock').textContent = outOfStockItems;
    }
    
    // Update pagination buttons
    function updatePaginationButtons(totalFilteredPages) {
        const pageCount = totalFilteredPages || totalPages;
        document.getElementById('prev-page').disabled = (currentPage === 1);
        document.getElementById('next-page').disabled = (currentPage === pageCount || pageCount === 0);
    }
});
