<?php

namespace App\Models;

use CodeIgniter\Model;

class PhysicalCountModel extends Model
{
    protected $table = 'physical_counts';
    protected $primaryKey = 'id';
    protected $allowedFields = ['count_number', 'item_id', 'expected_quantity', 'counted_quantity', 'status', 'counted_by'];
    protected $useTimestamps = true;

    public function getActiveCount()
    {
        return $this->where('status', 'active')->findAll();
    }
}