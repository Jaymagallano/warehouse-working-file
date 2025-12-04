let shipments = [
    { id: "SHP-001", destination: "Site A", material: "Cement", quantity: 100, date: "2024-07-01", status: "Pending" },
    { id: "SHP-002", destination: "Site B", material: "Rebar", quantity: 50, date: "2024-07-02", status: "Shipped" },
    { id: "SHP-003", destination: "Site C", material: "Paint", quantity: 20, date: "2024-07-03", status: "Delivered" }
];

function renderShipments() {
    const tbody = document.getElementById('shipping-table-body');
    tbody.innerHTML = "";
    shipments.forEach((s, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.id}</td>
            <td>${s.destination}</td>
            <td>${s.material}</td>
            <td>${s.quantity}</td>
            <td>${s.date}</td>
            <td class="status-${s.status.toLowerCase()}">${s.status}</td>
            <td>
                <button class="action-btn" onclick="viewShipment(${idx})">View</button>
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
const viewShippingDetails = document.getElementById('viewShippingDetails');
function viewShipment(idx) {
    const s = shipments[idx];
    viewShippingDetails.innerHTML = `
        <strong>Shipment ID:</strong> ${s.id}<br>
        <strong>Destination:</strong> ${s.destination}<br>
        <strong>Material:</strong> ${s.material}<br>
        <strong>Quantity:</strong> ${s.quantity}<br>
        <strong>Date:</strong> ${s.date}<br>
        <strong>Status:</strong> ${s.status}
    `;
    viewModal.style.display = "flex";
}
closeViewModal.onclick = () => { viewModal.style.display = "none"; };

// Delete Modal logic
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const deleteShippingDetails = document.getElementById('deleteShippingDetails');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
let deleteIdx = null;
function openDeleteModal(idx) {
    const s = shipments[idx];
    deleteShippingDetails.innerHTML = `
        Are you sure you want to delete <strong>${s.id}</strong> (${s.material})?
    `;
    deleteModal.style.display = "flex";
    deleteIdx = idx;
}
closeDeleteModal.onclick = () => { deleteModal.style.display = "none"; };
cancelDeleteBtn.onclick = () => { deleteModal.style.display = "none"; };
confirmDeleteBtn.onclick = () => {
    if (deleteIdx !== null) {
        shipments.splice(deleteIdx, 1);
        renderShipments();
        deleteModal.style.display = "none";
        deleteIdx = null;
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
window.viewShipment = viewShipment;
window.openDeleteModal = openDeleteModal;

// Add Shipment Form
document.getElementById('addShippingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newShipment = {
        id: document.getElementById('shipmentId').value,
        destination: document.getElementById('destination').value,
        material: document.getElementById('material').value,
        quantity: document.getElementById('quantity').value,
        date: document.getElementById('date').value,
        status: document.getElementById('status').value
    };
    shipments.push(newShipment);
    renderShipments();
    document.getElementById('addSuccessMsg').textContent = 'Shipment added successfully!';
    document.getElementById('addSuccessMsg').style.display = 'block';
    setTimeout(() => {
        document.getElementById('addSuccessMsg').style.display = 'none';
        document.getElementById('addShippingForm').reset();
        addModal.style.display = "none";
    }, 1200);
});

// Edit Shipment Modal logic
function openEditModal(idx) {
    const s = shipments[idx];
    document.getElementById('editShipmentId').value = s.id;
    document.getElementById('editDestination').value = s.destination;
    document.getElementById('editMaterial').value = s.material;
    document.getElementById('editQuantity').value = s.quantity;
    document.getElementById('editDate').value = s.date;
    document.getElementById('editStatus').value = s.status;
    editModal.style.display = "flex";
    editModal.dataset.idx = idx;
}

// Edit Shipment Form
document.getElementById('editShippingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const idx = editModal.dataset.idx;
    shipments[idx].destination = document.getElementById('editDestination').value;
    shipments[idx].material = document.getElementById('editMaterial').value;
    shipments[idx].quantity = document.getElementById('editQuantity').value;
    shipments[idx].date = document.getElementById('editDate').value;
    shipments[idx].status = document.getElementById('editStatus').value;
    renderShipments();
    document.getElementById('editSuccessMsg').textContent = 'Shipment updated successfully!';
    document.getElementById('editSuccessMsg').style.display = 'block';
    setTimeout(() => {
        document.getElementById('editSuccessMsg').style.display = 'none';
        editModal.style.display = "none";
    }, 1200);
});

// Global modal close on background click
window.onclick = function(event) {
    if (event.target === addModal) addModal.style.display = "none";
    if (event.target === editModal) editModal.style.display = "none";
    if (event.target === viewModal) viewModal.style.display = "none";
    if (event.target === deleteModal) deleteModal.style.display = "none";
};

// Initial render
renderShipments();
