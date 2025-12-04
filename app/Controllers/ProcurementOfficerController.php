<?php

namespace App\Controllers;

use App\Models\PurchaseOrderModel;
use App\Models\SupplierModel;
use App\Models\MaterialModel;
use App\Models\RequisitionModel;
use App\Models\InvoiceModel;
use App\Models\DeliveryModel;

class ProcurementOfficerController extends BaseController
{
    public function dashboard()
    {
        $purchaseOrderModel = new PurchaseOrderModel();
        $data['po_summary'] = $purchaseOrderModel->getSummary();
        return view('procurement_officer/dashboard', $data);
    }

    public function purchaseOrders()
    {
        $purchaseOrderModel = new PurchaseOrderModel();
        $data['purchase_orders'] = $purchaseOrderModel->getAll();
        return view('procurement_officer/purchase_orders', $data);
    }

    public function suppliers()
    {
        $supplierModel = new SupplierModel();
        $data['suppliers'] = $supplierModel->getAll();
        return view('procurement_officer/suppliers', $data);
    }

    public function materials()
    {
        $materialModel = new MaterialModel();
        $data['materials'] = $materialModel->getAll();
        return view('procurement_officer/materials', $data);
    }

    public function requisitions()
    {
        $requisitionModel = new RequisitionModel();
        $data['requisitions'] = $requisitionModel->getAll();
        return view('procurement_officer/requisitions', $data);
    }

    public function invoices()
    {
        $invoiceModel = new InvoiceModel();
        $data['invoices'] = $invoiceModel->getAll();
        return view('procurement_officer/invoices', $data);
    }

    public function deliveryTracking()
    {
        $deliveryModel = new DeliveryModel();
        $data['deliveries'] = $deliveryModel->getAll();
        return view('procurement_officer/delivery_tracking', $data);
    }

    public function reports()
    {
        $purchaseOrderModel = new PurchaseOrderModel();
        $data['reports'] = $purchaseOrderModel->getReports();
        return view('procurement_officer/reports', $data);
    }
}