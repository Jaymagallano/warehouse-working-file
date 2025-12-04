<?php

namespace App\Models;

use CodeIgniter\Model;

class RequisitionModel extends Model
{
    protected $table = 'requisitions';
    protected $primaryKey = 'id';
    protected $allowedFields = ['requisition_number', 'department', 'requested_by', 'status', 'request_date', 'approved_date'];
    protected $useTimestamps = true;

    public function getAll()
    {
        return $this->findAll();
    }
}