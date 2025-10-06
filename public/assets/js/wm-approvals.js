let approvals = [
    { id: "APP-001", type: "Stock Transfer", desc: "Transfer 50 sheets Plywood", destination: "Site B", date: "2024-07-10", status: "Pending" },
    { id: "APP-002", type: "Stock Adjustment", desc: "Adjust Cement stock by +10 bags", destination: "-", date: "2024-07-09", status: "Pending" },
    { id: "APP-003", type: "Return", desc: "Return 5 cans Paint", destination: "Site C", date: "2024-07-08", status: "Approved" },
    { id: "APP-004", type: "Stock Transfer", desc: "Transfer 20 pcs Rebar", destination: "Site D", date: "2024-07-07", status: "Rejected" }
];

function renderApprovals() {
    const tbody = document.getElementById('approvals-table-body');
    tbody.innerHTML = "";
    approvals.forEach((a, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${a.id}</td>
            <td>${a.type}</td>
            <td>${a.desc}</td>
            <td>${a.destination}</td>
            <td>${a.date}</td>
            <td class="status-${a.status.toLowerCase()}">${a.status}</td>
            <td>
                ${a.status === "Pending" ? `
                <button class="action-btn" onclick="approveRequest(${idx})">Approve</button>
                <button class="action-btn" onclick="rejectRequest(${idx})">Reject</button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.approveRequest = function(idx) {
    approvals[idx].status = "Approved";
    renderApprovals();
};

window.rejectRequest = function(idx) {
    approvals[idx].status = "Rejected";
    renderApprovals();
};

document.addEventListener('DOMContentLoaded', renderApprovals);
