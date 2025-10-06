<?php

namespace App\Models;

use CodeIgniter\Model;

class DeliveryModel extends Model
{
    protected $table = 'deliveries';
    protected $primaryKey = 'id';
    protected $allowedFields = ['delivery_number', 'po_id', 'status', 'scheduled_date', 'actual_date', 'tracking_number'];
    protected $useTimestamps = true;

    public function getAll()
    {
        return $this->findAll();
    }
}