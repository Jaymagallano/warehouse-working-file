document.addEventListener('DOMContentLoaded', function() {
    // Sample inventory data
    const inventory = [
        { id: "MAT-001", name: "Cement", category: "Building Materials", stock: 120, unit: "bags", location: "Warehouse A, Zone 1", status: "OK" },
        { id: "MAT-002", name: "Steel Rebar (10mm)", category: "Steel Products", stock: 85, unit: "pcs", location: "Warehouse A, Zone 2", status: "OK" },
        { id: "MAT-003", name: "Interior Paint (White)", category: "Finishing Materials", stock: 8, unit: "buckets", location: "Warehouse B, Zone 3", status: "Low" },
        { id: "MAT-004", name: "Power Drill", category: "Tools & Equipment", stock: 0, unit: "pcs", location: "Warehouse B, Zone 4", status: "Out" },
        { id: "MAT-005", name: "Concrete Blocks", category: "Building Materials", stock: 350, unit: "pcs", location: "Warehouse A, Zone 1", status: "OK" }
    ];
    
    function renderInventory(items) {
        const tbody = document.getElementById('inventory-table-body');
        tbody.innerHTML = '';
        
        items.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.stock}</td>
                <td>${item.unit}</td>
                <td>${item.location}</td>
                <td><span class="status-${item.status.toLowerCase()}">${item.status}</span></td>
                <td>
                    <button class="action-btn" onclick="viewItem(${index})">View</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
    
    // Initial render
    renderInventory(inventory);
    
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', function() {
        const searchTerm = document.getElementById('inventorySearchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        
        const filteredInventory = inventory.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                              item.id.toLowerCase().includes(searchTerm);
            
            const matchesCategory = categoryFilter === 'all' || 
                                item.category.toLowerCase().includes(categoryFilter.toLowerCase());
            
            return matchesSearch && matchesCategory;
        });
        
        renderInventory(filteredInventory);
    });
    
    // View item details
    window.viewItem = function(index) {
        const item = inventory[index];
        const itemModal = document.getElementById('itemModal');
        const itemDetails = document.getElementById('itemDetails');
        
        itemDetails.innerHTML = `
            <p><strong>ID:</strong> ${item.id}</p>
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Stock:</strong> ${item.stock} ${item.unit}</p>
            <p><strong>Location:</strong> ${item.location}</p>
            <p><strong>Status:</strong> <span class="status-${item.status.toLowerCase()}">${item.status}</span></p>
            <p><strong>Last Updated:</strong> July 10, 2024</p>
            <p><strong>Minimum Stock Level:</strong> 10 ${item.unit}</p>
        `;
        
        itemModal.style.display = 'flex';
    };
    
    // Close modal
    document.getElementById('closeItemModal').addEventListener('click', function() {
        document.getElementById('itemModal').style.display = 'none';
    });
    
    // Close on outside click
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('itemModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
