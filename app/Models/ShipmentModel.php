<?php

namespace App\Models;

use CodeIgniter\Model;

class ShipmentModel extends Model
{
    protected $table = 'shipments';
    protected $primaryKey = 'id';
    protected $allowedFields = ['shipment_number', 'type', 'status', 'supplier_id', 'customer_id', 'expected_date', 'actual_date'];
    protected $useTimestamps = true;

    public function getIncoming()
    {
        return $this->where('type', 'incoming')
                   ->where('status !=', 'completed')
                   ->findAll();
    }

    public function getOutgoing()
    {
        return $this->where('type', 'outgoing')
                   ->where('status !=', 'completed')
                   ->findAll();
    }
}