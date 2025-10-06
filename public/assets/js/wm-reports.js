const demoReports = [
    { date: "2024-07-01", type: "Inventory Overview", desc: "Stock count for Cement", details: "120 bags" },
    { date: "2024-07-02", type: "Low Stock Alerts", desc: "Low stock: Paint", details: "5 cans left" },
    { date: "2024-07-03", type: "Stock Movement Logs", desc: "Shipped Paint to Site C", details: "20 cans" },
    { date: "2024-07-04", type: "Approval Requests", desc: "Pending transfer approval", details: "Order #1234" },
    { date: "2024-07-05", type: "Warehouse Reports", desc: "Monthly inventory summary", details: "See PDF" },
    { date: "2024-07-06", type: "Batch/Lot Tracking", desc: "Batch 2024-07-06A expires soon", details: "Plywood, 10 sheets" }
];

function renderReports(reports) {
    const tbody = document.getElementById('reports-table-body');
    tbody.innerHTML = "";
    reports.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.date}</td>
            <td>${r.type}</td>
            <td>${r.desc}</td>
            <td>${r.details}</td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById('reportFilterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const type = document.getElementById('reportType').value;
    const from = document.getElementById('fromDate').value;
    const to = document.getElementById('toDate').value;
    let filtered = demoReports;
    if (type) {
        filtered = filtered.filter(r => r.type.toLowerCase().includes(type));
    }
    if (from) filtered = filtered.filter(r => r.date >= from);
    if (to) filtered = filtered.filter(r => r.date <= to);
    renderReports(filtered);
});

// Initial render
renderReports(demoReports);
