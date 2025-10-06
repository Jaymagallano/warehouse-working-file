<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'AuthController::login');

// Authentication Routes
$routes->get('login', 'AuthController::login');
$routes->post('authenticate', 'AuthController::authenticate');
$routes->get('logout', 'AuthController::logout');

$routes->group('auth', function($routes) {
    $routes->get('logout', 'AuthController::logout');
});

// Warehouse Manager Routes
$routes->group('warehouse-manager', ['filter' => 'auth'], function($routes) {
    // View Routes
    $routes->get('dashboard', 'WarehouseManagerController::dashboard');
    $routes->get('inventory-overview', 'WarehouseManagerController::inventoryOverview');
    $routes->get('receiving', 'WarehouseManagerController::receiving');
    $routes->get('shipping', 'WarehouseManagerController::shipping');
    $routes->get('approvals', 'WarehouseManagerController::approvals');
    $routes->get('batch-tracking', 'WarehouseManagerController::batchTracking');
    $routes->get('reports', 'WarehouseManagerController::reports');
    
    // API Routes - Inventory
    $routes->get('api-inventory', 'WarehouseManagerController::apiGetInventory');
    $routes->get('api-inventory-stats', 'WarehouseManagerController::apiGetInventoryStats');
    $routes->post('api-inventory-add', 'WarehouseManagerController::apiAddInventory');
    $routes->post('api-inventory-update/(:num)', 'WarehouseManagerController::apiUpdateInventory/$1');
    $routes->post('api-inventory-delete/(:num)', 'WarehouseManagerController::apiDeleteInventory/$1');
    
    // API Routes - Shipments
    $routes->get('api-shipments', 'WarehouseManagerController::apiGetShipments');
    $routes->post('api-shipment-add', 'WarehouseManagerController::apiAddShipment');
    $routes->post('api-shipment-update/(:num)', 'WarehouseManagerController::apiUpdateShipment/$1');
    $routes->post('api-shipment-delete/(:num)', 'WarehouseManagerController::apiDeleteShipment/$1');
    
    // API Routes - Approvals
    $routes->get('api-approvals', 'WarehouseManagerController::apiGetApprovals');
    $routes->post('api-approve-request/(:num)', 'WarehouseManagerController::apiApproveRequest/$1');
    $routes->post('api-reject-request/(:num)', 'WarehouseManagerController::apiRejectRequest/$1');
    
    // API Routes - Dashboard
    $routes->get('api-recent-activity', 'WarehouseManagerController::apiGetRecentActivity');
    $routes->get('api-notifications', 'WarehouseManagerController::apiGetNotifications');
});

// Inventory Auditor Routes
$routes->group('inventory-auditor', ['filter' => 'auth'], function($routes) {
    $routes->get('dashboard', 'InventoryAuditorController::dashboard');
    $routes->get('inventory-view', 'InventoryAuditorController::inventoryView');
    $routes->get('audit-schedule', 'InventoryAuditorController::auditSchedule');
    $routes->get('audit-reports', 'InventoryAuditorController::auditReports');
    $routes->get('discrepancies', 'InventoryAuditorController::discrepancies');
    $routes->get('reconciliation', 'InventoryAuditorController::reconciliation');
});

// Procurement Officer Routes
$routes->group('procurement-officer', ['filter' => 'auth'], function($routes) {
    $routes->get('dashboard', 'ProcurementOfficerController::dashboard');
    $routes->get('purchase-orders', 'ProcurementOfficerController::purchaseOrders');
    $routes->get('suppliers', 'ProcurementOfficerController::suppliers');
    $routes->get('materials', 'ProcurementOfficerController::materials');
    $routes->get('requisitions', 'ProcurementOfficerController::requisitions');
    $routes->get('invoices', 'ProcurementOfficerController::invoices');
    $routes->get('delivery-tracking', 'ProcurementOfficerController::deliveryTracking');
    $routes->get('reports', 'ProcurementOfficerController::reports');
});

// Warehouse Staff Routes
$routes->group('warehouse-staff', ['filter' => 'auth'], function($routes) {
    $routes->get('dashboard', 'WarehouseStaffController::dashboard');
    $routes->get('inventory', 'WarehouseStaffController::inventory');
    $routes->get('receiving', 'WarehouseStaffController::receiving');
    $routes->get('shipping', 'WarehouseStaffController::shipping');
    $routes->get('scan', 'WarehouseStaffController::scan');
    $routes->get('physical-count', 'WarehouseStaffController::physicalCount');
});
