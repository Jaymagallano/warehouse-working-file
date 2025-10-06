document.addEventListener('DOMContentLoaded', function() {
    // Sample data - Low stock items
    const lowStockItems = [
        {
            id: "MAT-001",
            name: "Portland Cement",
            currentStock: 20,
            minLevel: 50,
            supplier: "ABC Building Supplies"
        },
        {
            id: "MAT-003",
            name: "Interior Paint (White)",
            currentStock: 8,
            minLevel: 15,
            supplier: "Metro Paints"
        },
        {
            id: "MAT-006",
            name: "Copper Pipes (1/2\")",
            currentStock: 5,
            minLevel: 10,
            supplier: "Plumbing Pro"
        },
        {
            id: "MAT-012",
            name: "Structural Steel Beams",
            currentStock: 3,
            minLevel: 5,
            supplier: "Steel Works Inc."
        }
    ];

    // Sample data - Recent purchase orders
    const recentPOs = [
        {
            id: "PO-2024-042",
            supplier: "ABC Building Supplies",
            date: "2024-07-08",
            total: "$4,250.00",
            status: "Delivered"
        },
        {
            id: "PO-2024-041",
            supplier: "Steel Works Inc.",
            date: "2024-07-05",
            total: "$7,825.00",
            status: "In Transit"
        },
        {
            id: "PO-2024-040",
            supplier: "Metro Paints",
            date: "2024-07-03",
            total: "$1,680.00",
            status: "Approved"
        },
        {
            id: "PO-2024-039",
            supplier: "Electrical Supplies Co.",
            date: "2024-07-01",
            total: "$2,350.00",
            status: "Pending"
        }
    ];

    // Sample data - Action items
    const actionItems = [
        {
            priority: "high",
            title: "Approve Purchase Order #PO-2024-039",
            description: "Electrical Supplies Co. - $2,350.00",
            link: "#"
        },
        {
            priority: "high",
            title: "Respond to Quote Request",
            description: "Steel Works Inc. - Structural Steel Beams",
            link: "#"
        },
        {
            priority: "medium",
            title: "Review Requisition #REQ-2024-028",
            description: "Site B - Construction Materials",
            link: "#"
        },
        {
            priority: "low",
            title: "Update Supplier Information",
            description: "ABC Building Supplies - New contact details",
            link: "#"
        }
    ];

    // Sample data - Upcoming deliveries
    const upcomingDeliveries = [
        {
            id: "PO-2024-041",
            supplier: "Steel Works Inc.",
            date: "2024-07-15",
            items: "Structural Steel Beams",
            status: "In Transit",
            soon: true
        },
        {
            id: "PO-2024-038",
            supplier: "Plumbing Pro",
            date: "2024-07-18",
            items: "Copper Pipes, PVC Fittings",
            status: "Scheduled",
            soon: false
        },
        {
            id: "PO-2024-037",
            supplier: "Metro Paints",
            date: "2024-07-22",
            items: "Exterior Paint, Primers",
            status: "Scheduled",
            soon: false
        }
    ];

    // Sample data - Top suppliers
    const topSuppliers = [
        { name: "ABC Building Supplies", rating: 4.8 },
        { name: "Steel Works Inc.", rating: 4.5 },
        { name: "Metro Paints", rating: 4.7 },
        { name: "Electrical Supplies Co.", rating: 4.2 },
        { name: "Plumbing Pro", rating: 4.6 }
    ];

    // Sample data for invoices
    const recentInvoices = [
        {
            id: "INV-2024-001",
            supplier: "ABC Building Supplies",
            date: "2024-07-02",
            amount: 12500.00,
            status: "Pending"
        },
        {
            id: "INV-2024-002",
            supplier: "Steel Works Inc.",
            date: "2024-06-28",
            amount: 1700.00,
            status: "Matched"
        },
        {
            id: "INV-2024-003",
            supplier: "Metro Paints",
            date: "2024-06-26",
            amount: 2280.00,
            status: "Approved"
        },
        {
            id: "INV-2024-006",
            supplier: "Plumbing Pro",
            date: "2024-06-25",
            amount: 3465.00,
            status: "Pending"
        }
    ];

    // Render low stock items
    const lowStockTable = document.getElementById('low-stock-table');
    lowStockItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.currentStock}</td>
            <td>${item.minLevel}</td>
            <td>${item.supplier}</td>
            <td><button class="action-btn table-action-btn" data-id="${item.id}" data-name="${item.name}" onclick="openQuickOrder(this)">Order</button></td>
        `;
        lowStockTable.appendChild(row);
    });

    // Render recent purchase orders
    const recentPOTable = document.getElementById('recent-po-table');
    recentPOs.forEach(po => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${po.id}</td>
            <td>${po.supplier}</td>
            <td>${po.date}</td>
            <td>${po.total}</td>
            <td><span class="status-badge status-${po.status.toLowerCase().replace(' ', '-')}">${po.status}</span></td>
            <td><button class="secondary-btn table-action-btn">View</button></td>
        `;
        recentPOTable.appendChild(row);
    });

    // Render action items
    const actionItemsList = document.getElementById('action-items');
    actionItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="action-priority priority-${item.priority}">${item.priority}</div>
            <div class="action-title">${item.title}</div>
            <div class="action-desc">${item.description}</div>
            <a href="${item.link}" class="action-link">Take Action</a>
        `;
        actionItemsList.appendChild(li);
    });

    // Render delivery timeline
    const deliveryTimeline = document.getElementById('delivery-timeline');
    upcomingDeliveries.forEach(delivery => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${delivery.soon ? 'soon' : ''}`;
        timelineItem.innerHTML = `
            <div class="timeline-date">${delivery.date}</div>
            <div class="timeline-content">
                <div class="timeline-title">PO #${delivery.id} - ${delivery.supplier}</div>
                <div class="timeline-details">
                    <p>${delivery.items}</p>
                    <span class="status-badge status-${delivery.status.toLowerCase().replace(' ', '-')}">${delivery.status}</span>
                </div>
            </div>
        `;
        deliveryTimeline.appendChild(timelineItem);
    });

    // Render top suppliers
    const topSuppliersList = document.getElementById('top-suppliers-list');
    topSuppliers.forEach(supplier => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="supplier-name">${supplier.name}</span>
            <div class="supplier-rating">
                <span class="supplier-score">${supplier.rating}</span>
                ${'★'.repeat(Math.round(supplier.rating))}
            </div>
        `;
        topSuppliersList.appendChild(li);
    });

    // Initialize supplier performance chart
    const ctx = document.getElementById('supplierChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ABC', 'Steel Works', 'Metro', 'Electrical', 'Plumbing'],
            datasets: [{
                label: 'On-time Delivery (%)',
                data: [95, 88, 92, 85, 91],
                backgroundColor: '#4f8cff',
                borderColor: '#1a1aff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1a1aff',
                    titleFont: {
                        family: 'Poppins'
                    },
                    bodyFont: {
                        family: 'Poppins'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        font: {
                            family: 'Poppins'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'Poppins'
                        }
                    }
                }
            }
        }
    });

    // Quick order modal functionality
    window.openQuickOrder = function(button) {
        const modal = document.getElementById('quickOrderModal');
        const itemId = button.getAttribute('data-id');
        const itemName = button.getAttribute('data-name');
        
        document.getElementById('item-id').value = itemId;
        document.getElementById('item-name').value = itemName;
        
        // Populate supplier dropdown based on item
        const supplierSelect = document.getElementById('supplier');
        supplierSelect.innerHTML = '';
        
        const item = lowStockItems.find(i => i.id === itemId);
        if (item) {
            const option = document.createElement('option');
            option.value = item.supplier;
            option.textContent = item.supplier;
            supplierSelect.appendChild(option);
        }
        
        // Set default delivery date to 7 days from now
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7);
        document.getElementById('delivery-date').valueAsDate = deliveryDate;
        
        modal.style.display = 'flex';
    };
    
    // Close quick order modal
    document.getElementById('closeQuickOrderModal').addEventListener('click', function() {
        document.getElementById('quickOrderModal').style.display = 'none';
    });
    
    // Quick order form submission
    document.getElementById('quickOrderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const itemId = document.getElementById('item-id').value;
        const itemName = document.getElementById('item-name').value;
        const supplier = document.getElementById('supplier').value;
        const quantity = document.getElementById('quantity').value;
        const deliveryDate = document.getElementById('delivery-date').value;
        
        // In a real app, this would send data to the server
        alert(`Purchase order created for ${quantity} units of ${itemName} (${itemId}) from ${supplier} with required delivery by ${deliveryDate}.`);
        
        // Close modal
        document.getElementById('quickOrderModal').style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('quickOrderModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Update dashboard counters
    document.getElementById('invoice-count').textContent = '12';
    
    // Populate recent invoices table
    const recentInvoicesTable = document.getElementById('recent-invoices-table');
    if (recentInvoicesTable) {
        recentInvoices.forEach(invoice => {
            const row = document.createElement('tr');
            
            // Determine status class
            let statusClass = '';
            switch (invoice.status) {
                case 'Pending':
                    statusClass = 'status-pending';
                    break;
                case 'Matched':
                    statusClass = 'status-matched';
                    break;
                case 'Approved':
                    statusClass = 'status-approved';
                    break;
                case 'Disputed':
                    statusClass = 'status-disputed';
                    break;
                case 'Paid':
                    statusClass = 'status-paid';
                    break;
            }
            
            row.innerHTML = `
                <td>${invoice.id}</td>
                <td>${invoice.supplier}</td>
                <td>${invoice.date}</td>
                <td>$${invoice.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td class="${statusClass}">${invoice.status}</td>
                <td><a href="po-invoices.html?id=${invoice.id}" class="view-link">View</a></td>
            `;
            
            recentInvoicesTable.appendChild(row);
        });
    }
    
    // Add invoices to action items
    const actionItemsList = document.getElementById('action-items');
    if (actionItemsList) {
        // ...existing code...
        
        // Add invoice-related action items
        const invoiceActionItems = [
            { text: "Review invoice from Metro Paints", priority: "medium", link: "po-invoices.html?id=INV-2024-003" },
            { text: "Approve pending invoice INV-2024-001", priority: "high", link: "po-invoices.html?id=INV-2024-001" }
        ];
        
        invoiceActionItems.forEach(item => {
            const li = document.createElement('li');
            li.className = `action-item ${item.priority}`;
            li.innerHTML = `<a href="${item.link}">${item.text}</a>`;
            actionItemsList.appendChild(li);
        });
    }
});
