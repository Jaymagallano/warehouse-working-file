// Dynamic inventory data from database
let inventory = [];
const API_BASE = '/warehouse-manager';

// Load inventory from database on page load
document.addEventListener('DOMContentLoaded', function() {
    loadInventoryFromDatabase();
});

// Load inventory from database
async function loadInventoryFromDatabase() {
    try {
        const response = await fetch(`${API_BASE}/api-inventory`);
        const data = await response.json();
        inventory = data.map(item => ({
            id: item.id,
            name: item.item_name,
            category: item.category,
            stock: item.quantity,
            unit: item.unit,
            status: getStockStatus(item.quantity),
            item_code: item.item_code,
            location: item.location,
            batch_number: item.batch_number
        }));
        renderInventory();
    } catch (error) {
        console.error('Error loading inventory:', error);
        alert('Failed to load inventory from database');
    }
}

// Determine stock status based on quantity
function getStockStatus(quantity) {
    if (quantity < 10) return 'Low';
    if (quantity < 50) return 'Medium';
    return 'OK';
}

function renderInventory() {
    const tbody = document.getElementById('inventory-table-body');
    tbody.innerHTML = "";
    
    if (inventory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;">No inventory items found</td></tr>';
        return;
    }
    
    inventory.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.stock}</td>
            <td>${item.unit}</td>
            <td class="status-${item.status.toLowerCase()}">${item.status}</td>
            <td>
                <button class="action-btn" onclick="viewItem(${idx})">View</button>
                <button class="action-btn" onclick="openEditModal(${idx})">Edit</button>
                <button class="action-btn" onclick="openDeleteModal(${idx})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// View Modal logic
const viewModal = document.getElementById('viewModal');
const closeViewModal = document.getElementById('closeViewModal');
const viewItemDetails = document.getElementById('viewItemDetails');
function viewItem(idx) {
    const item = inventory[idx];
    viewItemDetails.innerHTML = `
        <strong>Material Name:</strong> ${item.name}<br>
        <strong>Category:</strong> ${item.category}<br>
        <strong>Stock:</strong> ${item.stock}<br>
        <strong>Unit:</strong> ${item.unit}<br>
        <strong>Status:</strong> ${item.status}
    `;
    viewModal.style.display = "flex";
}
closeViewModal.onclick = () => { viewModal.style.display = "none"; };

// Delete Modal logic
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const deleteItemDetails = document.getElementById('deleteItemDetails');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
let deleteIdx = null;
function openDeleteModal(idx) {
    const item = inventory[idx];
    deleteItemDetails.innerHTML = `
        Are you sure you want to delete <strong>${item.name}</strong> (${item.category})?
    `;
    deleteModal.style.display = "flex";
    deleteIdx = idx;
}
closeDeleteModal.onclick = () => { deleteModal.style.display = "none"; };
cancelDeleteBtn.onclick = () => { deleteModal.style.display = "none"; };
confirmDeleteBtn.onclick = async () => {
    if (deleteIdx !== null) {
        const item = inventory[deleteIdx];
        
        try {
            const response = await fetch(`${API_BASE}/api-inventory-delete/${item.id}`, {
                method: 'POST'
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Reload inventory from database
                await loadInventoryFromDatabase();
                deleteModal.style.display = "none";
                deleteIdx = null;
                alert('Item deleted successfully!');
            } else {
                alert('Failed to delete item: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting inventory:', error);
            alert('Failed to delete item from database');
        }
    }
};

// Modal logic for Add/Edit
const addModal = document.getElementById('addModal');
const openAddModalBtn = document.getElementById('openAddModalBtn');
const closeAddModal = document.getElementById('closeAddModal');
openAddModalBtn.onclick = () => { addModal.style.display = "flex"; };
closeAddModal.onclick = () => { addModal.style.display = "none"; };

const editModal = document.getElementById('editModal');
const closeEditModal = document.getElementById('closeEditModal');
closeEditModal.onclick = () => { editModal.style.display = "none"; };

window.openEditModal = openEditModal;
window.viewItem = viewItem;
window.openDeleteModal = openDeleteModal;

// Add Inventory Form
document.getElementById('addInventoryForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const itemName = document.getElementById('materialName').value;
    const newItem = {
        item_code: generateItemCode(itemName),
        item_name: itemName,
        category: document.getElementById('category').value,
        quantity: parseInt(document.getElementById('stock').value),
        unit: document.getElementById('unit').value,
        location: 'Warehouse A',
        batch_number: null,
        expiry_date: null
    };
    
    try {
        const response = await fetch(`${API_BASE}/api-inventory-add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });
        
        const result = await response.json();
        
        if (result.success) {
            document.getElementById('addSuccessMsg').textContent = 'Inventory item added successfully!';
            document.getElementById('addSuccessMsg').style.display = 'block';
            
            // Reload inventory from database
            await loadInventoryFromDatabase();
            
            setTimeout(() => {
                document.getElementById('addSuccessMsg').style.display = 'none';
                document.getElementById('addInventoryForm').reset();
                addModal.style.display = "none";
            }, 1200);
        } else {
            alert('Failed to add item: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error adding inventory:', error);
        alert('Failed to add item to database');
    }
});

// Generate item code from name
function generateItemCode(name) {
    const prefix = name.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}-${timestamp}`;
}

// Edit Inventory Modal logic
function openEditModal(idx) {
    const item = inventory[idx];
    document.getElementById('editMaterialName').value = item.name;
    document.getElementById('editCategory').value = item.category;
    document.getElementById('editStock').value = item.stock;
    document.getElementById('editUnit').value = item.unit;
    document.getElementById('editStatus').value = item.status;
    editModal.style.display = "flex";
    editModal.dataset.idx = idx;
}

// Edit Inventory Form
document.getElementById('editInventoryForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const idx = editModal.dataset.idx;
    const item = inventory[idx];
    
    const updatedItem = {
        item_name: document.getElementById('editMaterialName').value,
        category: document.getElementById('editCategory').value,
        quantity: parseInt(document.getElementById('editStock').value),
        unit: document.getElementById('editUnit').value
    };
    
    try {
        const response = await fetch(`${API_BASE}/api-inventory-update/${item.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        });
        
        const result = await response.json();
        
        if (result.success) {
            document.getElementById('editSuccessMsg').textContent = 'Inventory item updated successfully!';
            document.getElementById('editSuccessMsg').style.display = 'block';
            
            // Reload inventory from database
            await loadInventoryFromDatabase();
            
            setTimeout(() => {
                document.getElementById('editSuccessMsg').style.display = 'none';
                editModal.style.display = "none";
            }, 1200);
        } else {
            alert('Failed to update item: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error updating inventory:', error);
        alert('Failed to update item in database');
    }
});

// Global modal close on background click
window.onclick = function(event) {
    if (event.target === addModal) addModal.style.display = "none";
    if (event.target === editModal) editModal.style.display = "none";
    if (event.target === viewModal) viewModal.style.display = "none";
    if (event.target === deleteModal) deleteModal.style.display = "none";
};

// Initial render
renderInventory();
