document.addEventListener('DOMContentLoaded', function() {
    // DOM element references
    const newCountBtn = document.getElementById('newCountBtn');
    const viewHistoryBtn = document.getElementById('viewHistoryBtn');
    const newCountModal = document.getElementById('newCountModal');
    const closeNewCountModal = document.getElementById('closeNewCountModal');
    const newCountForm = document.getElementById('newCountForm');
    
    // Open new count modal
    newCountBtn.addEventListener('click', function() {
        newCountModal.style.display = 'flex';
    });
    
    // Close new count modal
    closeNewCountModal.addEventListener('click', function() {
        newCountModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === newCountModal) {
            newCountModal.style.display = 'none';
        }
    });
    
    // Start new count
    newCountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const location = document.getElementById('countLocation').value;
        const countType = document.getElementById('countType').value;
        
        // In a real app, this would create a new count in the database
        alert(`New ${countType} count started for ${location}`);
        
        // Generate a unique ID for the count
        const countId = 'INV-2024-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        // Add the new count card to the UI
        const activeCountsSection = document.getElementById('active-counts');
        const newCountCard = document.createElement('div');
        newCountCard.className = 'count-card';
        newCountCard.innerHTML = `
            <div class="count-header">
                <h3>Count #${countId}</h3>
                <span class="count-status in-progress">Just Started</span>
            </div>
            <div class="count-details">
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Started:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Items Counted:</strong> 0</p>
            </div>
            <button class="count-action">Begin Count</button>
        `;
        
        activeCountsSection.insertBefore(newCountCard, activeCountsSection.firstChild);
        
        // Set up the action button for the new card
        newCountCard.querySelector('.count-action').addEventListener('click', function() {
            alert(`Starting count process for ${countId} at ${location}`);
            // In a real app, this would navigate to a count entry screen
        });
        
        // Close the modal
        newCountModal.style.display = 'none';
        newCountForm.reset();
    });
    
    // Set up existing count action buttons
    document.querySelectorAll('.count-card .count-action').forEach(button => {
        button.addEventListener('click', function() {
            const countCard = this.closest('.count-card');
            const countId = countCard.querySelector('h3').textContent.split('#')[1];
            const status = countCard.querySelector('.count-status').textContent;
            
            if (status.includes('In Progress') || status.includes('Just Started')) {
                alert(`Continuing count for ${countId}`);
                // In a real app, this would open the count entry screen
            } else {
                alert(`Viewing results for ${countId}`);
                // In a real app, this would open the count results screen
            }
        });
    });
    
    // View history button
    viewHistoryBtn.addEventListener('click', function() {
        alert('This would display the count history screen');
        // In a real app, this would navigate to a history page or open a modal
    });
});
