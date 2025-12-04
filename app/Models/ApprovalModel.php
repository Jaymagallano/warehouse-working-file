<?php

namespace App\Models;

use CodeIgniter\Model;

class ApprovalModel extends Model
{
    protected $table = 'approvals';
    protected $primaryKey = 'id';
    protected $allowedFields = ['type', 'reference_id', 'status', 'requested_by', 'approved_by', 'request_date'];
    protected $useTimestamps = true;

    public function getPending()
    {
        return $this->where('status', 'pending')->findAll();
    }
}