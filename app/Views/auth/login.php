<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign in to WITMS</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/login.css') ?>">
</head>
<body>
    <div class="login-container">
        <img src="<?= base_url('assets/images/WeBuild.png') ?>" alt="WeBuild Warehouse Logo" class="logo-img">
        <form id="loginForm" method="post" action="<?= base_url('authenticate') ?>">
            <?= csrf_field() ?>
            <h2>Sign in to WITMS</h2>
            <input type="text" id="username" name="username" placeholder="Username" autocomplete="username" required>
            <input type="password" id="password" name="password" placeholder="Password" autocomplete="current-password" required>
            <select id="role" name="role" required>
                <option value="">Select Role...</option>
                <option value="warehouse_manager">Warehouse Manager</option>
                <option value="warehouse_staff">Warehouse Staff</option>
                <option value="inventory_auditor">Inventory Auditor</option>
                <option value="procurement_officer">Procurement Officer</option>
                <option value="accounts_payable_clerk">Accounts Payable Clerk</option>
                <option value="accounts_receivable_clerk">Accounts Receivable Clerk</option>
                <option value="it_administrator">IT Administrator</option>
                <option value="top_management">Top Management</option>
            </select>
            <button type="submit">Login</button>
            <div class="error-message" id="errorMsg"></div>
            <a href="#" class="forgot-password-link">Forgot password?</a>
        </form>
    </div>
    <script src="<?= base_url('assets/js/login.js') ?>"></script>
</body>
</html>