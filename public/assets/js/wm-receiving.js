let receivings = [
    { refNo: "RCV-001", supplier: "Supplier X", material: "Cement", quantity: 100, dateReceived: "2024-07-01", status: "Received" },
    { refNo: "RCV-002", supplier: "Supplier Y", material: "Rebar", quantity: 50, dateReceived: "2024-07-02", status: "Pending" },
    { refNo: "RCV-003", supplier: "Supplier Z", material: "Paint", quantity: 20, dateReceived: "2024-07-03", status: "Damaged" }
];

function renderReceivings() {
    const tbody = document.getElementById('receiving-table-body');
    tbody.innerHTML = "";
    receivings.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.refNo}</td>
            <td>${item.supplier}</td>
            <td>${item.material}</td>
            <td>${item.quantity}</td>
            <td>${item.dateReceived}</td>
            <td class="status-${item.status.toLowerCase()}">${item.status}</td>
            <td>
                <button class="action-btn" onclick="viewReceiving(${idx})">View</button>
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
const viewReceivingDetails = document.getElementById('viewReceivingDetails');
function viewReceiving(idx) {
    const item = receivings[idx];
    viewReceivingDetails.innerHTML = `
        <strong>Reference No.:</strong> ${item.refNo}<br>
        <strong>Supplier:</strong> ${item.supplier}<br>
        <strong>Material:</strong> ${item.material}<br>
        <strong>Quantity:</strong> ${item.quantity}<br>
        <strong>Date Received:</strong> ${item.dateReceived}<br>
        <strong>Status:</strong> ${item.status}
    `;
    viewModal.style.display = "flex";
}
closeViewModal.onclick = () => { viewModal.style.display = "none"; };

// Delete Modal logic
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const deleteReceivingDetails = document.getElementById('deleteReceivingDetails');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
let deleteIdx = null;
function openDeleteModal(idx) {
    const item = receivings[idx];
    deleteReceivingDetails.innerHTML = `
        Are you sure you want to delete <strong>${item.refNo}</strong> (${item.material})?
    `;
    deleteModal.style.display = "flex";
    deleteIdx = idx;
}
closeDeleteModal.onclick = () => { deleteModal.style.display = "none"; };
cancelDeleteBtn.onclick = () => { deleteModal.style.display = "none"; };
confirmDeleteBtn.onclick = () => {
    if (deleteIdx !== null) {
        receivings.splice(deleteIdx, 1);
        renderReceivings();
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
window.viewReceiving = viewReceiving;
window.openDeleteModal = openDeleteModal;

// Add Receiving Form
document.getElementById('addReceivingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newItem = {
        refNo: document.getElementById('refNo').value,
        supplier: document.getElementById('supplier').value,
        material: document.getElementById('material').value,
        quantity: document.getElementById('quantity').value,
        dateReceived: document.getElementById('dateReceived').value,
        status: document.getElementById('status').value
    };
    receivings.push(newItem);
    renderReceivings();
    document.getElementById('addSuccessMsg').textContent = 'Receiving added successfully!';
    document.getElementById('addSuccessMsg').style.display = 'block';
    setTimeout(() => {
        document.getElementById('addSuccessMsg').style.display = 'none';
        document.getElementById('addReceivingForm').reset();
        addModal.style.display = "none";
    }, 1200);
});

// Edit Receiving Modal logic
function openEditModal(idx) {
    const item = receivings[idx];
    document.getElementById('editRefNo').value = item.refNo;
    document.getElementById('editSupplier').value = item.supplier;
    document.getElementById('editMaterial').value = item.material;
    document.getElementById('editQuantity').value = item.quantity;
    document.getElementById('editDateReceived').value = item.dateReceived;
    document.getElementById('editStatus').value = item.status;
    editModal.style.display = "flex";
    editModal.dataset.idx = idx;
}

// Edit Receiving Form
document.getElementById('editReceivingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const idx = editModal.dataset.idx;
    receivings[idx].supplier = document.getElementById('editSupplier').value;
    receivings[idx].material = document.getElementById('editMaterial').value;
    receivings[idx].quantity = document.getElementById('editQuantity').value;
    receivings[idx].dateReceived = document.getElementById('editDateReceived').value;
    receivings[idx].status = document.getElementById('editStatus').value;
    renderReceivings();
    document.getElementById('editSuccessMsg').textContent = 'Receiving updated successfully!';
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
renderReceivings();
