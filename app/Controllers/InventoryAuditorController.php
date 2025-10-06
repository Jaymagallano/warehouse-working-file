<?php

namespace App\Controllers;

use App\Models\InventoryModel;
use App\Models\AuditModel;
use App\Models\DiscrepancyModel;

class InventoryAuditorController extends BaseController
{
    public function dashboard()
    {
        $auditModel = new AuditModel();
        $data['audit_summary'] = $auditModel->getSummary();
        return view('inventory_auditor/dashboard', $data);
    }

    public function inventoryView()
    {
        $inventoryModel = new InventoryModel();
        $data['inventory'] = $inventoryModel->getAll();
        return view('inventory_auditor/inventory_view', $data);
    }

    public function auditSchedule()
    {
        $auditModel = new AuditModel();
        $data['schedules'] = $auditModel->getSchedules();
        return view('inventory_auditor/audit_schedule', $data);
    }

    public function auditReports()
    {
        $auditModel = new AuditModel();
        $data['reports'] = $auditModel->getReports();
        return view('inventory_auditor/audit_reports', $data);
    }

    public function discrepancies()
    {
        $discrepancyModel = new DiscrepancyModel();
        $data['discrepancies'] = $discrepancyModel->getAll();
        return view('inventory_auditor/discrepancies', $data);
    }

    public function reconciliation()
    {
        $discrepancyModel = new DiscrepancyModel();
        $data['reconciliation_items'] = $discrepancyModel->getReconciliationItems();
        return view('inventory_auditor/reconciliation', $data);
    }
}