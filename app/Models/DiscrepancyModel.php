<?php

namespace App\Models;

use CodeIgniter\Model;

class DiscrepancyModel extends Model
{
    protected $table = 'discrepancies';
    protected $primaryKey = 'id';
    protected $allowedFields = ['audit_id', 'item_id', 'expected_quantity', 'actual_quantity', 'variance', 'status'];
    protected $useTimestamps = true;

    public function getReconciliationItems()
    {
        return $this->where('status', 'pending')->findAll();
    }

    public function getAll()
    {
        return $this->findAll();
    }
}