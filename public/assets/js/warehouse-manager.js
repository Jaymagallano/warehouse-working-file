// Warehouse Manager - Dynamic Dashboard with Real Database Data
const API_BASE = '/warehouse-manager';

// Load all data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    loadRecentActivity();
    loadNotifications();
    loadApprovals();
});

// Load Dashboard Statistics
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_BASE}/api-inventory-stats`);
        const stats = await response.json();
        
        if (document.getElementById('stat-inventory')) {
            document.getElementById('stat-inventory').textContent = stats.total_inventory || '0';
        }
        if (document.getElementById('stat-lowstock')) {
            document.getElementById('stat-lowstock').textContent = stats.low_stock || '0';
        }
        if (document.getElementById('stat-shipments')) {
            document.getElementById('stat-shipments').textContent = stats.pending_shipments || '0';
        }
        if (document.getElementById('stat-receivings')) {
            document.getElementById('stat-receivings').textContent = stats.pending_receiving || '0';
        }
        if (document.getElementById('stat-users')) {
            document.getElementById('stat-users').textContent = stats.total_users || '0';
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// Load Recent Activity
async function loadRecentActivity() {
    try {
        const response = await fetch(`${API_BASE}/api-recent-activity`);
        const activities = await response.json();
        
        const activityList = document.getElementById('activity-list');
        if (activityList) {
            activityList.innerHTML = '';
            
            if (activities.length === 0) {
                activityList.innerHTML = '<li style="color:#999;">No recent activity</li>';
            } else {
                activities.forEach(activity => {
                    const li = document.createElement('li');
                    li.textContent = activity.action + ' - ' + formatDateTime(activity.timestamp);
                    activityList.appendChild(li);
                });
            }
        }
    } catch (error) {
        console.error('Error loading recent activity:', error);
    }
}

// Load Notifications
async function loadNotifications() {
    try {
        const response = await fetch(`${API_BASE}/api-notifications`);
        const notifications = await response.json();
        
        const notificationList = document.getElementById('notification-list');
        if (notificationList) {
            notificationList.innerHTML = '';
            
            if (notifications.length === 0) {
                notificationList.innerHTML = '<li style="color:#999;">No notifications</li>';
            } else {
                notifications.forEach(note => {
                    const li = document.createElement('li');
                    li.className = `notification-${note.type}`;
                    li.textContent = note.message;
                    notificationList.appendChild(li);
                });
            }
        }
    } catch (error) {
        console.error('Error loading notifications:', error);
    }
}

// Load Approval Requests
async function loadApprovals() {
    try {
        const response = await fetch(`${API_BASE}/api-approvals?status=pending`);
        const approvals = await response.json();
        
        const approvalList = document.getElementById('approval-list');
        if (approvalList) {
            approvalList.innerHTML = '';
            
            if (approvals.length === 0) {
                approvalList.innerHTML = '<li style="color:#999;">No pending approvals</li>';
            } else {
                approvals.forEach(approval => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>
                            <strong>${approval.type}:</strong> Request #${approval.id}
                            <span style="color:#e6a700;font-weight:600;margin-left:0.5rem;">${approval.status}</span>
                        </span>
                    `;
                    approvalList.appendChild(li);
                });
            }
        }
    } catch (error) {
        console.error('Error loading approvals:', error);
    }
}

// ==================== INVENTORY MANAGEMENT ====================

// Load Inventory Data
async function loadInventory() {
    try {
        const response = await fetch(`${API_BASE}/api-inventory`);
        const inventory = await response.json();
        
        const tableBody = document.querySelector('#inventory-table tbody');
        if (tableBody) {
            tableBody.innerHTML = '';
            
            if (inventory.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:#999;">No inventory items found</td></tr>';
            } else {
                inventory.forEach(item => {
                    const row = createInventoryRow(item);
                    tableBody.appendChild(row);
                });
            }
        }
    } catch (error) {
        console.error('Error loading inventory:', error);
        alert('Failed to load inventory data');
    }
}

// Create Inventory Table Row
function createInventoryRow(item) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${item.item_code}</td>
        <td>${item.item_name}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td>${item.unit}</td>
        <td>${item.location || '-'}</td>
        <td>${item.batch_number || '-'}</td>
        <td>
            <button class="btn btn-sm btn-primary" onclick="editInventoryItem(${item.id})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteInventoryItem(${item.id})">Delete</button>
        </td>
    `;
    return tr;
}

// Add Inventory Item
async function addInventoryItem(itemData) {
    try {
        const response = await fetch(`${API_BASE}/api-inventory-add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Item added successfully!');
            loadInventory(); // Reload the table
            return true;
        } else {
            alert('Failed to add item: ' + (result.message || 'Unknown error'));
            return false;
        }
    } catch (error) {
        console.error('Error adding inventory item:', error);
        alert('Failed to add item');
        return false;
    }
}

// Update Inventory Item
async function updateInventoryItem(id, itemData) {
    try {
        const response = await fetch(`${API_BASE}/api-inventory-update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Item updated successfully!');
            loadInventory(); // Reload the table
            return true;
        } else {
            alert('Failed to update item: ' + (result.message || 'Unknown error'));
            return false;
        }
    } catch (error) {
        console.error('Error updating inventory item:', error);
        alert('Failed to update item');
        return false;
    }
}

// Delete Inventory Item
async function deleteInventoryItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/api-inventory-delete/${id}`, {
            method: 'POST'
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Item deleted successfully!');
            loadInventory(); // Reload the table
        } else {
            alert('Failed to delete item: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        alert('Failed to delete item');
    }
}

// Edit Inventory Item (show form/modal)
function editInventoryItem(id) {
    // This will open a modal or form with the item data
    // You can implement this based on your UI design
    alert('Edit functionality - Item ID: ' + id);
    // Example: Open modal, load item data, allow editing
}

// ==================== SHIPMENT MANAGEMENT ====================

// Load Shipments
async function loadShipments(type = '') {
    try {
        const url = type ? `${API_BASE}/api-shipments?type=${type}` : `${API_BASE}/api-shipments`;
        const response = await fetch(url);
        const shipments = await response.json();
        
        const tableBody = document.querySelector('#shipments-table tbody');
        if (tableBody) {
            tableBody.innerHTML = '';
            
            if (shipments.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999;">No shipments found</td></tr>';
            } else {
                shipments.forEach(shipment => {
                    const row = createShipmentRow(shipment);
                    tableBody.appendChild(row);
                });
            }
        }
    } catch (error) {
        console.error('Error loading shipments:', error);
        alert('Failed to load shipments data');
    }
}

// Create Shipment Table Row
function createShipmentRow(shipment) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${shipment.shipment_number}</td>
        <td>${shipment.type}</td>
        <td>${shipment.status}</td>
        <td>${shipment.expected_date || '-'}</td>
        <td>${shipment.actual_date || '-'}</td>
        <td>
            <button class="btn btn-sm btn-primary" onclick="updateShipmentStatus(${shipment.id})">Update Status</button>
            <button class="btn btn-sm btn-danger" onclick="deleteShipment(${shipment.id})">Delete</button>
        </td>
    `;
    return tr;
}

// Delete Shipment
async function deleteShipment(id) {
    if (!confirm('Are you sure you want to delete this shipment?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/api-shipment-delete/${id}`, {
            method: 'POST'
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Shipment deleted successfully!');
            loadShipments(); // Reload the table
        } else {
            alert('Failed to delete shipment: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error deleting shipment:', error);
        alert('Failed to delete shipment');
    }
}

// ==================== APPROVAL MANAGEMENT ====================

// Approve Request
async function approveRequest(id) {
    try {
        const response = await fetch(`${API_BASE}/api-approve-request/${id}`, {
            method: 'POST'
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Request approved successfully!');
            loadApprovals(); // Reload approvals
        } else {
            alert('Failed to approve request: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error approving request:', error);
        alert('Failed to approve request');
    }
}

// Reject Request
async function rejectRequest(id) {
    try {
        const response = await fetch(`${API_BASE}/api-reject-request/${id}`, {
            method: 'POST'
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Request rejected successfully!');
            loadApprovals(); // Reload approvals
        } else {
            alert('Failed to reject request: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error rejecting request:', error);
        alert('Failed to reject request');
    }
}

// ==================== UTILITY FUNCTIONS ====================

// Format Date Time
function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
}

// Format Date Only
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

// Export functions for global use
window.loadInventory = loadInventory;
window.addInventoryItem = addInventoryItem;
window.updateInventoryItem = updateInventoryItem;
window.deleteInventoryItem = deleteInventoryItem;
window.editInventoryItem = editInventoryItem;
window.loadShipments = loadShipments;
window.deleteShipment = deleteShipment;
window.approveRequest = approveRequest;
window.rejectRequest = rejectRequest;
