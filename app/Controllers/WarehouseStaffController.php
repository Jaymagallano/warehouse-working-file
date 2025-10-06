<?php

namespace App\Controllers;

use App\Models\InventoryModel;
use App\Models\ShipmentModel;
use App\Models\PhysicalCountModel;

class WarehouseStaffController extends BaseController
{
    public function dashboard()
    {
        $inventoryModel = new InventoryModel();
        $data['tasks'] = $inventoryModel->getStaffTasks();
        return view('warehouse_staff/dashboard', $data);
    }

    public function inventory()
    {
        $inventoryModel = new InventoryModel();
        $data['inventory'] = $inventoryModel->getAll();
        return view('warehouse_staff/inventory', $data);
    }

    public function receiving()
    {
        $shipmentModel = new ShipmentModel();
        $data['incoming_shipments'] = $shipmentModel->getIncoming();
        return view('warehouse_staff/receiving', $data);
    }

    public function shipping()
    {
        $shipmentModel = new ShipmentModel();
        $data['outgoing_shipments'] = $shipmentModel->getOutgoing();
        return view('warehouse_staff/shipping', $data);
    }

    public function scan()
    {
        return view('warehouse_staff/scan');
    }

    public function physicalCount()
    {
        $physicalCountModel = new PhysicalCountModel();
        $data['count_items'] = $physicalCountModel->getActiveCount();
        return view('warehouse_staff/physical_count', $data);
    }
}