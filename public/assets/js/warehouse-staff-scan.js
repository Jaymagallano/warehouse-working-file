document.addEventListener('DOMContentLoaded', function() {
    // References to DOM elements
    const videoElement = document.getElementById('scanner-video');
    const startScanBtn = document.getElementById('start-scan');
    const captureScanBtn = document.getElementById('capture-scan');
    const toggleCameraBtn = document.getElementById('toggle-camera');
    const resultContainer = document.getElementById('result-container');
    const scanHistoryList = document.getElementById('scan-history-list');
    const scanOptionBtns = document.querySelectorAll('.scan-option-btn');
    
    // For camera selection
    let currentCamera = 'environment'; // 'environment' (back) or 'user' (front)
    let stream = null;
    
    // Demo inventory data for scanned items
    const demoInventory = {
        '123456789012': {
            id: 'MAT-001',
            name: 'Premium Cement',
            category: 'Building Materials',
            location: 'Warehouse A, Zone 2, Shelf 3',
            quantity: 120,
            unit: 'bags'
        },
        '789012345678': {
            id: 'MAT-002',
            name: 'Steel Rebar (10mm)',
            category: 'Steel Products',
            location: 'Warehouse B, Zone 1, Shelf 5',
            quantity: 85,
            unit: 'pcs'
        },
        '456789012345': {
            id: 'MAT-003',
            name: 'Interior Paint (White)',
            category: 'Finishing Materials',
            location: 'Warehouse C, Zone 3, Shelf 1',
            quantity: 32,
            unit: 'buckets'
        }
    };
    
    // Handle scan option buttons
    scanOptionBtns.forEach(button => {
        button.addEventListener('click', function() {
            scanOptionBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Start camera
    startScanBtn.addEventListener('click', function() {
        if (stream) {
            stopCamera();
            startScanBtn.textContent = 'Start Camera';
        } else {
            startCamera();
            startScanBtn.textContent = 'Stop Camera';
        }
    });
    
    // Toggle between front and back camera
    toggleCameraBtn.addEventListener('click', function() {
        if (stream) {
            currentCamera = currentCamera === 'environment' ? 'user' : 'environment';
            stopCamera();
            startCamera();
        }
    });
    
    // Simulate barcode capture (in a real app, this would use a barcode scanning library)
    captureScanBtn.addEventListener('click', function() {
        if (!stream) {
            alert('Please start the camera first.');
            return;
        }
        
        // Simulate scanning a barcode (randomly select from demo inventory)
        const barcodes = Object.keys(demoInventory);
        const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
        processBarcodeScan(randomBarcode);
    });
    
    function startCamera() {
        const constraints = {
            video: { 
                facingMode: currentCamera,
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };
        
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(mediaStream) {
                stream = mediaStream;
                videoElement.srcObject = mediaStream;
                videoElement.play();
                
                // In a real app, you'd initialize a barcode scanning library here
                // Example: initBarcodeScanner();
            })
            .catch(function(err) {
                console.error('Error accessing camera:', err);
                alert('Could not access the camera. Please ensure you have given permission.');
            });
    }
    
    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoElement.srcObject = null;
            stream = null;
            
            // In a real app, you'd stop the barcode scanner here
            // Example: stopBarcodeScanner();
        }
    }
    
    // Enhanced stock movement functionality
    function processBarcodeScan(barcode) {
        const item = demoInventory[barcode];
        const scanOption = document.querySelector('.scan-option-btn.active').dataset.option;
        
        if (item) {
            resultContainer.innerHTML = `
                <div class="scan-result-item">
                    <p><strong>Barcode:</strong> ${barcode}</p>
                    <p><strong>Item:</strong> ${item.name}</p>
                    <p><strong>ID:</strong> ${item.id}</p>
                    <p><strong>Location:</strong> ${item.location}</p>
                    <p><strong>Quantity:</strong> ${item.quantity} ${item.unit}</p>
                </div>
                <button class="action-btn" onclick="viewScannedItem('${barcode}')">View Details</button>
            `;
            
            // Add to scan history
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            
            const historyItem = document.createElement('li');
            historyItem.innerHTML = `
                <div class="scan-info">
                    <span class="scan-barcode">${item.id}: ${item.name}</span>
                </div>
                <span class="scan-time">${timeString}</span>
            `;
            scanHistoryList.prepend(historyItem);
            
            // Keep only last 5 items
            if (scanHistoryList.children.length > 5) {
                scanHistoryList.removeChild(scanHistoryList.lastChild);
            }
            
            // Show action based on scan option and update inventory
            updateInventoryBasedOnScan(scanOption, item, barcode);
        } else {
            resultContainer.innerHTML = `
                <div class="scan-result-item error">
                    <p>Barcode not recognized: ${barcode}</p>
                </div>
                <button class="action-btn">Add New Item</button>
            `;
        }
    }
    
    function updateInventoryBasedOnScan(option, item, barcode) {
        let actionMessage = '';
        let quantityChange = 0;
        
        switch(option) {
            case 'receive':
                quantityChange = 1; // Default to 1, in real app would prompt for quantity
                demoInventory[barcode].quantity += quantityChange;
                actionMessage = `<div class="action-message success">
                    Item received: ${quantityChange} ${item.unit} of ${item.name} added to inventory. 
                    New quantity: ${demoInventory[barcode].quantity} ${item.unit}
                </div>`;
                break;
                
            case 'check':
                actionMessage = `<div class="action-message">
                    Inventory check: ${item.quantity} ${item.unit} of ${item.name} confirmed at ${item.location}
                </div>`;
                // No change to inventory
                break;
                
            case 'move':
                // In a real app, would prompt for new location
                const newLocation = "Warehouse B, Zone 4";
                const oldLocation = item.location;
                demoInventory[barcode].location = newLocation;
                actionMessage = `<div class="action-message warning">
                    Item moved: ${item.name} relocated from ${oldLocation} to ${newLocation}
                </div>`;
                break;
                
            case 'ship':
                quantityChange = 1; // Default to 1, in real app would prompt for quantity
                if (demoInventory[barcode].quantity >= quantityChange) {
                    demoInventory[barcode].quantity -= quantityChange;
                    actionMessage = `<div class="action-message">
                        Item shipped: ${quantityChange} ${item.unit} of ${item.name} removed from inventory.
                        Remaining: ${demoInventory[barcode].quantity} ${item.unit}
                    </div>`;
                } else {
                    actionMessage = `<div class="action-message error">
                        Error: Cannot ship more than available inventory (${demoInventory[barcode].quantity} ${item.unit})
                    </div>`;
                }
                break;
        }
        
        document.getElementById('result-container').innerHTML += actionMessage;
        
        // Log the inventory change (in a real app, this would update the database)
        console.log(`Inventory updated for ${item.id}:`, demoInventory[barcode]);
    }
    
    // View scanned item details
    window.viewScannedItem = function(barcode) {
        const item = demoInventory[barcode];
        const itemModal = document.getElementById('itemModal');
        const itemDetails = document.getElementById('scanned-item-details');
        
        if (item) {
            itemDetails.innerHTML = `
                <p><strong>ID:</strong> ${item.id}</p>
                <p><strong>Name:</strong> ${item.name}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Quantity:</strong> ${item.quantity} ${item.unit}</p>
                <p><strong>Barcode:</strong> ${barcode}</p>
            `;
            
            itemModal.style.display = 'flex';
        }
    };
    
    // Close modal
    document.getElementById('closeItemModal').addEventListener('click', function() {
        document.getElementById('itemModal').style.display = 'none';
    });
    
    // Handle update and move buttons
    document.getElementById('update-item-btn').addEventListener('click', function() {
        alert('Update quantity feature would open here');
    });
    
    document.getElementById('move-item-btn').addEventListener('click', function() {
        alert('Move item feature would open here');
    });
    
    // Close on outside click
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('itemModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', stopCamera);
});
