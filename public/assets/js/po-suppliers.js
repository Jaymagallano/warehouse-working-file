document.addEventListener('DOMContentLoaded', function() {
    // Sample suppliers data
    const suppliers = [
        {
            id: "SUP-001",
            name: "ABC Building Supplies",
            category: "Building Materials",
            contact: {
                name: "John Johnson",
                phone: "555-123-4567",
                email: "john@abcbuilding.com",
                address: "123 Construction Ave, Building District, XY 12345"
            },
            rating: 4.8,
            status: "Active",
            notes: "Reliable supplier for bulk orders of basic construction materials.",
            recentOrders: 8
        },
        {
            id: "SUP-002",
            name: "Steel Works Inc.",
            category: "Building Materials",
            contact: {
                name: "Sarah Steel",
                phone: "555-987-6543",
                email: "sarah@steelworks.com",
                address: "456 Metal Road, Industrial Zone, XY 23456"
            },
            rating: 4.5,
            status: "Active",
            notes: "Specializes in structural steel and metal components.",
            recentOrders: 5
        },
        {
            id: "SUP-003",
            name: "Metro Paints",
            category: "Building Materials",
            contact: {
                name: "Robert Colors",
                phone: "555-456-7890",
                email: "robert@metropaints.com",
                address: "789 Paint Street, Commerce City, XY 34567"
            },
            rating: 4.7,
            status: "Active",
            notes: "Premium paint products for interior and exterior applications.",
            recentOrders: 3
        },
        {
            id: "SUP-004",
            name: "Electrical Supplies Co.",
            category: "Electrical",
            contact: {
                name: "Emma Watts",
                phone: "555-234-5678",
                email: "emma@electricalsupplies.com",
                address: "321 Power Road, Tech Park, XY 45678"
            },
            rating: 4.2,
            status: "Under Review",
            notes: "Recent issues with delivery times and product quality.",
            recentOrders: 2
        },
        {
            id: "SUP-005",
            name: "Plumbing Pro",
            category: "Plumbing",
            contact: {
                name: "Michael Pipes",
                phone: "555-345-6789",
                email: "michael@plumbingpro.com",
                address: "567 Water Lane, Pipe District, XY 56789"
            },
            rating: 4.6,
            status: "Active",
            notes: "Full range of plumbing materials and fixtures.",
            recentOrders: 4
        },
        {
            id: "SUP-006",
            name: "ToolMaster",
            category: "Tools & Equipment",
            contact: {
                name: "David Drills",
                phone: "555-456-7891",
                email: "david@toolmaster.com",
                address: "890 Tool Avenue, Equipment Park, XY 67890"
            },
            rating: 4.4,
            status: "Active",
            notes: "Tool and equipment rentals and sales.",
            recentOrders: 6
        }
    ];

    // DOM element references
    const suppliersGridView = document.getElementById('suppliers-grid-view');
    const suppliersListView = document.getElementById('suppliers-list-view');
    const suppliersTableBody = document.getElementById('suppliers-table-body');
    const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
    const searchBtn = document.getElementById('search-btn');
    const addSupplierBtn = document.getElementById('add-supplier-btn');
    const supplierModal = document.getElementById('supplierModal');
    const viewSupplierModal = document.getElementById('viewSupplierModal');
    const closeSupplierModal = document.getElementById('closeSupplierModal');
    const closeViewSupplierModal = document.getElementById('closeViewSupplierModal');
    const supplierForm = document.getElementById('supplierForm');
    const cancelSupplierBtn = document.getElementById('cancel-supplier-btn');
    
    // Update supplier stats
    updateSupplierStats();
    
    // Render suppliers
    renderSuppliers();
    
    // Event listeners
    viewToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active button
            viewToggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected view
            if (view === 'grid') {
                suppliersGridView.style.display = 'grid';
                suppliersListView.style.display = 'none';
            } else {
                suppliersGridView.style.display = 'none';
                suppliersListView.style.display = 'block';
            }
        });
    });
    
    searchBtn.addEventListener('click', filterSuppliers);
    
    addSupplierBtn.addEventListener('click', function() {
        openAddSupplierModal();
    });
    
    closeSupplierModal.addEventListener('click', function() {
        supplierModal.style.display = 'none';
    });
    
    closeViewSupplierModal.addEventListener('click', function() {
        viewSupplierModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === supplierModal) {
            supplierModal.style.display = 'none';
        }
        if (event.target === viewSupplierModal) {
            viewSupplierModal.style.display = 'none';
        }
    });
    
    // Cancel supplier form
    cancelSupplierBtn.addEventListener('click', function() {
        supplierModal.style.display = 'none';
    });
    
    // Supplier form submission
    supplierForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const supplierIdInput = document.getElementById('supplier-id');
        const isEditing = supplierIdInput.value !== '';
        
        const newSupplier = {
            id: isEditing ? supplierIdInput.value : `SUP-00${suppliers.length + 1}`,
            name: document.getElementById('supplier-name').value,
            category: document.getElementById('supplier-category').value,
            contact: {
                name: document.getElementById('contact-name').value,
                phone: document.getElementById('contact-phone').value,
                email: document.getElementById('contact-email').value,
                address: document.getElementById('supplier-address').value
            },
            rating: isEditing ? suppliers.find(s => s.id === supplierIdInput.value).rating : 4.0,
            status: "Active",
            notes: document.getElementById('supplier-notes').value,
            recentOrders: isEditing ? suppliers.find(s => s.id === supplierIdInput.value).recentOrders : 0
        };
        
        if (isEditing) {
            // Find and update existing supplier
            const index = suppliers.findIndex(s => s.id === supplierIdInput.value);
            if (index !== -1) {
                suppliers[index] = newSupplier;
            }
            alert(`Supplier ${newSupplier.name} has been updated`);
        } else {
            // Add new supplier
            suppliers.push(newSupplier);
            alert(`New supplier ${newSupplier.name} has been added`);
        }
        
        // Update UI
        updateSupplierStats();
        renderSuppliers();
        
        // Close modal and reset form
        supplierModal.style.display = 'none';
        supplierForm.reset();
    });
    
    // Functions
    
    // Update supplier stats
    function updateSupplierStats() {
        document.getElementById('total-suppliers').textContent = suppliers.length;
        document.getElementById('top-rated').textContent = suppliers.filter(s => s.rating >= 4.5).length;
        document.getElementById('review-count').textContent = suppliers.filter(s => s.status === "Under Review").length;
        
        // Count recent orders
        const recentOrdersCount = suppliers.reduce((sum, supplier) => sum + supplier.recentOrders, 0);
        document.getElementById('recent-orders').textContent = recentOrdersCount;
    }
    
    // Render suppliers in both views
    function renderSuppliers(filteredSuppliers = null) {
        const suppliersToRender = filteredSuppliers || suppliers;
        
        // Clear both views
        suppliersGridView.innerHTML = '';
        suppliersTableBody.innerHTML = '';
        
        if (suppliersToRender.length === 0) {
            suppliersGridView.innerHTML = '<div class="no-results">No suppliers found matching your criteria.</div>';
            return;
        }
        
        // Render grid view
        suppliersToRender.forEach(supplier => {
            const supplierCard = document.createElement('div');
            supplierCard.className = 'supplier-card';
            supplierCard.dataset.id = supplier.id;
            
            supplierCard.innerHTML = `
                <div class="supplier-card-header">
                    <h3 class="supplier-name">${supplier.name}</h3>
                    <div class="supplier-category">${supplier.category}</div>
                    <div class="supplier-rating">${supplier.rating}</div>
                </div>
                <div class="supplier-card-body">
                    <div class="supplier-info">
                        <div class="supplier-info-item">
                            <i class="fas fa-user"></i> ${supplier.contact.name}
                        </div>
                        <div class="supplier-info-item">
                            <i class="fas fa-phone"></i> ${supplier.contact.phone}
                        </div>
                        <div class="supplier-info-item">
                            <i class="fas fa-envelope"></i> ${supplier.contact.email}
                        </div>
                    </div>
                </div>
                <div class="supplier-card-footer">
                    <div class="supplier-status status-${supplier.status.toLowerCase().replace(/\s+/g, '-')}">
                        ${supplier.status}
                    </div>
                    <div class="supplier-card-actions">
                        <button class="action-btn supplier-action-btn view-supplier-btn" data-id="${supplier.id}">View</button>
                        <button class="secondary-btn supplier-action-btn order-btn" data-id="${supplier.id}">Order</button>
                    </div>
                </div>
            `;
            
            suppliersGridView.appendChild(supplierCard);
            
            // Add click event to view entire card
            supplierCard.addEventListener('click', function(e) {
                // Don't trigger if clicked on a button
                if (!e.target.closest('.supplier-card-actions')) {
                    viewSupplier(supplier.id);
                }
            });
        });
        
        // Add click events to grid view buttons
        document.querySelectorAll('.view-supplier-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const supplierId = this.dataset.id;
                viewSupplier(supplierId);
            });
        });
        
        document.querySelectorAll('.order-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const supplierId = this.dataset.id;
                const supplier = suppliers.find(s => s.id === supplierId);
                alert(`Create order form would open for ${supplier.name}`);
                // In a real app, this would redirect to the purchase order page
            });
        });
        
        // Render list view
        suppliersToRender.forEach(supplier => {
            const row = document.createElement('tr');
            
            const statusClass = supplier.status.toLowerCase().replace(/\s+/g, '-');
            
            row.innerHTML = `
                <td>${supplier.id}</td>
                <td>${supplier.name}</td>
                <td>${supplier.category}</td>
                <td>${supplier.contact.name}</td>
                <td>${supplier.rating} ★</td>
                <td><span class="status-${statusClass}">${supplier.status}</span></td>
                <td>
                    <button class="action-btn table-action-btn" data-id="${supplier.id}">View</button>
                    <button class="secondary-btn table-action-btn" data-id="${supplier.id}">Order</button>
                </td>
            `;
            
            suppliersTableBody.appendChild(row);
        });
        
        // Add click events to list view buttons
        document.querySelectorAll('.table-action-btn').forEach(button => {
            button.addEventListener('click', function() {
                const supplierId = this.dataset.id;
                
                if (this.textContent === 'View') {
                    viewSupplier(supplierId);
                } else if (this.textContent === 'Order') {
                    const supplier = suppliers.find(s => s.id === supplierId);
                    alert(`Create order form would open for ${supplier.name}`);
                    // In a real app, this would redirect to the purchase order page
                }
            });
        });
    }
    
    // Filter suppliers
    function filterSuppliers() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;
        
        let filtered = [...suppliers];
        
        if (searchTerm) {
            filtered = filtered.filter(supplier => 
                supplier.name.toLowerCase().includes(searchTerm) ||
                supplier.id.toLowerCase().includes(searchTerm) ||
                supplier.contact.name.toLowerCase().includes(searchTerm) ||
                supplier.contact.email.toLowerCase().includes(searchTerm)
            );
        }
        
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(supplier => 
                supplier.category.toLowerCase().includes(categoryFilter)
            );
        }
        
        renderSuppliers(filtered);
    }
    
    // Open add supplier modal
    function openAddSupplierModal() {
        // Reset form and set for adding
        supplierForm.reset();
        document.getElementById('supplier-id').value = '';
        document.getElementById('supplier-modal-title').textContent = 'Add New Supplier';
        document.getElementById('supplier-submit-btn').textContent = 'Add Supplier';
        
        // Show modal
        supplierModal.style.display = 'flex';
    }
    
    // Open edit supplier modal
    function openEditSupplierModal(supplierId) {
        const supplier = suppliers.find(s => s.id === supplierId);
        if (!supplier) return;
        
        // Set form for editing
        document.getElementById('supplier-id').value = supplier.id;
        document.getElementById('supplier-name').value = supplier.name;
        document.getElementById('supplier-category').value = supplier.category;
        document.getElementById('contact-name').value = supplier.contact.name;
        document.getElementById('contact-phone').value = supplier.contact.phone;
        document.getElementById('contact-email').value = supplier.contact.email;
        document.getElementById('supplier-address').value = supplier.contact.address;
        document.getElementById('supplier-notes').value = supplier.notes;
        
        document.getElementById('supplier-modal-title').textContent = 'Edit Supplier';
        document.getElementById('supplier-submit-btn').textContent = 'Update Supplier';
        
        // Show modal
        supplierModal.style.display = 'flex';
    }
    
    // View supplier details
    function viewSupplier(supplierId) {
        const supplier = suppliers.find(s => s.id === supplierId);
        if (!supplier) return;
        
        const supplierDetails = document.getElementById('supplier-details');
        
        let detailsHTML = `
            <div class="supplier-detail-header">
                <div class="supplier-detail-main">
                    <div class="supplier-detail-title">
                        <h2 class="supplier-detail-name">${supplier.name}</h2>
                        <div class="supplier-detail-rating">${supplier.rating}</div>
                    </div>
                    <div class="supplier-detail-category">
                        <strong>Category:</strong> ${supplier.category}
                    </div>
                    <div class="supplier-detail-status">
                        <strong>Status:</strong> <span class="status-${supplier.status.toLowerCase().replace(/\s+/g, '-')}">${supplier.status}</span>
                    </div>
                </div>
                
                <div class="supplier-contact-info">
                    <h3 class="contact-title">Contact Information</h3>
                    <div class="contact-item">
                        <div class="contact-label">Contact:</div>
                        <div>${supplier.contact.name}</div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-label">Phone:</div>
                        <div>${supplier.contact.phone}</div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-label">Email:</div>
                        <div>${supplier.contact.email}</div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-label">Address:</div>
                        <div>${supplier.contact.address}</div>
                    </div>
                </div>
            </div>
            
            <div class="supplier-detail-tabs">
                <button class="tab-button active" data-tab="orders">Orders History</button>
                <button class="tab-button" data-tab="materials">Materials</button>
                <button class="tab-button" data-tab="notes">Notes</button>
                <button class="tab-button" data-tab="performance">Performance</button>
            </div>
            
            <div class="tab-content active" id="orders-tab">
                <p>Recent Orders: ${supplier.recentOrders}</p>
                <p>The detailed order history would be displayed here.</p>
            </div>
            
            <div class="tab-content" id="materials-tab">
                <p>Materials supplied by this vendor would be listed here.</p>
            </div>
            
            <div class="tab-content" id="notes-tab">
                <p>${supplier.notes || 'No notes available.'}</p>
            </div>
            
            <div class="tab-content" id="performance-tab">
                <p>Performance metrics and history would be displayed here.</p>
                <p>Overall Rating: ${supplier.rating} / 5</p>
            </div>
        `;
        
        supplierDetails.innerHTML = detailsHTML;
        
        // Set up tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', function() {
                // Update active tab button
                document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Show selected tab content
                const tabId = this.dataset.tab + '-tab';
                document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Set up action buttons
        document.getElementById('edit-supplier-btn').onclick = function() {
            viewSupplierModal.style.display = 'none';
            openEditSupplierModal(supplier.id);
        };
        
        document.getElementById('order-from-supplier-btn').onclick = function() {
            alert(`Create order form would open for ${supplier.name}`);
            // In a real app, this would redirect to the purchase order page
        };
        
        // Show modal
        viewSupplierModal.style.display = 'flex';
    }
});
