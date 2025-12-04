document.addEventListener('DOMContentLoaded', function() {
    // Sample shipping data
    let shipments = [
        { 
            id: "SHP-2024-001", 
            destination: "Site A", 
            material: "Cement", 
            quantity: 50, 
            date: "2024-07-12", 
            status: "Pending" 
        },
        { 
            id: "SHP-2024-002", 
            destination: "Site B", 
            material: "Steel Rebar", 
            quantity: 100, 
            date: "2024-07-10", 
            status: "Shipped" 
        },
        { 
            id: "SHP-2024-003", 
            destination: "Site C", 
            material: "Paint", 
            quantity: 25, 
            date: "2024-07-08", 
            status: "Delivered" 
        }
    ];

    // DOM element references
    const shippingTableBody = document.getElementById('shipping-table-body');
    const addShippingForm = document.getElementById('addShippingForm');
    const addModal = document.getElementById('addModal');
    const viewModal = document.getElementById('viewModal');
    const closeAddModal = document.getElementById('closeAddModal');
    const closeViewModal = document.getElementById('closeViewModal');
    const openAddModalBtn = document.getElementById('openAddModalBtn');

    // Render shipments table
    function renderShipments() {
        shippingTableBody.innerHTML = '';
        
        shipments.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.destination}</td>
                <td>${item.material}</td>
                <td>${item.quantity}</td>
                <td>${item.date}</td>
                <td><span class="status-${item.status.toLowerCase()}">${item.status}</span></td>
                <td>
                    <button class="action-btn" onclick="viewShipment(${index})">View</button>
                </td>
            `;
            shippingTableBody.appendChild(tr);
        });
    }
    
    // Initial render
    renderShipments();
    
    // Open Add Modal
    openAddModalBtn.addEventListener('click', function() {
        addModal.style.display = 'flex';
    });
    
    // Close Add Modal
    closeAddModal.addEventListener('click', function() {
        addModal.style.display = 'none';
    });
    
    // Close View Modal
    closeViewModal.addEventListener('click', function() {
        viewModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === addModal) {
            addModal.style.display = 'none';
        }
        if (event.target === viewModal) {
            viewModal.style.display = 'none';
        }
    });
    
    // Add Shipping Form Submit
    addShippingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const newShipment = {
            id: document.getElementById('shipmentId').value,
            destination: document.getElementById('destination').value,
            material: document.getElementById('material').value,
            quantity: parseInt(document.getElementById('quantity').value),
            date: document.getElementById('date').value,
            status: document.getElementById('status').value
        };
        
        // Add to shipments array
        shipments.unshift(newShipment);
        
        // Re-render table
        renderShipments();
        
        // Show success message
        const successMsg = document.getElementById('addSuccessMsg');
        successMsg.textContent = 'Shipment added successfully!';
        successMsg.style.display = 'block';
        
        // Clear form
        addShippingForm.reset();
        
        // Hide success message after 3 seconds
        setTimeout(function() {
            successMsg.style.display = 'none';
        }, 3000);
    });
    
    // View Shipment Details
    window.viewShipment = function(index) {
        const item = shipments[index];
        const viewShippingDetails = document.getElementById('viewShippingDetails');
        
        viewShippingDetails.innerHTML = `
            <div class="details-grid">
                <p><strong>Shipment ID:</strong> ${item.id}</p>
                <p><strong>Destination:</strong> ${item.destination}</p>
                <p><strong>Material:</strong> ${item.material}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Status:</strong> <span class="status-${item.status.toLowerCase()}">${item.status}</span></p>
                <p><strong>Prepared By:</strong> Jane Doe</p>
                <p><strong>Vehicle:</strong> Truck #T-123</p>
                <p><strong>Notes:</strong> Materials packed and ready for transport.</p>
            </div>
        `;
        
        viewModal.style.display = 'flex';
    };
});
