document.addEventListener('DOMContentLoaded', function() {
    // Populate Notifications List
    const notificationList = document.getElementById('notification-list');
    const notifications = [
        { text: "Low stock alert: Paint (5 cans left)", time: "10 minutes ago" },
        { text: "New shipment scheduled for tomorrow", time: "2 hours ago" },
        { text: "Physical inventory count due by Friday", time: "Yesterday" }
    ];
    
    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="activity-icon">⚠️</div>
            <div class="activity-content">
                <div class="activity-text">${notification.text}</div>
                <div class="activity-time">${notification.time}</div>
            </div>
        `;
        notificationList.appendChild(li);
    });

    // Populate Activity List
    const activityList = document.getElementById('activity-list');
    const activities = [
        { text: "Scanned 20 boxes of nails into inventory", time: "30 minutes ago" },
        { text: "Completed physical count of paint supplies", time: "2 hours ago" },
        { text: "Prepared shipment #SH-1234 for delivery", time: "Yesterday, 4:30 PM" },
        { text: "Received delivery from Supplier XYZ", time: "Yesterday, 10:15 AM" }
    ];
    
    activities.forEach(activity => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="activity-icon">📋</div>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        activityList.appendChild(li);
    });
    
    // Task button actions
    document.querySelectorAll('.task-action').forEach(button => {
        button.addEventListener('click', function() {
            const taskCard = this.parentElement;
            const taskHeader = taskCard.querySelector('.task-header').textContent;
            
            if (this.textContent === 'Start Task') {
                this.textContent = 'Continue';
                taskCard.querySelector('.task-status').textContent = 'In Progress';
                taskCard.querySelector('.task-status').style.color = '#1a8f1a';
                
                // Add to activity
                const newActivity = document.createElement('li');
                newActivity.innerHTML = `
                    <div class="activity-icon">🔄</div>
                    <div class="activity-content">
                        <div class="activity-text">Started task: ${taskHeader}</div>
                        <div class="activity-time">Just now</div>
                    </div>
                `;
                activityList.insertBefore(newActivity, activityList.firstChild);
            } else {
                alert(`Continuing task: ${taskHeader}`);
            }
        });
    });
});
