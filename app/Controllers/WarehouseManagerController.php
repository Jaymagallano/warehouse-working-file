<?php

namespace App\Controllers;

use App\Models\InventoryModel;
use App\Models\ShipmentModel;
use App\Models\ApprovalModel;
use App\Models\ReportModel;
use App\Models\UserModel;

class WarehouseManagerController extends BaseController
{
    public function dashboard()
    {
        $inventoryModel = new InventoryModel();
        $data['inventory_summary'] = $inventoryModel->getSummary();
        return view('warehouse_manager/dashboard', $data);
    }

    public function inventoryOverview()
    {
        $inventoryModel = new InventoryModel();
        $data['inventory'] = $inventoryModel->findAll();
        return view('warehouse_manager/inventory_overview', $data);
    }

    public function receiving()
    {
        $shipmentModel = new ShipmentModel();
        $data['incoming_shipments'] = $shipmentModel->getIncoming();
        return view('warehouse_manager/receiving', $data);
    }

    public function shipping()
    {
        $shipmentModel = new ShipmentModel();
        $data['outgoing_shipments'] = $shipmentModel->getOutgoing();
        return view('warehouse_manager/shipping', $data);
    }

    public function approvals()
    {
        $approvalModel = new ApprovalModel();
        $data['pending_approvals'] = $approvalModel->getPending();
        return view('warehouse_manager/approvals', $data);
    }

    public function batchTracking()
    {
        $inventoryModel = new InventoryModel();
        $data['batches'] = $inventoryModel->getBatches();
        return view('warehouse_manager/batch_tracking', $data);
    }

    public function reports()
    {
        $reportModel = new ReportModel();
        $data['reports'] = $reportModel->getManagerReports();
        return view('warehouse_manager/reports', $data);
    }

    // ==================== API ENDPOINTS ====================
    
    // INVENTORY API
    public function apiGetInventory()
    {
        $inventoryModel = new InventoryModel();
        $inventory = $inventoryModel->findAll();
        return $this->response->setJSON($inventory);
    }

    public function apiGetInventoryStats()
    {
        $inventoryModel = new InventoryModel();
        $shipmentModel = new ShipmentModel();
        $userModel = new UserModel();
        
        $stats = [
            'total_inventory' => $inventoryModel->countAll(),
            'low_stock' => $inventoryModel->where('quantity <', 10)->countAllResults(),
            'pending_shipments' => $shipmentModel->where('status', 'pending')->countAllResults(),
            'pending_receiving' => $shipmentModel->where('type', 'incoming')->where('status', 'pending')->countAllResults(),
            'total_users' => $userModel->countAll()
        ];
        
        return $this->response->setJSON($stats);
    }

    public function apiAddInventory()
    {
        $inventoryModel = new InventoryModel();
        $data = $this->request->getJSON(true);
        
        if ($inventoryModel->insert($data)) {
            return $this->response->setJSON([
                'success' => true,
                'message' => 'Item added successfully',
                'id' => $inventoryModel->getInsertID()
            ]);
        } else {
            return $this->response->setJSON([
                'success' => false,
                'message' => 'Failed to add item',
                'errors' => $inventoryModel->errors()
            ])->setStatusCode(400);
        }
    }

    public function apiUpdateInventory($id)
    {
        $inventoryModel = new InventoryModel();
        $data = $this->request->getJSON(true);
        
        if ($inventoryModel->update($id, $data)) {
            return $this->response->setJSON([
                'success' => true,
                'message' => 'Item updated successfully'
            ]);
        } else {
            return $this->response->setJSON([
                'success' => false,
                'message' => 'Failed to update item',
                'errors' => $inventoryModel->errors()
            ])->setStatusCode(400);
        }
    }

    public function apiDeleteInventory($id)
    {
        $inventoryModel = new InventoryModel();
        
        if ($inventoryModel->delete($id)) {
            return $this->response->setJSON([
                'success' => true,
                'message' => 'Item deleted successfully'
            ]);
        } else {
            return $this->response->setJSON([
                'success' => false,
                'message' => 'Failed to delete item'
            ])->setStatusCode(400);
        }
    }

    // SHIPMENT API
    public function apiGetShipments()
    {
        $shipmentModel = new ShipmentModel();
        $type = $this->request->getGet('type');
        
        if ($type === 'incoming') {
            $shipments = $shipmentModel->getIncoming();
        } elseif ($type === 'outgoing') {
            $shipments = $shipmentModel->getOutgoing();
        } else {
            $shipments = $shipmentModel->findAll();
        }
        
        return $this->response->setJSON($shipments);
    }

    public function apiAddShipment()
    {
        $shipmentModel = new ShipmentModel();
        $data = $this->request->getJSON(true);
        
        if ($shipmentModel->insert($data)) {
            return $this->response->setJSON([
                'success' => true,
                'message' => 'Shipment added successfully',
                'id' => $shipmentModel->getInsertID()
            ]);
        } else {
            return $this->response->setJSON([
                'success' => false,
                'message' => 'Failed to add shipment',
                'errors' => $shipmentModel->errors()
            ])->setStatusCode(400);
        }
    }

    public function apiUpdateShipment($id)
    {
        $shipmentModel = new ShipmentModel();
        $data = $this->request->getJSON(true);
        
        if ($shipmentModel->update($id, $data)) {
            return $this->response->setJSON([
                'success' => true,
                'message' => 'Shipment updated successfully'
            ]);
        } else {
            return $this->response->setJSON([
                'success' => false,
                'message' => 'Failed to update shipment',
                'errors' => $shipmentModel->errors()
            ])->setStatusCode(400);
        }
    }

    public function apiDeleteShipment($id)
    {
        $shipmentModel = new ShipmentModel();
        
        if ($shipmentModel->delete($id)) {
            return $this->response->setJSON([
                'success' => true,
                'message' => 'Shipment deleted successfully'
            ]);
        } else {
            return $this->response->setJSON([
                'success' => false,
                'message' => 'Failed to delete shipment'
            ])->setStatusCode(400);
        }
    }

    // APPROVAL API
    public function apiGetApprovals()
    {
        $approvalModel = new ApprovalModel();
        $status = $this->request->getGet('status');
        
        if ($status) {
            $approvals = $approvalModel->where('status', $status)->findAll();
        } else {
            $approvals = $approvalModel->findAll();
        }
        
        return $this->response->setJSON($approvals);
    }

    public function apiApproveRequest($id)
    {
        $approvalModel = new ApprovalModel();
        $data = [
            'status' => 'approved',
            'approved_by' => session()->get('user_id') ?? 1
        ];
        
        if ($approvalModel->update($id, $data)) {
            return $this->response->setJSON([
                'success' => true,
                'message' => 'Request approved successfully'
            ]);
        } else {
            return $this->response->setJSON([
                'success' => false,
                'message' => 'Failed to approve request'
            ])->setStatusCode(400);
        }
    }

    public function apiRejectRequest($id)
    {
        $approvalModel = new ApprovalModel();
        $data = [
            'status' => 'rejected',
            'approved_by' => session()->get('user_id') ?? 1
        ];
        
        if ($approvalModel->update($id, $data)) {
            return $this->response->setJSON([
                'success' => true,
                'message' => 'Request rejected successfully'
            ]);
        } else {
            return $this->response->setJSON([
                'success' => false,
                'message' => 'Failed to reject request'
            ])->setStatusCode(400);
        }
    }

    // ACTIVITY LOG API
    public function apiGetRecentActivity()
    {
        // For now, return sample data. You can create an ActivityModel later
        $activities = [
            ['action' => 'Inventory item added', 'timestamp' => date('Y-m-d H:i:s', strtotime('-1 hour'))],
            ['action' => 'Shipment created', 'timestamp' => date('Y-m-d H:i:s', strtotime('-2 hours'))],
            ['action' => 'Stock updated', 'timestamp' => date('Y-m-d H:i:s', strtotime('-3 hours'))]
        ];
        
        return $this->response->setJSON($activities);
    }

    // NOTIFICATIONS API
    public function apiGetNotifications()
    {
        $inventoryModel = new InventoryModel();
        $shipmentModel = new ShipmentModel();
        
        $notifications = [];
        
        // Low stock notifications
        $lowStock = $inventoryModel->where('quantity <', 10)->findAll();
        foreach ($lowStock as $item) {
            $notifications[] = [
                'type' => 'warning',
                'message' => "Low stock: {$item['item_name']} ({$item['quantity']} {$item['unit']} left)"
            ];
        }
        
        // Overdue shipments
        $overdueShipments = $shipmentModel
            ->where('expected_date <', date('Y-m-d'))
            ->where('status', 'pending')
            ->findAll();
        foreach ($overdueShipments as $shipment) {
            $notifications[] = [
                'type' => 'danger',
                'message' => "Shipment {$shipment['shipment_number']} is overdue"
            ];
        }
        
        return $this->response->setJSON($notifications);
    }
}