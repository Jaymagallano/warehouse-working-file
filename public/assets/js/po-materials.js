document.addEventListener('DOMContentLoaded', function() {
    // Sample materials data
    const materials = [
        {
            id: "MAT-001",
            sku: "CMT-001",
            name: "Portland Cement",
            category: "Building Materials",
            unit: "Bag",
            price: 12.50,
            currentStock: 250,
            minLevel: 50,
            status: "Active",
            leadTime: 5,
            description: "Standard Portland cement for general construction use.",
            preferredSupplier: "ABC Building Supplies",
            priceHistory: [
                { date: "2024-01-10", price: 11.80, supplier: "ABC Building Supplies", poRef: "PO-2024-001" },
                { date: "2024-03-15", price: 12.00, supplier: "ABC Building Supplies", poRef: "PO-2024-015" },
                { date: "2024-06-01", price: 12.50, supplier: "ABC Building Supplies", poRef: "PO-2024-032" }
            ]
        },
        {
            id: "MAT-002",
            sku: "RBR-001",
            name: "Steel Rebar (10mm)",
            category: "Building Materials",
            unit: "Bundle",
            price: 85.00,
            currentStock: 120,
            minLevel: 30,
            status: "Active",
            leadTime: 7,
            description: "10mm diameter steel reinforcement bars for concrete structures.",
            preferredSupplier: "Steel Works Inc.",
            priceHistory: [
                { date: "2024-02-05", price: 80.00, supplier: "Steel Works Inc.", poRef: "PO-2024-008" },
                { date: "2024-05-12", price: 85.00, supplier: "Steel Works Inc.", poRef: "PO-2024-028" }
            ]
        },
        {
            id: "MAT-003",
            sku: "PNT-001",
            name: "Interior Paint (White)",
            category: "Finishing Materials",
            unit: "5-Gallon Bucket",
            price: 120.00,
            currentStock: 15,
            minLevel: 20,
            status: "Low",
            leadTime: 3,
            description: "Premium interior latex paint, matte finish.",
            preferredSupplier: "Metro Paints",
            priceHistory: [
                { date: "2024-01-20", price: 115.00, supplier: "Metro Paints", poRef: "PO-2024-005" },
                { date: "2024-04-08", price: 120.00, supplier: "Metro Paints", poRef: "PO-2024-022" }
            ]
        },
        {
            id: "MAT-004",
            sku: "ELC-001",
            name: "Electrical Conduit",
            category: "Electrical",
            unit: "Bundle",
            price: 45.00,
            currentStock: 0,
            minLevel: 15,
            status: "Out of Stock",
            leadTime: 4,
            description: "PVC electrical conduit for wiring protection.",
            preferredSupplier: "Electrical Supplies Co.",
            priceHistory: [
                { date: "2024-02-15", price: 42.50, supplier: "Electrical Supplies Co.", poRef: "PO-2024-010" },
                { date: "2024-05-01", price: 45.00, supplier: "Electrical Supplies Co.", poRef: "PO-2024-026" }
            ]
        },
        {
            id: "MAT-005",
            sku: "PLY-001",
            name: "Plywood Sheets (3/4\")",
            category: "Building Materials",
            unit: "Sheet",
            price: 32.50,
            currentStock: 85,
            minLevel: 20,
            status: "Active",
            leadTime: 6,
            description: "3/4-inch thick plywood sheets for construction.",
            preferredSupplier: "ABC Building Supplies",
            priceHistory: [
                { date: "2024-03-05", price: 30.00, supplier: "ABC Building Supplies", poRef: "PO-2024-014" },
                { date: "2024-06-10", price: 32.50, supplier: "ABC Building Supplies", poRef: "PO-2024-033" }
            ]
        },
        {
            id: "MAT-006",
            sku: "PPE-001",
            name: "Copper Pipes (1/2\")",
            category: "Plumbing",
            unit: "Bundle",
            price: 210.00,
            currentStock: 8,
            minLevel: 10,
            status: "Low",
            leadTime: 8,
            description: "1/2-inch diameter copper pipes for plumbing installations.",
            preferredSupplier: "Plumbing Pro",
            priceHistory: [
                { date: "2024-01-15", price: 195.00, supplier: "Plumbing Pro", poRef: "PO-2024-003" },
                { date: "2024-04-20", price: 210.00, supplier: "Plumbing Pro", poRef: "PO-2024-024" }
            ]
        }
    ];
    
    // Sample suppliers for dropdown
    const suppliers = [
        "ABC Building Supplies",
        "Steel Works Inc.",
        "Metro Paints",
        "Electrical Supplies Co.",
        "Plumbing Pro"
    ];
    
    // DOM element references
    const materialsCardView = document.getElementById('materials-card-view');
    const materialsTableView = document.getElementById('materials-table-view');
    const materialsTableBody = document.getElementById('materials-table-body');
    const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
    const searchBtn = document.getElementById('search-btn');
    const addMaterialBtn = document.getElementById('add-material-btn');
    const materialModal = document.getElementById('materialModal');
    const viewMaterialModal = document.getElementById('viewMaterialModal');
    const priceHistoryModal = document.getElementById('priceHistoryModal');
    const closeMaterialModal = document.getElementById('closeMaterialModal');
    const closeViewMaterialModal = document.getElementById('closeViewMaterialModal');
    const closePriceHistoryModal = document.getElementById('closePriceHistoryModal');
    const materialForm = document.getElementById('materialForm');
    const cancelMaterialBtn = document.getElementById('cancel-material-btn');
    
    // Pagination variables for table view
    let currentPage = 1;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(materials.length / itemsPerPage);
    
    // Update pagination info
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    // Update material statistics
    updateMaterialStats();
    
    // Populate material views
    renderCardView();
    renderTableView();
    
    // Event listeners for view toggle buttons
    viewToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active button
            viewToggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected view
            if (view === 'card') {
                materialsCardView.style.display = 'grid';
                materialsTableView.style.display = 'none';
            } else {
                materialsCardView.style.display = 'none';
                materialsTableView.style.display = 'block';
            }
        });
    });
    
    // Search button click handler
    searchBtn.addEventListener('click', filterMaterials);
    
    // Add material button click handler
    addMaterialBtn.addEventListener('click', function() {
        openAddMaterialModal();
    });
    
    // Modal close buttons
    closeMaterialModal.addEventListener('click', function() {
        materialModal.style.display = 'none';
    });
    
    closeViewMaterialModal.addEventListener('click', function() {
        viewMaterialModal.style.display = 'none';
    });
    
    closePriceHistoryModal.addEventListener('click', function() {
        priceHistoryModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === materialModal) {
            materialModal.style.display = 'none';
        }
        if (event.target === viewMaterialModal) {
            viewMaterialModal.style.display = 'none';
        }
        if (event.target === priceHistoryModal) {
            priceHistoryModal.style.display = 'none';
        }
    });
    
    // Cancel material form
    cancelMaterialBtn.addEventListener('click', function() {
        materialModal.style.display = 'none';
    });
    
    // Material form submission
    materialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const materialIdInput = document.getElementById('material-id');
        const isEditing = materialIdInput.value !== '';
        
        const newMaterial = {
            id: isEditing ? materialIdInput.value : `MAT-00${materials.length + 1}`,
            sku: document.getElementById('material-sku').value,
            name: document.getElementById('material-name').value,
            category: document.getElementById('material-category').value,
            unit: document.getElementById('material-unit').value,
            price: parseFloat(document.getElementById('material-price').value),
            currentStock: isEditing ? materials.find(m => m.id === materialIdInput.value).currentStock : 0,
            minLevel: parseInt(document.getElementById('material-min-level').value),
            status: isEditing ? materials.find(m => m.id === materialIdInput.value).status : "Active",
            leadTime: parseInt(document.getElementById('material-lead-time').value),
            description: document.getElementById('material-desc').value,
            preferredSupplier: document.getElementById('material-supplier').value,
            priceHistory: isEditing ? materials.find(m => m.id === materialIdInput.value).priceHistory : []
        };
        
        if (isEditing) {
            // Find and update existing material
            const index = materials.findIndex(m => m.id === materialIdInput.value);
            if (index !== -1) {
                materials[index] = newMaterial;
            }
            alert(`Material ${newMaterial.name} has been updated`);
        } else {
            // Add new material
            materials.push(newMaterial);
            alert(`New material ${newMaterial.name} has been added`);
        }
        
        // Update UI
        updateMaterialStats();
        renderCardView();
        renderTableView();
        
        // Close modal and reset form
        materialModal.style.display = 'none';
        materialForm.reset();
    });
    
    // Pagination controls
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            document.getElementById('current-page').textContent = currentPage;
            renderTableView();
            updatePaginationButtons();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            document.getElementById('current-page').textContent = currentPage;
            renderTableView();
            updatePaginationButtons();
        }
    });
    
    // Functions
    
    // Update material statistics
    function updateMaterialStats() {
        document.getElementById('total-materials').textContent = materials.length;
        
        const lowStockCount = materials.filter(m => m.status === "Low").length;
        const outOfStockCount = materials.filter(m => m.status === "Out of Stock").length;
        const onOrderCount = 18; // This would be calculated from actual POs in a real app
        
        document.getElementById('low-stock').textContent = lowStockCount;
        document.getElementById('out-of-stock').textContent = outOfStockCount;
        document.getElementById('on-order').textContent = onOrderCount;
    }
    
    // Render card view of materials
    function renderCardView() {
        materialsCardView.innerHTML = '';
        
        materials.forEach(material => {
            const card = document.createElement('div');
            card.className = 'material-card';
            card.dataset.id = material.id;
            
            // Determine stock status class
            let stockStatusClass = 'stock-ok';
            if (material.status === "Low") {
                stockStatusClass = 'stock-low';
            } else if (material.status === "Out of Stock") {
                stockStatusClass = 'stock-out';
            }
            
            card.innerHTML = `
                <div class="material-card-header">
                    <h3 class="material-name">${material.name}</h3>
                    <span class="material-sku">SKU: ${material.sku}</span>
                    <span class="material-category">${material.category}</span>
                </div>
                <div class="material-card-body">
                    <div class="material-info-item">
                        <span class="material-info-label">Unit Price:</span>
                        <span class="material-info-value material-price">$${material.price.toFixed(2)}</span>
                    </div>
                    <div class="material-info-item">
                        <span class="material-info-label">Unit of Measure:</span>
                        <span class="material-info-value">${material.unit}</span>
                    </div>
                    <div class="material-info-item">
                        <span class="material-info-label">Current Stock:</span>
                        <span class="material-info-value">${material.currentStock} ${material.unit}s</span>
                    </div>
                    <div class="material-info-item">
                        <span class="material-info-label">Min Level:</span>
                        <span class="material-info-value">${material.minLevel} ${material.unit}s</span>
                    </div>
                    <div class="material-info-item">
                        <span class="material-info-label">Lead Time:</span>
                        <span class="material-info-value">${material.leadTime} days</span>
                    </div>
                    <div class="material-info-item">
                        <span class="material-info-label">Preferred Supplier:</span>
                        <span class="material-info-value">${material.preferredSupplier}</span>
                    </div>
                </div>
                <div class="material-card-footer">
                    <span class="material-stock ${stockStatusClass}">${material.status}</span>
                    <div>
                        <button class="action-btn">Order</button>
                        <button class="secondary-btn">View</button>
                    </div>
                </div>
            `;
            
            materialsCardView.appendChild(card);
            
            // Add click event to view entire card
            card.addEventListener('click', function(e) {
                // Don't trigger if clicked on a button
                if (!e.target.closest('button')) {
                    viewMaterial(material.id);
                }
            });
            
            // Add click events to buttons
            const orderBtn = card.querySelector('.action-btn');
            orderBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                alert(`Create order form would open for ${material.name}`);
                // In a real app, this would redirect to the purchase order creation page
            });
            
            const viewBtn = card.querySelector('.secondary-btn');
            viewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                viewMaterial(material.id);
            });
        });
    }
    
    // Render table view of materials
    function renderTableView() {
        materialsTableBody.innerHTML = '';
        
        // Calculate start and end indices for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, materials.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const material = materials[i];
            const row = document.createElement('tr');
            
            // Determine stock status class
            let stockStatusClass = 'stock-ok';
            let statusText = 'Active';
            
            if (material.status === "Low") {
                stockStatusClass = 'stock-low';
                statusText = 'Low Stock';
            } else if (material.status === "Out of Stock") {
                stockStatusClass = 'stock-out';
                statusText = 'Out of Stock';
            }
            
            row.innerHTML = `
                <td>${material.sku}</td>
                <td>${material.name}</td>
                <td>${material.category}</td>
                <td>${material.unit}</td>
                <td>$${material.price.toFixed(2)}</td>
                <td>${material.currentStock}</td>
                <td>${material.minLevel}</td>
                <td><span class="${stockStatusClass}">${statusText}</span></td>
                <td>${material.leadTime} days</td>
                <td>
                    <button class="action-btn">Order</button>
                    <button class="secondary-btn">View</button>
                </td>
            `;
            
            materialsTableBody.appendChild(row);
            
            // Add click events to buttons
            const orderBtn = row.querySelector('.action-btn');
            orderBtn.addEventListener('click', function() {
                alert(`Create order form would open for ${material.name}`);
                // In a real app, this would redirect to the purchase order creation page
            });
            
            const viewBtn = row.querySelector('.secondary-btn');
            viewBtn.addEventListener('click', function() {
                viewMaterial(material.id);
            });
        }
        
        updatePaginationButtons();
    }
    
    // Filter materials based on search and filters
    function filterMaterials() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        
        const filteredMaterials = materials.filter(material => {
            // Check search term
            const matchesSearch = searchTerm === '' || 
                material.name.toLowerCase().includes(searchTerm) ||
                material.sku.toLowerCase().includes(searchTerm) ||
                material.description.toLowerCase().includes(searchTerm);
            
            // Check category
            const matchesCategory = categoryFilter === 'all' || 
                material.category.toLowerCase().includes(categoryFilter);
            
            // Check status
            let matchesStatus = true;
            if (statusFilter === 'low') {
                matchesStatus = material.status === 'Low';
            } else if (statusFilter === 'out') {
                matchesStatus = material.status === 'Out of Stock';
            } else if (statusFilter === 'active') {
                matchesStatus = material.status === 'Active';
            }
            
            return matchesSearch && matchesCategory && matchesStatus;
        });
        
        // Re-render with filtered materials
        renderFilteredResults(filteredMaterials);
    }
    
    // Render filtered results
    function renderFilteredResults(filteredMaterials) {
        // Reset pagination for filtered results
        currentPage = 1;
        
        // Update total pages for filtered results
        const totalFilteredPages = Math.ceil(filteredMaterials.length / itemsPerPage);
        document.getElementById('current-page').textContent = currentPage;
        document.getElementById('total-pages').textContent = totalFilteredPages || 1;
        
        // If no results, show message
        if (filteredMaterials.length === 0) {
            materialsCardView.innerHTML = '<div class="no-results">No materials found matching your criteria.</div>';
            materialsTableBody.innerHTML = '<tr><td colspan="10" class="no-results">No materials found matching your criteria.</td></tr>';
            return;
        }
        
        // Re-render views with filtered materials
        materialsCardView.innerHTML = '';
        materials.forEach(material => {
            if (!filteredMaterials.includes(material)) return;
            
            // Same card creation code as in renderCardView but for filtered materials
            // ...
        });
        
        // Re-render table view with filtered materials
        materialsTableBody.innerHTML = '';
        const startIndex = 0;
        const endIndex = Math.min(itemsPerPage, filteredMaterials.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const material = filteredMaterials[i];
            // Same row creation code as in renderTableView but for filtered materials
            // ...
        }
        
        updatePaginationButtons(totalFilteredPages);
    }
    
    // Open add material modal
    function openAddMaterialModal() {
        // Reset form and set for adding
        materialForm.reset();
        document.getElementById('material-id').value = '';
        document.getElementById('material-modal-title').textContent = 'Add New Material';
        document.getElementById('material-submit-btn').textContent = 'Add Material';
        
        // Populate suppliers dropdown
        const supplierSelect = document.getElementById('material-supplier');
        supplierSelect.innerHTML = '<option value="">Select Supplier</option>';
        
        suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier;
            option.textContent = supplier;
            supplierSelect.appendChild(option);
        });
        
        // Show modal
        materialModal.style.display = 'flex';
    }
    
    // Open edit material modal
    function openEditMaterialModal(materialId) {
        const material = materials.find(m => m.id === materialId);
        if (!material) return;
        
        // Set form for editing
        document.getElementById('material-id').value = material.id;
        document.getElementById('material-sku').value = material.sku;
        document.getElementById('material-name').value = material.name;
        document.getElementById('material-category').value = material.category;
        document.getElementById('material-unit').value = material.unit;
        document.getElementById('material-price').value = material.price;
        document.getElementById('material-min-level').value = material.minLevel;
        document.getElementById('material-lead-time').value = material.leadTime;
        document.getElementById('material-desc').value = material.description || '';
        
        // Populate suppliers dropdown
        const supplierSelect = document.getElementById('material-supplier');
        supplierSelect.innerHTML = '<option value="">Select Supplier</option>';
        
        suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier;
            option.textContent = supplier;
            option.selected = (supplier === material.preferredSupplier);
            supplierSelect.appendChild(option);
        });
        
        document.getElementById('material-modal-title').textContent = 'Edit Material';
        document.getElementById('material-submit-btn').textContent = 'Update Material';
        
        // Show modal
        materialModal.style.display = 'flex';
    }
    
    // View material details
    function viewMaterial(materialId) {
        const material = materials.find(m => m.id === materialId);
        if (!material) return;
        
        const materialDetails = document.getElementById('material-details');
        
        // Determine stock status class
        let stockStatusClass = 'stock-ok';
        if (material.status === "Low") {
            stockStatusClass = 'stock-low';
        } else if (material.status === "Out of Stock") {
            stockStatusClass = 'stock-out';
        }
        
        let detailsHTML = `
            <div class="material-detail-header">
                <div class="material-detail-title">
                    <h2 class="material-detail-name">${material.name}</h2>
                    <div class="material-detail-sku">SKU: ${material.sku} | Category: ${material.category}</div>
                </div>
                
                <div class="material-detail-info">
                    <div class="material-spec-item">
                        <div class="spec-label">Current Stock</div>
                        <div class="spec-value ${stockStatusClass}">${material.currentStock} ${material.unit}s</div>
                    </div>
                    <div class="material-spec-item">
                        <div class="spec-label">Min. Stock Level</div>
                        <div class="spec-value">${material.minLevel} ${material.unit}s</div>
                    </div>
                    <div class="material-spec-item">
                        <div class="spec-label">Unit Price</div>
                        <div class="spec-value">$${material.price.toFixed(2)} per ${material.unit}</div>
                    </div>
                    <div class="material-spec-item">
                        <div class="spec-label">Lead Time</div>
                        <div class="spec-value">${material.leadTime} days</div>
                    </div>
                </div>
            </div>
            
            <div class="material-detail-section">
                <h4>Description</h4>
                <p>${material.description || 'No description available.'}</p>
            </div>
            
            <div class="material-detail-section">
                <h4>Suppliers</h4>
                <div class="material-suppliers">
                    <div class="supplier-card">
                        <div>
                            <div class="supplier-card-name">${material.preferredSupplier}</div>
                            <div class="supplier-card-info">Preferred Supplier</div>
                        </div>
                        <button class="secondary-btn supplier-order-btn" data-supplier="${material.preferredSupplier}">Order</button>
                    </div>
                </div>
            </div>
        `;
        
        materialDetails.innerHTML = detailsHTML;
        
        // Set up action buttons
        document.getElementById('edit-material-btn').onclick = function() {
            viewMaterialModal.style.display = 'none';
            openEditMaterialModal(material.id);
        };
        
        document.getElementById('order-material-btn').onclick = function() {
            alert(`Create purchase order form would open for ${material.name}`);
            // In a real app, this would redirect to the purchase order creation page
        };
        
        document.getElementById('price-history-btn').onclick = function() {
            viewPriceHistory(material.id);
        };
        
        // Add event listeners to supplier order buttons
        document.querySelectorAll('.supplier-order-btn').forEach(button => {
            button.addEventListener('click', function() {
                const supplier = this.dataset.supplier;
                alert(`Create purchase order for ${material.name} from ${supplier}`);
            });
        });
        
        // Show modal
        viewMaterialModal.style.display = 'flex';
    }
    
    // View price history
    function viewPriceHistory(materialId) {
        const material = materials.find(m => m.id === materialId);
        if (!material || !material.priceHistory) return;
        
        // Hide material details modal
        viewMaterialModal.style.display = 'none';
        
        // Populate price history table
        const historyTableBody = document.getElementById('price-history-body');
        historyTableBody.innerHTML = '';
        
        material.priceHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        material.priceHistory.forEach(record => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${record.date}</td>
                <td>$${record.price.toFixed(2)}</td>
                <td>${record.supplier}</td>
                <td>${record.poRef}</td>
            `;
            
            historyTableBody.appendChild(row);
        });
        
        // Create price history chart
        const ctx = document.getElementById('priceHistoryChart').getContext('2d');
        
        // Destroy existing chart if there is one
        if (window.priceChart) {
            window.priceChart.destroy();
        }
        
        // Chart data
        const labels = material.priceHistory.map(record => record.date);
        const prices = material.priceHistory.map(record => record.price);
        
        window.priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Price History',
                    data: prices,
                    borderColor: '#1a1aff',
                    backgroundColor: 'rgba(26, 26, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Price History for ${material.name}`,
                        font: {
                            family: 'Poppins',
                            size: 16
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Price: $${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
        
        // Show modal
        priceHistoryModal.style.display = 'flex';
    }
    
    // Update pagination buttons
    function updatePaginationButtons(totalFilteredPages) {
        const pageCount = totalFilteredPages || totalPages;
        document.getElementById('prev-page').disabled = (currentPage === 1);
        document.getElementById('next-page').disabled = (currentPage === pageCount || pageCount === 0);
    }
});
