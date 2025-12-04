<?php

namespace App\Models;

use CodeIgniter\Model;

class InventoryModel extends Model
{
    protected $table = 'inventory';
    protected $primaryKey = 'id';
    protected $allowedFields = ['item_code', 'item_name', 'category', 'quantity', 'unit', 'location', 'batch_number', 'expiry_date'];
    protected $useTimestamps = true;

    public function getSummary()
    {
        return [
            'total_items' => $this->countAll(),
            'low_stock' => $this->where('quantity <', 10)->countAllResults(),
            'categories' => $this->distinct()->select('category')->findAll()
        ];
    }

    public function getBatches()
    {
        return $this->select('batch_number, item_name, quantity, expiry_date')
                   ->where('batch_number IS NOT NULL')
                   ->findAll();
    }

    public function getStaffTasks()
    {
        return $this->where('quantity <', 10)->findAll();
    }

    public function getAll()
    {
        return $this->findAll();
    }
}