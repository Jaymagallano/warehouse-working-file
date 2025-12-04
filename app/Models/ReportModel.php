<?php

namespace App\Models;

use CodeIgniter\Model;

class ReportModel extends Model
{
    protected $table = 'reports';
    protected $primaryKey = 'id';
    protected $allowedFields = ['report_type', 'title', 'data', 'generated_by', 'generated_date'];
    protected $useTimestamps = true;

    public function getManagerReports()
    {
        return $this->whereIn('report_type', ['inventory', 'shipment', 'performance'])->findAll();
    }
}