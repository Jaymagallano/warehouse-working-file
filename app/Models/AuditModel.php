<?php

namespace App\Models;

use CodeIgniter\Model;

class AuditModel extends Model
{
    protected $table = 'audits';
    protected $primaryKey = 'id';
    protected $allowedFields = ['audit_number', 'type', 'status', 'scheduled_date', 'completed_date', 'auditor_id'];
    protected $useTimestamps = true;

    public function getSummary()
    {
        return [
            'scheduled' => $this->where('status', 'scheduled')->countAllResults(),
            'in_progress' => $this->where('status', 'in_progress')->countAllResults(),
            'completed' => $this->where('status', 'completed')->countAllResults()
        ];
    }

    public function getSchedules()
    {
        return $this->where('status', 'scheduled')
                   ->orderBy('scheduled_date', 'ASC')
                   ->findAll();
    }

    public function getReports()
    {
        return $this->where('status', 'completed')
                   ->orderBy('completed_date', 'DESC')
                   ->findAll();
    }
}