document.addEventListener('DOMContentLoaded', function() {
    // Sample audit schedule data
    const auditSchedule = [
        { 
            id: "AUD-2024-001", 
            date: "2024-07-15", 
            warehouse: "Warehouse A", 
            zone: "All Zones",
            type: "Cycle Count",
            assignee: "John Smith",
            status: "Scheduled",
            notes: "Focus on building materials section." 
        },
        { 
            id: "AUD-2024-002", 
            date: "2024-07-18", 
            warehouse: "Warehouse C", 
            zone: "Zone B",
            type: "Full Inventory",
            assignee: "Sarah Johnson",
            status: "Scheduled",
            notes: "Annual inventory verification." 
        },
        { 
            id: "AUD-2024-003", 
            date: "2024-07-22", 
            warehouse: "Warehouse B", 
            zone: "Zone A",
            type: "Spot Check",
            assignee: "Michael Brown",
            status: "Scheduled",
            notes: "Verify electrical supplies after recent discrepancy report." 
        },
        { 
            id: "AUD-2024-004", 
            date: "2024-07-08", 
            warehouse: "Warehouse A", 
            zone: "Zone C",
            type: "Cycle Count",
            assignee: "John Smith",
            status: "Completed",
            notes: "Monthly cycle count completed." 
        },
        { 
            id: "AUD-2024-005", 
            date: "2024-07-10", 
            warehouse: "Warehouse B", 
            zone: "All Zones",
            type: "Spot Check",
            assignee: "Sarah Johnson",
            status: "In Progress",
            notes: "Checking inventory levels after system update." 
        }
    ];

    // DOM element references
    const calendarView = document.getElementById('calendar-view');
    const listView = document.getElementById('list-view');
    const scheduleTableBody = document.getElementById('schedule-table-body');
    const calendarGridFull = document.querySelector('.calendar-grid-full');
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    
    const newAuditBtn = document.getElementById('new-audit-btn');
    const newAuditModal = document.getElementById('newAuditModal');
    const closeNewAuditModal = document.getElementById('closeNewAuditModal');
    const newAuditForm = document.getElementById('newAuditForm');
    
    const auditDetailsModal = document.getElementById('auditDetailsModal');
    const closeAuditDetailsModal = document.getElementById('closeAuditDetailsModal');
    const filterBtn = document.getElementById('filter-btn');

    // Initialize
    renderCalendarView();
    renderListView();

    // Tab switching
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active tab
            scheduleTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected view, hide others
            if (view === 'calendar') {
                calendarView.style.display = 'block';
                listView.style.display = 'none';
            } else {
                calendarView.style.display = 'none';
                listView.style.display = 'block';
            }
        });
    });

    // Filter button
    filterBtn.addEventListener('click', function() {
        const warehouseFilter = document.getElementById('warehouse-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        
        filterAudits(warehouseFilter, statusFilter);
    });

    // Open new audit modal
    newAuditBtn.addEventListener('click', function() {
        newAuditModal.style.display = 'flex';
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('auditDate').valueAsDate = tomorrow;
    });
    
    // Close new audit modal
    closeNewAuditModal.addEventListener('click', function() {
        newAuditModal.style.display = 'none';
    });
    
    // Close audit details modal
    closeAuditDetailsModal.addEventListener('click', function() {
        auditDetailsModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === newAuditModal) {
            newAuditModal.style.display = 'none';
        }
        if (event.target === auditDetailsModal) {
            auditDetailsModal.style.display = 'none';
        }
    });
    
    // New audit form submission
    newAuditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = document.getElementById('auditType').value;
        const warehouse = document.getElementById('auditWarehouse').value;
        const zone = document.getElementById('auditZone').value;
        const date = document.getElementById('auditDate').value;
        const assignee = document.getElementById('auditAssignee').value;
        const notes = document.getElementById('auditNotes').value;
        
        // Generate a new audit ID
        const newId = 'AUD-2024-' + (auditSchedule.length + 1).toString().padStart(3, '0');
        
        // Create new audit object
        const newAudit = {
            id: newId,
            date: date,
            warehouse: warehouse,
            zone: zone,
            type: type,
            assignee: assignee,
            status: 'Scheduled',
            notes: notes
        };
        
        // Add to audit schedule array
        auditSchedule.push(newAudit);
        
        // Re-render views
        renderCalendarView();
        renderListView();
        
        // Close modal and reset form
        newAuditModal.style.display = 'none';
        newAuditForm.reset();
        
        // Show success message
        alert(`Audit ${newId} scheduled successfully for ${date}`);
    });
    
    // Button actions in details modal
    document.getElementById('start-schedule-audit-btn').addEventListener('click', function() {
        const auditId = this.dataset.auditId;
        alert(`Starting audit process for ${auditId}`);
        
        // Update audit status
        const audit = auditSchedule.find(a => a.id === auditId);
        if (audit) {
            audit.status = 'In Progress';
            renderCalendarView();
            renderListView();
        }
        
        auditDetailsModal.style.display = 'none';
    });
    
    document.getElementById('edit-schedule-btn').addEventListener('click', function() {
        const auditId = this.dataset.auditId;
        alert(`Edit audit form would open for ${auditId}`);
    });
    
    document.getElementById('delete-schedule-btn').addEventListener('click', function() {
        const auditId = this.dataset.auditId;
        
        if (confirm(`Are you sure you want to delete audit ${auditId}?`)) {
            // Remove from array
            const index = auditSchedule.findIndex(a => a.id === auditId);
            if (index !== -1) {
                auditSchedule.splice(index, 1);
                renderCalendarView();
                renderListView();
                alert(`Audit ${auditId} has been deleted`);
                auditDetailsModal.style.display = 'none';
            }
        }
    });

    // Render calendar view
    function renderCalendarView() {
        // Clear previous calendar days except headers
        const headerElements = document.querySelectorAll('.calendar-day.day-header');
        calendarGridFull.innerHTML = '';
        
        // Add headers back
        headerElements.forEach(header => {
            calendarGridFull.appendChild(header.cloneNode(true));
        });
        
        const year = 2024;
        const month = 6; // July (0-based)
        
        const firstDay = new Date(year, month, 1).getDay(); // 0-6 (Sunday-Saturday)
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty spaces for days before the first of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            calendarGridFull.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Add day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);
            
            // Mark today
            if (day === 12) { // Assuming today is July 12 for the demo
                dayElement.classList.add('today');
            }
            
            // Check for events on this day
            const dateString = `2024-07-${day.toString().padStart(2, '0')}`;
            const dayAudits = auditSchedule.filter(a => a.date === dateString);
            
            dayAudits.forEach(audit => {
                const eventElement = document.createElement('div');
                
                // Set class based on audit type
                let eventClass = '';
                switch(audit.type) {
                    case 'Full Inventory':
                        eventClass = 'event-full';
                        break;
                    case 'Cycle Count':
                        eventClass = 'event-cycle';
                        break;
                    case 'Spot Check':
                        eventClass = 'event-spot';
                        break;
                }
                
                eventElement.className = `calendar-event ${eventClass}`;
                eventElement.textContent = `${audit.type} - ${audit.warehouse}`;
                eventElement.dataset.auditId = audit.id;
                
                eventElement.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showAuditDetails(audit.id);
                });
                
                dayElement.appendChild(eventElement);
            });
            
            // Add day element to calendar
            calendarGridFull.appendChild(dayElement);
        }
    }
    
    // Render list view
    function renderListView(filteredAudits = null) {
        const audits = filteredAudits || auditSchedule;
        scheduleTableBody.innerHTML = '';
        
        audits.forEach(audit => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${audit.id}</td>
                <td>${audit.date}</td>
                <td>${audit.warehouse}</td>
                <td>${audit.type}</td>
                <td>${audit.assignee}</td>
                <td><span class="status-${audit.status.toLowerCase().replace(' ', '-')}">${audit.status}</span></td>
                <td><button class="audit-action" data-audit-id="${audit.id}">View</button></td>
            `;
            scheduleTableBody.appendChild(tr);
        });
        
        // Add event listeners to view buttons
        document.querySelectorAll('.audit-action').forEach(button => {
            button.addEventListener('click', function() {
                const auditId = this.dataset.auditId;
                showAuditDetails(auditId);
            });
        });
    }
    
    // Filter audits based on selected filters
    function filterAudits(warehouse, status) {
        let filteredAudits = [...auditSchedule];
        
        if (warehouse !== 'all') {
            filteredAudits = filteredAudits.filter(a => 
                a.warehouse.toLowerCase().includes(warehouse.toLowerCase()));
        }
        
        if (status !== 'all') {
            filteredAudits = filteredAudits.filter(a => 
                a.status.toLowerCase().replace(' ', '-') === status);
        }
        
        renderListView(filteredAudits);
    }
    
    // Show audit details in modal
    function showAuditDetails(auditId) {
        const audit = auditSchedule.find(a => a.id === auditId);
        if (!audit) return;
        
        const auditDetailsElement = document.getElementById('schedule-audit-details');
        auditDetailsElement.innerHTML = `
            <div class="audit-detail-grid">
                <p><strong>Audit ID:</strong> ${audit.id}</p>
                <p><strong>Date:</strong> ${audit.date}</p>
                <p><strong>Warehouse:</strong> ${audit.warehouse}</p>
                <p><strong>Zone/Area:</strong> ${audit.zone}</p>
                <p><strong>Type:</strong> ${audit.type}</p>
                <p><strong>Assigned To:</strong> ${audit.assignee}</p>
                <p><strong>Status:</strong> <span class="status-${audit.status.toLowerCase().replace(' ', '-')}">${audit.status}</span></p>
                <p><strong>Notes:</strong> ${audit.notes}</p>
            </div>
        `;
        
        // Set data attributes for action buttons
        document.getElementById('start-schedule-audit-btn').dataset.auditId = auditId;
        document.getElementById('edit-schedule-btn').dataset.auditId = auditId;
        document.getElementById('delete-schedule-btn').dataset.auditId = auditId;
        
        // Show or hide "Start Audit" button based on status
        const startButton = document.getElementById('start-schedule-audit-btn');
        if (audit.status === 'Scheduled') {
            startButton.style.display = 'block';
        } else {
            startButton.style.display = 'none';
        }
        
        auditDetailsModal.style.display = 'flex';
    }
});
