document.addEventListener('DOMContentLoaded', function() {
    // Sample invoices data
    const invoices = [
        {
            id: "INV-2024-001",
            poReference: "PO-2024-032",
            supplier: "ABC Building Supplies",
            issueDate: "2024-07-02",
            dueDate: "2024-08-01",
            amount: 12500.00,
            status: "Pending",
            matchStatus: {
                po: true,
                receipt: true,
                price: true
            },
            notes: "",
            paymentDetails: {},
            history: [
                { date: "2024-07-02", action: "Invoice Registered", user: "Michael Brown", notes: "Invoice received and entered into system" }
            ],
            items: [
                { description: "Portland Cement", quantity: 50, unitPrice: 12.50, total: 625.00 },
                { description: "Sand", quantity: 30, unitPrice: 8.50, total: 255.00 }
            ]
        },
        {
            id: "INV-2024-002",
            poReference: "PO-2024-028",
            supplier: "Steel Works Inc.",
            issueDate: "2024-06-28",
            dueDate: "2024-07-28",
            amount: 1700.00,
            status: "Matched",
            matchStatus: {
                po: true,
                receipt: true,
                price: true
            },
            notes: "All items received and matched with PO",
            paymentDetails: {},
            history: [
                { date: "2024-06-28", action: "Invoice Registered", user: "Michael Brown", notes: "Invoice received and entered into system" },
                { date: "2024-07-01", action: "Invoice Matched", user: "Michael Brown", notes: "All items verified against PO and receipt" }
            ],
            items: [
                { description: "Steel Rebar (10mm)", quantity: 20, unitPrice: 85.00, total: 1700.00 }
            ]
        },
        {
            id: "INV-2024-003",
            poReference: "PO-2024-022",
            supplier: "Metro Paints",
            issueDate: "2024-06-26",
            dueDate: "2024-07-26",
            amount: 2280.00,
            status: "Approved",
            matchStatus: {
                po: true,
                receipt: true,
                price: true
            },
            notes: "Approved for payment",
            paymentDetails: {
                scheduledDate: "2024-07-15",
                paymentMethod: "Bank Transfer"
            },
            history: [
                { date: "2024-06-26", action: "Invoice Registered", user: "Michael Brown", notes: "Invoice received and entered into system" },
                { date: "2024-06-28", action: "Invoice Matched", user: "Michael Brown", notes: "All items verified against PO and receipt" },
                { date: "2024-07-01", action: "Invoice Approved", user: "Sarah Johnson", notes: "Approved and forwarded to accounts payable" }
            ],
            items: [
                { description: "Interior Paint (White)", quantity: 15, unitPrice: 120.00, total: 1800.00 },
                { description: "Paint Brushes", quantity: 25, unitPrice: 8.50, total: 212.50 },
                { description: "Painter's Tape", quantity: 30, unitPrice: 4.25, total: 127.50 }
            ]
        },
        {
            id: "INV-2024-004",
            poReference: "PO-2024-015",
            supplier: "Electrical Supplies Co.",
            issueDate: "2024-06-15",
            dueDate: "2024-07-15",
            amount: 3150.00,
            status: "Paid",
            matchStatus: {
                po: true,
                receipt: true,
                price: true
            },
            notes: "",
            paymentDetails: {
                paidDate: "2024-07-10",
                paymentMethod: "Bank Transfer",
                paymentReference: "PAY-2024-045"
            },
            history: [
                { date: "2024-06-15", action: "Invoice Registered", user: "Michael Brown", notes: "Invoice received and entered into system" },
                { date: "2024-06-17", action: "Invoice Matched", user: "Michael Brown", notes: "All items verified against PO and receipt" },
                { date: "2024-06-20", action: "Invoice Approved", user: "Sarah Johnson", notes: "Approved and forwarded to accounts payable" },
                { date: "2024-07-10", action: "Payment Processed", user: "Finance Dept", notes: "Payment completed via bank transfer" }
            ],
            items: [
                { description: "Electrical Conduit", quantity: 10, unitPrice: 45.00, total: 450.00 },
                { description: "Circuit Breakers", quantity: 5, unitPrice: 65.00, total: 325.00 },
                { description: "Electrical Wiring (200m)", quantity: 1, unitPrice: 400.00, total: 400.00 }
            ]
        },
        {
            id: "INV-2024-005",
            poReference: "PO-2024-030",
            supplier: "ABC Building Supplies",
            issueDate: "2024-06-30",
            dueDate: "2024-07-30",
            amount: 1105.75,
            status: "Disputed",
            matchStatus: {
                po: true,
                receipt: false,
                price: false
            },
            notes: "Price discrepancy on plywood sheets. Contacted supplier for clarification.",
            paymentDetails: {},
            history: [
                { date: "2024-06-30", action: "Invoice Registered", user: "Michael Brown", notes: "Invoice received and entered into system" },
                { date: "2024-07-01", action: "Discrepancy Found", user: "Michael Brown", notes: "Price on invoice doesn't match PO for plywood sheets" },
                { date: "2024-07-02", action: "Disputed", user: "Michael Brown", notes: "Contacted supplier about price discrepancy" }
            ],
            items: [
                { description: "Plywood Sheets (3/4\")", quantity: 30, unitPrice: 35.50, total: 1065.00 },
                { description: "Wood Screws", quantity: 5, unitPrice: 8.15, total: 40.75 }
            ]
        },
        {
            id: "INV-2024-006",
            poReference: "PO-2024-024",
            supplier: "Plumbing Pro",
            issueDate: "2024-06-25",
            dueDate: "2024-07-25",
            amount: 3465.00,
            status: "Pending",
            matchStatus: {
                po: true,
                receipt: false,
                price: true
            },
            notes: "Waiting for delivery confirmation",
            paymentDetails: {},
            history: [
                { date: "2024-06-25", action: "Invoice Registered", user: "Michael Brown", notes: "Invoice received before delivery" }
            ],
            items: [
                { description: "Copper Pipes (1/2\")", quantity: 15, unitPrice: 210.00, total: 3150.00 },
                { description: "PVC Fittings", quantity: 50, unitPrice: 6.30, total: 315.00 }
            ]
        }
    ];

    // Sample purchase orders for dropdown
    const purchaseOrders = [
        { id: "PO-2024-032", supplier: "ABC Building Supplies", total: 12500.00 },
        { id: "PO-2024-028", supplier: "Steel Works Inc.", total: 1700.00 },
        { id: "PO-2024-024", supplier: "Plumbing Pro", total: 3465.00 },
        { id: "PO-2024-036", supplier: "Metro Paints", total: 860.00 },
        { id: "PO-2024-038", supplier: "Electrical Supplies Co.", total: 1250.00 }
    ];

    // Sample suppliers for dropdown
    const suppliers = [
        "ABC Building Supplies",
        "Steel Works Inc.",
        "Metro Paints",
        "Electrical Supplies Co.",
        "Plumbing Pro"
    ];

    // DOM element references
    const invoicesTableBody = document.getElementById('invoices-table-body');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchBtn = document.getElementById('search-btn');
    const registerInvoiceBtn = document.getElementById('register-invoice-btn');
    const registerInvoiceModal = document.getElementById('registerInvoiceModal');
    const viewInvoiceModal = document.getElementById('viewInvoiceModal');
    const processInvoiceModal = document.getElementById('processInvoiceModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const closeViewModal = document.getElementById('closeViewModal');
    const closeProcessModal = document.getElementById('closeProcessModal');
    const registerInvoiceForm = document.getElementById('registerInvoiceForm');
    const processInvoiceForm = document.getElementById('processInvoiceForm');
    const cancelRegisterBtn = document.getElementById('cancel-register-btn');
    const cancelProcessBtn = document.getElementById('cancel-process-btn');

    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(invoices.length / itemsPerPage);

    // Update pagination info
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;

    // Update invoice statistics
    updateInvoiceStats();

    // Render invoices table
    renderInvoicesTable();

    // Event listeners for tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab to show
            const tabToShow = this.dataset.tab;
            
            // Filter invoices based on tab
            filterInvoicesByTab(tabToShow);
        });
    });

    // Search button click handler
    searchBtn.addEventListener('click', searchInvoices);

    // Register invoice button click handler
    registerInvoiceBtn.addEventListener('click', function() {
        openRegisterInvoiceModal();
    });

    // Modal close buttons
    closeRegisterModal.addEventListener('click', function() {
        registerInvoiceModal.style.display = 'none';
    });

    closeViewModal.addEventListener('click', function() {
        viewInvoiceModal.style.display = 'none';
    });

    closeProcessModal.addEventListener('click', function() {
        processInvoiceModal.style.display = 'none';
    });

    // Cancel buttons
    cancelRegisterBtn.addEventListener('click', function() {
        registerInvoiceModal.style.display = 'none';
    });

    cancelProcessBtn.addEventListener('click', function() {
        processInvoiceModal.style.display = 'none';
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === registerInvoiceModal) {
            registerInvoiceModal.style.display = 'none';
        }
        if (event.target === viewInvoiceModal) {
            viewInvoiceModal.style.display = 'none';
        }
        if (event.target === processInvoiceModal) {
            processInvoiceModal.style.display = 'none';
        }
    });

    // Register invoice form submission
    registerInvoiceForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const invoiceNumber = document.getElementById('invoice-number').value;
        const poReference = document.getElementById('po-reference').value;
        const supplier = document.getElementById('supplier').value;
        const invoiceAmount = parseFloat(document.getElementById('invoice-amount').value);
        const invoiceDate = document.getElementById('invoice-date').value;
        const dueDate = document.getElementById('due-date').value;
        const notes = document.getElementById('invoice-notes').value;

        // Create new invoice object
        const newInvoice = {
            id: invoiceNumber,
            poReference: poReference,
            supplier: supplier,
            issueDate: invoiceDate,
            dueDate: dueDate,
            amount: invoiceAmount,
            status: "Pending",
            matchStatus: {
                po: false,
                receipt: false,
                price: false
            },
            notes: notes,
            paymentDetails: {},
            history: [
                { date: new Date().toISOString().slice(0, 10), action: "Invoice Registered", user: "Michael Brown", notes: "Invoice received and entered into system" }
            ],
            items: [] // In a real app, this would be populated with line items
        };

        // Add to invoices array
        invoices.unshift(newInvoice);

        // Update UI
        updateInvoiceStats();
        renderInvoicesTable();

        // Close modal and reset form
        registerInvoiceModal.style.display = 'none';
        registerInvoiceForm.reset();

        // Show success message
        alert(`Invoice ${invoiceNumber} has been registered successfully.`);
    });

    // Process invoice form submission
    processInvoiceForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const invoiceId = document.getElementById('process-invoice-id').value;
        const decision = document.querySelector('input[name="invoice-decision"]:checked').value;
        const notes = document.getElementById('processing-notes').value;

        // Find the invoice
        const invoice = invoices.find(inv => inv.id === invoiceId);
        if (!invoice) return;

        // Update status based on decision
        if (decision === 'approve') {
            invoice.status = "Approved";
            invoice.history.push({ 
                date: new Date().toISOString().slice(0, 10), 
                action: "Invoice Approved", 
                user: "Michael Brown", 
                notes: notes || "Approved and forwarded to accounts payable" 
            });
            invoice.paymentDetails.scheduledDate = new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().slice(0, 10);
            invoice.paymentDetails.paymentMethod = "Bank Transfer";
        } else if (decision === 'hold') {
            invoice.status = "Matched";
            invoice.history.push({ 
                date: new Date().toISOString().slice(0, 10), 
                action: "Invoice On Hold", 
                user: "Michael Brown", 
                notes: notes || "Invoice processing on hold pending further review" 
            });
        } else if (decision === 'dispute') {
            invoice.status = "Disputed";
            invoice.history.push({ 
                date: new Date().toISOString().slice(0, 10), 
                action: "Invoice Disputed", 
                user: "Michael Brown", 
                notes: notes || "Invoice disputed due to discrepancies" 
            });
        }

        // Update UI
        updateInvoiceStats();
        renderInvoicesTable();

        // Close modal
        processInvoiceModal.style.display = 'none';

        // Show success message
        alert(`Invoice ${invoiceId} has been ${decision === 'approve' ? 'approved' : (decision === 'hold' ? 'put on hold' : 'disputed')}.`);
    });

    // Pagination controls
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            document.getElementById('current-page').textContent = currentPage;
            renderInvoicesTable();
            updatePaginationButtons();
        }
    });

    document.getElementById('next-page').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            document.getElementById('current-page').textContent = currentPage;
            renderInvoicesTable();
            updatePaginationButtons();
        }
    });

    // Functions

    // Update invoice statistics
    function updateInvoiceStats() {
        document.getElementById('total-invoices').textContent = invoices.length;
        document.getElementById('pending-invoices').textContent = invoices.filter(inv => inv.status === "Pending").length;
        document.getElementById('overdue-invoices').textContent = invoices.filter(inv => 
            (inv.status !== "Paid" && inv.status !== "Approved") && 
            new Date(inv.dueDate) < new Date()
        ).length;
        document.getElementById('paid-invoices').textContent = invoices.filter(inv => inv.status === "Paid").length;
    }

    // Render invoices table
    function renderInvoicesTable(filteredInvoices = null) {
        const invsToRender = filteredInvoices || invoices;
        invoicesTableBody.innerHTML = '';

        // Calculate start and end indices for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, invsToRender.length);

        for (let i = startIndex; i < endIndex; i++) {
            const invoice = invsToRender[i];
            const row = document.createElement('tr');

            // Check if invoice is overdue
            const isOverdue = (invoice.status !== "Paid" && invoice.status !== "Approved") && 
                              new Date(invoice.dueDate) < new Date();

            row.innerHTML = `
                <td>${invoice.id}</td>
                <td>${invoice.poReference}</td>
                <td>${invoice.supplier}</td>
                <td>${invoice.issueDate}</td>
                <td>${invoice.dueDate}${isOverdue ? ' <span class="status-badge status-disputed">Overdue</span>' : ''}</td>
                <td>$${invoice.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td><span class="status-badge status-${invoice.status.toLowerCase()}">${invoice.status}</span></td>
                <td>
                    <button class="action-btn view-invoice-btn" data-id="${invoice.id}">View</button>
                    ${invoice.status === "Pending" || invoice.status === "Matched" ? 
                      `<button class="secondary-btn process-invoice-btn" data-id="${invoice.id}">Process</button>` : ''}
                </td>
            `;

            invoicesTableBody.appendChild(row);
        }

        // Add click handlers to buttons
        document.querySelectorAll('.view-invoice-btn').forEach(button => {
            button.addEventListener('click', function() {
                const invoiceId = this.dataset.id;
                viewInvoice(invoiceId);
            });
        });

        document.querySelectorAll('.process-invoice-btn').forEach(button => {
            button.addEventListener('click', function() {
                const invoiceId = this.dataset.id;
                processInvoice(invoiceId);
            });
        });

        updatePaginationButtons();
    }

    // Filter invoices by tab
    function filterInvoicesByTab(tabName) {
        let filteredInvoices;

        switch (tabName) {
            case 'pending-review':
                filteredInvoices = invoices.filter(inv => inv.status === "Pending");
                break;
            case 'approved':
                filteredInvoices = invoices.filter(inv => inv.status === "Approved");
                break;
            case 'disputed':
                filteredInvoices = invoices.filter(inv => inv.status === "Disputed");
                break;
            case 'all-invoices':
            default:
                filteredInvoices = invoices;
                break;
        }

        // Reset pagination when filtering
        currentPage = 1;
        document.getElementById('current-page').textContent = currentPage;

        // Update total pages for filtered results
        const totalFilteredPages = Math.ceil(filteredInvoices.length / itemsPerPage) || 1;
        document.getElementById('total-pages').textContent = totalFilteredPages;

        renderInvoicesTable(filteredInvoices);
    }

    // Search invoices
    function searchInvoices() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const statusFilter = document.getElementById('status-filter').value;

        let filtered = [...invoices];

        // Apply search term filter
        if (searchTerm) {
            filtered = filtered.filter(invoice => 
                invoice.id.toLowerCase().includes(searchTerm) ||
                invoice.poReference.toLowerCase().includes(searchTerm) ||
                invoice.supplier.toLowerCase().includes(searchTerm)
            );
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(invoice => 
                invoice.status.toLowerCase() === statusFilter
            );
        }

        // Reset pagination for filtered results
        currentPage = 1;
        document.getElementById('current-page').textContent = currentPage;

        // Update total pages for filtered results
        const totalFilteredPages = Math.ceil(filtered.length / itemsPerPage) || 1;
        document.getElementById('total-pages').textContent = totalFilteredPages;

        renderInvoicesTable(filtered);
    }

    // Open register invoice modal
    function openRegisterInvoiceModal() {
        // Reset form
        registerInvoiceForm.reset();

        // Populate PO reference dropdown
        const poSelect = document.getElementById('po-reference');
        poSelect.innerHTML = '<option value="">Select Purchase Order</option>';
        purchaseOrders.forEach(po => {
            const option = document.createElement('option');
            option.value = po.id;
            option.textContent = `${po.id} - ${po.supplier} ($${po.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})})`;
            poSelect.appendChild(option);
        });

        // Populate supplier dropdown
        const supplierSelect = document.getElementById('supplier');
        supplierSelect.innerHTML = '<option value="">Select Supplier</option>';
        suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier;
            option.textContent = supplier;
            supplierSelect.appendChild(option);
        });

        // Set today's date as default for invoice date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('invoice-date').value = today;

        // Set default due date to 30 days from today
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        document.getElementById('due-date').value = dueDate.toISOString().split('T')[0];

        // Show modal
        registerInvoiceModal.style.display = 'flex';
    }

    // View invoice details
    function viewInvoice(invoiceId) {
        const invoice = invoices.find(inv => inv.id === invoiceId);
        if (!invoice) return;

        const invoiceDetails = document.getElementById('invoice-details');
        const invoiceActions = document.getElementById('invoice-actions');

        // Generate HTML for invoice details
        let detailsHTML = `
            <div class="invoice-detail-header">
                <div class="invoice-id">
                    ${invoice.id}
                    <span class="status-badge status-${invoice.status.toLowerCase()} invoice-status-label">${invoice.status}</span>
                </div>
                <div class="invoice-info-grid">
                    <div class="invoice-info-item">
                        <div class="info-label">PO Reference</div>
                        <div class="info-value">${invoice.poReference}</div>
                    </div>
                    <div class="invoice-info-item">
                        <div class="info-label">Supplier</div>
                        <div class="info-value">${invoice.supplier}</div>
                    </div>
                    <div class="invoice-info-item">
                        <div class="info-label">Issue Date</div>
                        <div class="info-value">${invoice.issueDate}</div>
                    </div>
                    <div class="invoice-info-item">
                        <div class="info-label">Due Date</div>
                        <div class="info-value">${invoice.dueDate}</div>
                    </div>
                    <div class="invoice-info-item">
                        <div class="info-label">Amount</div>
                        <div class="info-value">$${invoice.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    </div>
                    <div class="invoice-info-item">
                        <div class="info-label">Notes</div>
                        <div class="info-value">${invoice.notes || "No notes"}</div>
                    </div>
                </div>
            </div>

            <h4>Invoice Items</h4>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        // Add invoice items
        if (invoice.items && invoice.items.length > 0) {
            invoice.items.forEach(item => {
                detailsHTML += `
                    <tr>
                        <td>${item.description}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.unitPrice.toFixed(2)}</td>
                        <td>$${item.total.toFixed(2)}</td>
                    </tr>
                `;
            });
        } else {
            detailsHTML += `
                <tr>
                    <td colspan="4" class="no-data">No line items available</td>
                </tr>
            `;
        }

        detailsHTML += `
                    </tbody>
                </table>
            </div>
        `;

        // Add payment details if available
        if (invoice.status === "Approved" || invoice.status === "Paid") {
            detailsHTML += `
                <h4>Payment Information</h4>
                <div class="invoice-info-grid">
            `;

            if (invoice.status === "Approved") {
                detailsHTML += `
                    <div class="invoice-info-item">
                        <div class="info-label">Scheduled Payment Date</div>
                        <div class="info-value">${invoice.paymentDetails.scheduledDate || "Not scheduled"}</div>
                    </div>
                    <div class="invoice-info-item">
                        <div class="info-label">Payment Method</div>
                        <div class="info-value">${invoice.paymentDetails.paymentMethod || "Not specified"}</div>
                    </div>
                `;
            } else if (invoice.status === "Paid") {
                detailsHTML += `
                    <div class="invoice-info-item">
                        <div class="info-label">Payment Date</div>
                        <div class="info-value">${invoice.paymentDetails.paidDate || "Not recorded"}</div>
                    </div>
                    <div class="invoice-info-item">
                        <div class="info-label">Payment Method</div>
                        <div class="info-value">${invoice.paymentDetails.paymentMethod || "Not specified"}</div>
                    </div>
                    <div class="invoice-info-item">
                        <div class="info-label">Payment Reference</div>
                        <div class="info-value">${invoice.paymentDetails.paymentReference || "Not available"}</div>
                    </div>
                `;
            }

            detailsHTML += `
                </div>
            `;
        }

        // Add activity history
        detailsHTML += `
            <h4>Activity History</h4>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Action</th>
                            <th>User</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        if (invoice.history && invoice.history.length > 0) {
            invoice.history.forEach(entry => {
                detailsHTML += `
                    <tr>
                        <td>${entry.date}</td>
                        <td>${entry.action}</td>
                        <td>${entry.user}</td>
                        <td>${entry.notes || ""}</td>
                    </tr>
                `;
            });
        } else {
            detailsHTML += `
                <tr>
                    <td colspan="4" class="no-data">No history available</td>
                </tr>
            `;
        }

        detailsHTML += `
                    </tbody>
                </table>
            </div>
        `;

        invoiceDetails.innerHTML = detailsHTML;

        // Set action buttons based on invoice status
        invoiceActions.innerHTML = '';

        if (invoice.status === "Pending" || invoice.status === "Matched") {
            invoiceActions.innerHTML = `
                <button id="view-process-btn" class="primary-btn">Process</button>
                <button id="view-download-btn" class="secondary-btn">Download</button>
            `;
            
            document.getElementById('view-process-btn').addEventListener('click', function() {
                viewInvoiceModal.style.display = 'none';
                processInvoice(invoice.id);
            });
        } else if (invoice.status === "Disputed") {
            invoiceActions.innerHTML = `
                <button id="view-resolve-btn" class="primary-btn">Resolve Dispute</button>
                <button id="view-download-btn" class="secondary-btn">Download</button>
            `;
            
            document.getElementById('view-resolve-btn').addEventListener('click', function() {
                alert(`This would open a form to resolve the dispute for invoice ${invoice.id}`);
            });
        } else {
            invoiceActions.innerHTML = `
                <button id="view-download-btn" class="secondary-btn">Download</button>
            `;
        }

        document.getElementById('view-download-btn').addEventListener('click', function() {
            alert(`This would download the invoice ${invoice.id}`);
        });

        // Show modal
        viewInvoiceModal.style.display = 'flex';
    }

    // Process invoice
    function processInvoice(invoiceId) {
        const invoice = invoices.find(inv => inv.id === invoiceId);
        if (!invoice) return;

        // Set invoice ID in form
        document.getElementById('process-invoice-id').value = invoiceId;

        // Populate invoice info
        const invoiceInfoContainer = document.getElementById('process-invoice-info');
        invoiceInfoContainer.innerHTML = `
            <div class="info-item">
                <div class="info-label">Invoice Number</div>
                <div class="info-value">${invoice.id}</div>
            </div>
            <div class="info-item">
                <div class="info-label">PO Reference</div>
                <div class="info-value">${invoice.poReference}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Supplier</div>
                <div class="info-value">${invoice.supplier}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Amount</div>
                <div class="info-value">$${invoice.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
        `;

        // Set 3-way match status
        // In a real app, this would be determined by comparing PO, GRN and Invoice data
        setTimeout(() => {
            // PO match status
            const poMatchStatus = document.getElementById('po-match-status');
            if (invoice.matchStatus.po) {
                poMatchStatus.textContent = "Matched";
                poMatchStatus.className = "match-status match-success";
            } else {
                poMatchStatus.textContent = "Not Matched";
                poMatchStatus.className = "match-status match-fail";
            }

            // Receipt match status
            const grMatchStatus = document.getElementById('gr-match-status');
            if (invoice.matchStatus.receipt) {
                grMatchStatus.textContent = "Matched";
                grMatchStatus.className = "match-status match-success";
            } else if (invoice.status === "Pending" && invoice.id === "INV-2024-006") {
                grMatchStatus.textContent = "Pending Receipt";
                grMatchStatus.className = "match-status match-warning";
            } else {
                grMatchStatus.textContent = "Not Matched";
                grMatchStatus.className = "match-status match-fail";
            }

            // Price match status
            const priceMatchStatus = document.getElementById('price-match-status');
            if (invoice.matchStatus.price) {
                priceMatchStatus.textContent = "Matched";
                priceMatchStatus.className = "match-status match-success";
            } else {
                priceMatchStatus.textContent = "Discrepancy";
                priceMatchStatus.className = "match-status match-fail";
            }
        }, 500);

        // Reset radio buttons
        document.getElementById('approve-invoice').checked = false;
        document.getElementById('hold-invoice').checked = false;
        document.getElementById('dispute-invoice').checked = false;

        // Reset notes
        document.getElementById('processing-notes').value = '';

        // Show modal
        processInvoiceModal.style.display = 'flex';
    }

    // Update pagination buttons
    function updatePaginationButtons() {
        document.getElementById('prev-page').disabled = (currentPage === 1);
        document.getElementById('next-page').disabled = (currentPage === parseInt(document.getElementById('total-pages').textContent));
    }
});
