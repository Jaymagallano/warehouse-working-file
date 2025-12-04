document.addEventListener('DOMContentLoaded', function() {
    // Sample audit data
    const upcomingAudits = [
        { 
            id: "AUD-2024-001", 
            date: "2024-07-15", 
            warehouse: "Warehouse A", 
            type: "Cycle Count",
            status: "Scheduled" 
        },
        { 
            id: "AUD-2024-002", 
            date: "2024-07-18", 
            warehouse: "Warehouse C", 
            type: "Full Inventory",
            status: "Scheduled" 
        },
        { 
            id: "AUD-2024-003", 
            date: "2024-07-22", 
            warehouse: "Warehouse B", 
            type: "Spot Check",
            status: "Scheduled" 
        }
    ];

    // Sample audit reports
    const auditReports = [
        {
            id: "RPT-2024-005",
            title: "June Monthly Audit Report",
            date: "2024-06-30",
            warehouse: "All Warehouses"
        },
        {
            id: "RPT-2024-004",
            title: "Spot Check - Electrical Supplies",
            date: "2024-06-15",
            warehouse: "Warehouse B"
        },
        {
            id: "RPT-2024-003",
            title: "Cycle Count - Building Materials",
            date: "2024-06-10",
            warehouse: "Warehouse A"
        }
    ];

    // Sample discrepancies
    const discrepancies = [
        {
            item: "Cement",
            location: "Warehouse A, Zone 1",
            system: 200,
            physical: 195,
            variance: -5
        },
        {
            item: "Steel Rebar",
            location: "Warehouse B, Zone 2",
            system: 150,
            physical: 152,
            variance: 2
        },
        {
            item: "Paint",
            location: "Warehouse C, Zone 3",
            system: 75,
            physical: 72,
            variance: -3
        }
    ];

    // Populate upcoming audits table
    const auditTableBody = document.getElementById('audit-table-body');
    
    upcomingAudits.forEach(audit => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${audit.id}</td>
            <td>${audit.date}</td>
            <td>${audit.warehouse}</td>
            <td>${audit.type}</td>
            <td><span class="status-${audit.status.toLowerCase()}">${audit.status}</span></td>
            <td><button class="audit-action" data-audit-id="${audit.id}">View</button></td>
        `;
        auditTableBody.appendChild(tr);
    });

    // Populate audit reports
    const reportsListElement = document.getElementById('audit-reports-list');
    
    auditReports.forEach(report => {
        const reportCard = document.createElement('div');
        reportCard.className = 'report-card';
        reportCard.innerHTML = `
            <div class="report-details">
                <h4>${report.title}</h4>
                <p>${report.date} - ${report.warehouse}</p>
            </div>
            <div class="report-icon">📊</div>
        `;
        reportsListElement.appendChild(reportCard);
    });

    // Populate discrepancies list
    const discrepancyListElement = document.getElementById('discrepancy-list');
    
    discrepancies.forEach(discrepancy => {
        const li = document.createElement('li');
        const varianceClass = discrepancy.variance < 0 ? 'negative' : 'positive';
        const varianceSign = discrepancy.variance > 0 ? '+' : '';
        
        li.innerHTML = `
            <div class="discrepancy-item">
                <div class="discrepancy-details">
                    <div class="discrepancy-title">${discrepancy.item}</div>
                    <div class="discrepancy-location">${discrepancy.location}</div>
                </div>
                <div class="discrepancy-variance ${varianceClass}">
                    ${varianceSign}${discrepancy.variance}
                </div>
            </div>
        `;
        discrepancyListElement.appendChild(li);
    });

    // Generate calendar
    generateCalendar();

    // Add event listeners for audit action buttons
    document.querySelectorAll('.audit-action').forEach(button => {
        button.addEventListener('click', function() {
            const auditId = this.dataset.auditId;
            showAuditDetails(auditId);
        });
    });

    // Handle report card clicks
    document.querySelectorAll('.report-card').forEach(card => {
        card.addEventListener('click', function() {
            const reportTitle = this.querySelector('h4').textContent;
            alert(`Opening report: ${reportTitle}`);
            // In a real app, this would navigate to the report details
        });
    });

    // Audit Modal Elements
    const auditModal = document.getElementById('auditModal');
    const closeAuditModal = document.getElementById('closeAuditModal');
    const startAuditBtn = document.getElementById('start-audit-btn');
    const rescheduleBtn = document.getElementById('reschedule-btn');
    
    // Close audit modal when clicking X
    closeAuditModal.addEventListener('click', function() {
        auditModal.style.display = 'none';
    });
    
    // Close audit modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === auditModal) {
            auditModal.style.display = 'none';
        }
    });
    
    // Start audit button
    startAuditBtn.addEventListener('click', function() {
        const auditId = this.dataset.auditId;
        alert(`Starting audit process for ${auditId}`);
        auditModal.style.display = 'none';
        // In a real app, this would navigate to the audit process screen
    });
    
    // Reschedule button
    rescheduleBtn.addEventListener('click', function() {
        const auditId = this.dataset.auditId;
        alert(`Opening reschedule dialog for ${auditId}`);
        // In a real app, this would open a date picker to reschedule
    });

    // Calendar navigation
    document.getElementById('prev-month').addEventListener('click', function() {
        // In a real app, this would show the previous month
        alert('Navigating to previous month');
    });
    
    document.getElementById('next-month').addEventListener('click', function() {
        // In a real app, this would show the next month
        alert('Navigating to next month');
    });

    // Function to show audit details in modal
    function showAuditDetails(auditId) {
        const audit = upcomingAudits.find(a => a.id === auditId);
        if (!audit) return;
        
        const auditDetailsElement = document.getElementById('audit-details');
        auditDetailsElement.innerHTML = `
            <div class="audit-detail-grid">
                <p><strong>Audit ID:</strong> ${audit.id}</p>
                <p><strong>Date:</strong> ${audit.date}</p>
                <p><strong>Warehouse:</strong> ${audit.warehouse}</p>
                <p><strong>Type:</strong> ${audit.type}</p>
                <p><strong>Status:</strong> <span class="status-${audit.status.toLowerCase()}">${audit.status}</span></p>
                <p><strong>Materials:</strong> All categories</p>
                <p><strong>Assigned To:</strong> John Smith</p>
                <p><strong>Estimated Duration:</strong> 2-3 hours</p>
                <p><strong>Instructions:</strong> Perform complete inventory verification for specified location. Document any discrepancies in the system.</p>
            </div>
        `;
        
        startAuditBtn.dataset.auditId = auditId;
        rescheduleBtn.dataset.auditId = auditId;
        
        auditModal.style.display = 'flex';
    }

    // Function to generate calendar
    function generateCalendar() {
        const calendarGrid = document.querySelector('.calendar-grid');
        const daysInMonth = 31; // Simplified for demo
        const firstDay = 1; // Monday (0 = Sunday, 1 = Monday, etc.)
        
        // Add empty spaces for days before the first of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Check if this day has an audit scheduled
            const dateString = `2024-07-${day.toString().padStart(2, '0')}`;
            const hasAudit = upcomingAudits.some(a => a.date === dateString);
            
            if (hasAudit) {
                dayElement.classList.add('has-event');
                dayElement.addEventListener('click', function() {
                    alert(`Audit scheduled on July ${day}, 2024`);
                    // In a real app, this would show audit details for that day
                });
            }
            
            // Mark today
            if (day === 12) { // Assuming today is July 12 for the demo
                dayElement.classList.add('today');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
});
