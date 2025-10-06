const batches = [
    { batch: "2024-07-06A", material: "Plywood", quantity: 10, received: "2024-06-01", expiry: "2024-07-16", status: "Warning", notes: "Expires soon" },
    { batch: "2024-06-20B", material: "Paint", quantity: 20, received: "2024-06-10", expiry: "2025-06-10", status: "OK", notes: "Quality check passed" },
    { batch: "2024-05-15C", material: "Cement", quantity: 50, received: "2024-05-15", expiry: "2024-06-15", status: "Expired", notes: "Expired batch" }
];

function renderBatches(filter = "") {
    const tbody = document.getElementById('batch-table-body');
    tbody.innerHTML = "";
    batches
        .filter(b =>
            b.batch.toLowerCase().includes(filter) ||
            b.material.toLowerCase().includes(filter) ||
            b.status.toLowerCase().includes(filter)
        )
        .forEach((b, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${b.batch}</td>
                <td>${b.material}</td>
                <td>${b.quantity}</td>
                <td>${b.received}</td>
                <td>${b.expiry}</td>
                <td class="status-${b.status.toLowerCase()}">${b.status}</td>
                <td>${b.notes}</td>
                <td><button class="view-btn" onclick="viewBatch(${idx})">View</button></td>
            `;
            tbody.appendChild(tr);
        });
}

window.viewBatch = function(idx) {
    const b = batches[idx];
    const details = `
        <strong>Batch/Lot No.:</strong> ${b.batch}<br>
        <strong>Material:</strong> ${b.material}<br>
        <strong>Quantity:</strong> ${b.quantity}<br>
        <strong>Received Date:</strong> ${b.received}<br>
        <strong>Expiry Date:</strong> ${b.expiry}<br>
        <strong>Status:</strong> ${b.status}<br>
        <strong>Notes:</strong> ${b.notes}
    `;
    document.getElementById('batchDetails').innerHTML = details;
    document.getElementById('batchModal').style.display = "flex";
};

document.getElementById('closeBatchModal').onclick = function() {
    document.getElementById('batchModal').style.display = "none";
};

document.getElementById('batchSearchInput').addEventListener('input', function() {
    renderBatches(this.value.trim().toLowerCase());
});

window.onclick = function(event) {
    if (event.target === document.getElementById('batchModal')) {
        document.getElementById('batchModal').style.display = "none";
    }
};

document.addEventListener('DOMContentLoaded', () => renderBatches());
