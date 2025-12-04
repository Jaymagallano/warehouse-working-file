<?php

namespace App\Models;

use CodeIgniter\Model;

class SupplierModel extends Model
{
    protected $table = 'suppliers';
    protected $primaryKey = 'id';
    protected $allowedFields = ['supplier_code', 'name', 'contact_person', 'email', 'phone', 'address', 'status'];
    protected $useTimestamps = true;

    public function getAll()
    {
        return $this->findAll();
    }
}