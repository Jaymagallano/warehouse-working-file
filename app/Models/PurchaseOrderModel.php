<?php

namespace App\Models;

use CodeIgniter\Model;

class PurchaseOrderModel extends Model
{
    protected $table = 'purchase_orders';
    protected $primaryKey = 'id';
    protected $allowedFields = ['po_number', 'supplier_id', 'status', 'total_amount', 'order_date', 'expected_delivery'];
    protected $useTimestamps = true;

    public function getSummary()
    {
        return [
            'total_orders' => $this->countAll(),
            'pending' => $this->where('status', 'pending')->countAllResults(),
            'approved' => $this->where('status', 'approved')->countAllResults()
        ];
    }

    public function getReports()
    {
        return $this->select('status, COUNT(*) as count, SUM(total_amount) as total')
                   ->groupBy('status')
                   ->findAll();
    }

    public function getAll()
    {
        return $this->findAll();
    }
}