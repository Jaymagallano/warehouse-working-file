document.getElementById('loginForm').addEventListener('submit', function(e) {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
    const errorMsg = document.getElementById('errorMsg');

    if (!username || !password || !role) {
        e.preventDefault();
        errorMsg.textContent = 'Please fill in all fields and select a role.';
        errorMsg.style.display = 'block';
        return;
    }

    errorMsg.style.display = 'none';
    // Let the form submit normally to the server
});

document.querySelector('.forgot-password-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Password reset instructions have been sent to your email (demo only).');
});
