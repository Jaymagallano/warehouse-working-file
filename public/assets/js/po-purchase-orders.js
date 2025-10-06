document.addEventListener('DOMContentLoaded', function() {
    // Sample purchase orders data
    const purchaseOrders = [
        {
            id: "PO-2024-042",
            supplier: "ABC Building Supplies",
            dateCreated: "2024-07-08",
            deliveryDate: "2024-07-15",
            total: "$4,250.00",
            status: "Delivered",
            items: [
                { material: "Portland Cement", quantity: 150, unitPrice: 12.50, total: 1875.00 },
                { material: "Sand (Fine)", quantity: 5, unitPrice: 75.00, total: 375.00 },
                { material: "Concrete Mix", quantity: 80, unitPrice: 25.00, total: 2000.00 }
            ],
            notes: "Standard order for Site A construction."
        },
        {
            id: "PO-2024-041",
            supplier: "Steel Works Inc.",
            dateCreated: "2024-07-05",
            deliveryDate: "2024-07-15",
            total: "$7,825.00",
            status: "In Transit",
            items: [
                { material: "Steel Rebar (10mm)", quantity: 50, unitPrice: 85.00, total: 4250.00 },
                { material: "Steel Beams", quantity: 15, unitPrice: 185.00, total: 2775.00 },
                { material: "Metal Fasteners", quantity: 200, unitPrice: 4.00, total: 800.00 }
            ],
            notes: "Rush order for Project XYZ."
        },
        {
            id: "PO-2024-040",
            supplier: "Metro Paints",
            dateCreated: "2024-07-03",
            deliveryDate: "2024-07-12",
            total: "$1,680.00",
            status: "Approved",
            items: [
                { material: "Interior Paint (White)", quantity: 10, unitPrice: 120.00, total: 1200.00 },
                { material: "Paint Primer", quantity: 8, unitPrice: 60.00, total: 480.00 }
            ],
            notes: "For Site B finishing work."
        },
        {
            id: "PO-2024-039",
            supplier: "Electrical Supplies Co.",
            dateCreated: "2024-07-01",
            deliveryDate: "2024-07-10",
            total: "$2,350.00",
            status: "Pending",
            items: [
                { material: "Electrical Conduit", quantity: 20, unitPrice: 45.00, total: 900.00 },
                { material: "Circuit Breakers", quantity: 10, unitPrice: 65.00, total: 650.00 },
                { material: "Electrical Wiring", quantity: 400, unitPrice: 2.00, total: 800.00 }
            ],
            notes: "For electrical work at Site C."
        },
        {
            id: "PO-2024-038",
            supplier: "Plumbing Pro",
            dateCreated: "2024-06-28",
            deliveryDate: "2024-07-18",
            total: "$3,780.00",
            status: "Approved",
            items: [
                { material: "Copper Pipes (1/2\")", quantity: 15, unitPrice: 210.00, total: 3150.00 },
                { material: "PVC Fittings", quantity: 100, unitPrice: 6.30, total: 630.00 }
            ],
            notes: "Scheduled delivery for mid-July."
        }
    ];
    
    // Sample suppliers
    const suppliers = [
        "ABC Building Supplies",
        "Steel Works Inc.",
        "Metro Paints",
        "Electrical Supplies Co.",
        "Plumbing Pro"
    ];
    
    // Sample materials with prices
    const materials = [
        { name: "Portland Cement", price: 12.50 },
        { name: "Sand (Fine)", price: 75.00 },
        { name: "Concrete Mix", price: 25.00 },
        { name: "Steel Rebar (10mm)", price: 85.00 },
        { name: "Steel Beams", price: 185.00 },
        { name: "Metal Fasteners", price: 4.00 },
        { name: "Interior Paint (White)", price: 120.00 },
        { name: "Paint Primer", price: 60.00 },
        { name: "Electrical Conduit", price: 45.00 },
        { name: "Circuit Breakers", price: 65.00 },
        { name: "Electrical Wiring", price: 2.00 },
        { name: "Copper Pipes (1/2\")", price: 210.00 },
        { name: "PVC Fittings", price: 6.30 }
    ];

    // DOM element references
    const poTableBody = document.getElementById('po-table-body');
    const supplierFilter = document.getElementById('supplier-filter');
    const searchBtn = document.getElementById('search-btn');
    const createPoBtn = document.getElementById('create-po-btn');
    const createPoModal = document.getElementById('createPoModal');
    const viewPoModal = document.getElementById('viewPoModal');
    const closeCreatePoModal = document.getElementById('closeCreatePoModal');
    const closeViewPoModal = document.getElementById('closeViewPoModal');
    const createPoForm = document.getElementById('createPoForm');
    const lineItemsBody = document.getElementById('line-items-body');
    const addLineBtn = document.getElementById('add-line-btn');
    const poTotal = document.getElementById('po-total');
    const cancelPoBtn = document.getElementById('cancel-po-btn');
    
    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(purchaseOrders.length / itemsPerPage);
    
    // Update pagination info
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    // Update PO stats
    updatePoStats();
    
    // Populate supplier filter
    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.toLowerCase().replace(/\s+/g, '-');
        option.textContent = supplier;
        supplierFilter.appendChild(option);
    });
    
    // Populate PO table
    renderPurchaseOrders();
    
    // Event listeners
    searchBtn.addEventListener('click', filterPurchaseOrders);
    
    createPoBtn.addEventListener('click', function() {
        openCreatePoModal();
    });
    
    closeCreatePoModal.addEventListener('click', function() {
        createPoModal.style.display = 'none';
    });
    
    closeViewPoModal.addEventListener('click', function() {
        viewPoModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === createPoModal) {
            createPoModal.style.display = 'none';
        }
        if (event.target === viewPoModal) {
            viewPoModal.style.display = 'none';
        }
    });
    
    // Add line item
    addLineBtn.addEventListener('click', function() {
        addLineItem();
    });
    
    // Cancel PO creation
    cancelPoBtn.addEventListener('click', function() {
        createPoModal.style.display = 'none';
    });
    
    // Create PO form submission
    createPoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const supplier = document.getElementById('po-supplier').value;
        const deliveryDate = document.getElementById('po-delivery-date').value;
        const notes = document.getElementById('po-notes').value;
        
        // Get line items
        const lineItems = [];
        const lineItemRows = document.querySelectorAll('.line-item');
        
        lineItemRows.forEach(row => {
            const material = row.querySelector('.item-select').value;
            const quantity = parseInt(row.querySelector('.item-quantity').value);
            const unitPrice = parseFloat(row.querySelector('.item-price').value);
            const total = quantity * unitPrice;
            
            lineItems.push({
                material,
                quantity,
                unitPrice,
                total
            });
        });
        
        // Calculate total
        const total = lineItems.reduce((sum, item) => sum + item.total, 0);
        
        // In a real app, this would send data to the server
        alert(`Purchase order created for ${supplier} with ${lineItems.length} items totaling $${total.toFixed(2)}`);
        
        // Close modal and reset form
        createPoModal.style.display = 'none';
        createPoForm.reset();
        
        // Add the new PO to our local array (for demo purposes)
        const newPo = {
            id: `PO-2024-${43 + purchaseOrders.length}`,
            supplier,
            dateCreated: new Date().toISOString().split('T')[0],
            deliveryDate,
            total: `$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
            status: 'Pending',
            items: lineItems,
            notes
        };
        
        purchaseOrders.unshift(newPo);
        updatePoStats();
        renderPurchaseOrders();
    });
    
    // Pagination controls
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            document.getElementById('current-page').textContent = currentPage;
            renderPurchaseOrders();
            updatePaginationButtons();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            document.getElementById('current-page').textContent = currentPage;
            renderPurchaseOrders();
            updatePaginationButtons();
        }
    });
    
    // Functions
    
    // Update PO stats
    function updatePoStats() {
        document.getElementById('total-pos').textContent = purchaseOrders.length;
        document.getElementById('pending-pos').textContent = purchaseOrders.filter(po => po.status === 'Pending').length;
        document.getElementById('in-transit-pos').textContent = purchaseOrders.filter(po => po.status === 'In Transit').length;
        document.getElementById('delivered-pos').textContent = purchaseOrders.filter(po => po.status === 'Delivered').length;
    }
    
    // Render purchase orders
    function renderPurchaseOrders(filteredPOs = null) {
        const posToRender = filteredPOs || purchaseOrders;
        poTableBody.innerHTML = '';
        
        // Calculate start and end indices for current page
        const start = (currentPage - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, posToRender.length);
        
        for (let i = start; i < end; i++) {
            const po = posToRender[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${po.id}</td>
                <td>${po.supplier}</td>
                <td>${po.dateCreated}</td>
                <td>${po.deliveryDate}</td>
                <td>${po.total}</td>
                <td><span class="status-badge status-${po.status.toLowerCase().replace(' ', '-')}">${po.status}</span></td>
                <td>
                    <button class="action-btn table-action-btn" data-id="${po.id}">View</button>
                </td>
            `;
            poTableBody.appendChild(row);
        }
        
        // Add click event to view buttons
        document.querySelectorAll('.action-btn[data-id]').forEach(button => {
            button.addEventListener('click', function() {
                const poId = this.getAttribute('data-id');
                viewPurchaseOrder(poId);
            });
        });
        
        updatePaginationButtons();
    }
    
    // Filter purchase orders
    function filterPurchaseOrders() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const statusFilter = document.getElementById('status-filter').value;
        const supplierFilter = document.getElementById('supplier-filter').value;
        
        let filtered = [...purchaseOrders];
        
        if (searchTerm) {
            filtered = filtered.filter(po => 
                po.id.toLowerCase().includes(searchTerm) ||
                po.supplier.toLowerCase().includes(searchTerm)
            );
        }
        
        if (statusFilter !== 'all') {
            filtered = filtered.filter(po => 
                po.status.toLowerCase().replace(' ', '-') === statusFilter
            );
        }
        
        if (supplierFilter !== 'all') {
            filtered = filtered.filter(po => 
                po.supplier.toLowerCase().replace(/\s+/g, '-') === supplierFilter
            );
        }
        
        renderPurchaseOrders(filtered);
    }
    
    // Open create PO modal
    function openCreatePoModal() {
        // Reset form
        createPoForm.reset();
        
        // Populate supplier dropdown
        const supplierSelect = document.getElementById('po-supplier');
        supplierSelect.innerHTML = '<option value="">Select Supplier</option>';
        
        suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier;
            option.textContent = supplier;
            supplierSelect.appendChild(option);
        });
        
        // Set default delivery date to 7 days from now
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7);
        document.getElementById('po-delivery-date').valueAsDate = deliveryDate;
        
        // Clear line items and add one empty row
        lineItemsBody.innerHTML = '';
        addLineItem();
        
        // Show modal
        createPoModal.style.display = 'flex';
    }
    
    // Add line item row
    function addLineItem() {
        const row = document.createElement('tr');
        row.className = 'line-item';
        
        row.innerHTML = `
            <td>
                <select class="item-select" required>
                    <option value="">Select Material</option>
                    ${materials.map(material => `<option value="${material.name}" data-price="${material.price}">${material.name}</option>`).join('')}
                </select>
            </td>
            <td><input type="number" class="item-quantity" min="1" value="1" required></td>
            <td><input type="number" class="item-price" min="0" step="0.01" value="0.00" required></td>
            <td class="line-total">$0.00</td>
            <td><button type="button" class="remove-line-btn">×</button></td>
        `;
        
        lineItemsBody.appendChild(row);
        
        // Add event listeners for the new row
        
        // Material select change
        row.querySelector('.item-select').addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const price = selectedOption.getAttribute('data-price') || 0;
            row.querySelector('.item-price').value = parseFloat(price).toFixed(2);
            updateLineTotal(row);
        });
        
        // Quantity or price change
        row.querySelector('.item-quantity').addEventListener('input', function() {
            updateLineTotal(row);
        });
        
        row.querySelector('.item-price').addEventListener('input', function() {
            updateLineTotal(row);
        });
        
        // Remove line button
        row.querySelector('.remove-line-btn').addEventListener('click', function() {
            if (document.querySelectorAll('.line-item').length > 1) {
                row.remove();
                updatePoTotalAmount();
            }
        });
    }
    
    // Update line total
    function updateLineTotal(row) {
        const quantity = parseInt(row.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const total = quantity * price;
        
        row.querySelector('.line-total').textContent = `$${total.toFixed(2)}`;
        
        updatePoTotalAmount();
    }
    
    // Update PO total amount
    function updatePoTotalAmount() {
        let total = 0;
        document.querySelectorAll('.line-item').forEach(row => {
            const lineTotal = parseFloat(row.querySelector('.line-total').textContent.replace('$', '')) || 0;
            total += lineTotal;
        });
        
        poTotal.textContent = `$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
    
    // View purchase order
    function viewPurchaseOrder(poId) {
        const po = purchaseOrders.find(p => p.id === poId);
        if (!po) return;
        
        const poDetails = document.getElementById('po-details');
        
        let detailsHTML = `
            <div class="po-detail-header">
                <div class="po-detail-info">
                    <div class="po-detail-info-item">
                        <div class="po-detail-info-label">PO Number</div>
                        <div class="po-detail-info-value">${po.id}</div>
                    </div>
                    <div class="po-detail-info-item">
                        <div class="po-detail-info-label">Supplier</div>
                        <div class="po-detail-info-value">${po.supplier}</div>
                    </div>
                    <div class="po-detail-info-item">
                        <div class="po-detail-info-label">Date Created</div>
                        <div class="po-detail-info-value">${po.dateCreated}</div>
                    </div>
                    <div class="po-detail-info-item">
                        <div class="po-detail-info-label">Delivery Date</div>
                        <div class="po-detail-info-value">${po.deliveryDate}</div>
                    </div>
                    <div class="po-detail-info-item">
                        <div class="po-detail-info-label">Status</div>
                        <div class="po-detail-info-value">
                            <span class="status-badge status-${po.status.toLowerCase().replace(' ', '-')}">${po.status}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="po-detail-notes">
                <strong>Notes:</strong> ${po.notes || 'No notes provided'}
            </div>
            
            <h4>Order Items</h4>
            <table class="po-items-table">
                <thead>
                    <tr>
                        <th>Material</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        po.items.forEach(item => {
            detailsHTML += `
                <tr>
                    <td>${item.material}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.unitPrice.toFixed(2)}</td>
                    <td>$${item.total.toFixed(2)}</td>
                </tr>
            `;
        });
        
        detailsHTML += `
                </tbody>
            </table>
            
            <div class="po-summary">
                <div class="po-total-container">
                    <span>Total:</span>
                    <span id="view-po-total">${po.total}</span>
                </div>
            </div>
        `;
        
        poDetails.innerHTML = detailsHTML;
        
        // Configure buttons based on status
        const editPoBtn = document.getElementById('edit-po-btn');
        
        if (po.status === 'Pending') {
            editPoBtn.style.display = 'block';
            editPoBtn.onclick = function() {
                alert(`This would open the edit form for PO ${po.id}`);
            };
        } else {
            editPoBtn.style.display = 'none';
        }
        
        // Print and email buttons
        document.getElementById('print-po-btn').onclick = function() {
            alert(`This would print PO ${po.id}`);
        };
        
        document.getElementById('email-po-btn').onclick = function() {
            alert(`This would email PO ${po.id} to ${po.supplier}`);
        };
        
        // Show modal
        viewPoModal.style.display = 'flex';
    }
    
    // Update pagination buttons
    function updatePaginationButtons() {
        document.getElementById('prev-page').disabled = (currentPage === 1);
        document.getElementById('next-page').disabled = (currentPage === totalPages);
    }
});
