document.addEventListener('DOMContentLoaded', function() {
    // Sample receivings data
    let receivings = [
        { 
            refNo: "RCV-2024-001", 
            supplier: "ABC Building Supplies", 
            material: "Cement", 
            quantity: 100, 
            dateReceived: "2024-07-05", 
            status: "Received" 
        },
        { 
            refNo: "RCV-2024-002", 
            supplier: "XYZ Hardware", 
            material: "Nails", 
            quantity: 200, 
            dateReceived: "2024-07-06", 
            status: "Pending" 
        },
        { 
            refNo: "RCV-2024-003", 
            supplier: "Metro Paints", 
            material: "Interior Paint", 
            quantity: 20, 
            dateReceived: "2024-07-03", 
            status: "Damaged" 
        }
    ];

    // DOM element references
    const receivingTableBody = document.getElementById('receiving-table-body');
    const addReceivingForm = document.getElementById('addReceivingForm');
    const addModal = document.getElementById('addModal');
    const viewModal = document.getElementById('viewModal');
    const closeAddModal = document.getElementById('closeAddModal');
    const closeViewModal = document.getElementById('closeViewModal');
    const openAddModalBtn = document.getElementById('openAddModalBtn');

    // Render receivings table
    function renderReceivings() {
        receivingTableBody.innerHTML = '';
        
        receivings.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.refNo}</td>
                <td>${item.supplier}</td>
                <td>${item.material}</td>
                <td>${item.quantity}</td>
                <td>${item.dateReceived}</td>
                <td><span class="status-${item.status.toLowerCase()}">${item.status}</span></td>
                <td>
                    <button class="action-btn" onclick="viewReceiving(${index})">View</button>
                </td>
            `;
            receivingTableBody.appendChild(tr);
        });
    }
    
    // Initial render
    renderReceivings();
    
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
    
    // Add Receiving Form Submit
    addReceivingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const newReceiving = {
            refNo: document.getElementById('refNo').value,
            supplier: document.getElementById('supplier').value,
            material: document.getElementById('material').value,
            quantity: parseInt(document.getElementById('quantity').value),
            dateReceived: document.getElementById('dateReceived').value,
            status: document.getElementById('status').value
        };
        
        // Add to receivings array
        receivings.unshift(newReceiving);
        
        // Re-render table
        renderReceivings();
        
        // Show success message
        const successMsg = document.getElementById('addSuccessMsg');
        successMsg.textContent = 'Receiving added successfully!';
        successMsg.style.display = 'block';
        
        // Clear form
        addReceivingForm.reset();
        
        // Hide success message after 3 seconds
        setTimeout(function() {
            successMsg.style.display = 'none';
        }, 3000);
    });
    
    // View Receiving Details
    window.viewReceiving = function(index) {
        const item = receivings[index];
        const viewReceivingDetails = document.getElementById('viewReceivingDetails');
        
        viewReceivingDetails.innerHTML = `
            <div class="details-grid">
                <p><strong>Reference No:</strong> ${item.refNo}</p>
                <p><strong>Supplier:</strong> ${item.supplier}</p>
                <p><strong>Material:</strong> ${item.material}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Date Received:</strong> ${item.dateReceived}</p>
                <p><strong>Status:</strong> <span class="status-${item.status.toLowerCase()}">${item.status}</span></p>
                <p><strong>Received By:</strong> John Smith</p>
                <p><strong>Notes:</strong> Material received and stored in Zone A.</p>
            </div>
        `;
        
        viewModal.style.display = 'flex';
    };
});
