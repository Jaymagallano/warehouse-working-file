<?php

namespace App\Models;

use CodeIgniter\Model;

class MaterialModel extends Model
{
    protected $table = 'materials';
    protected $primaryKey = 'id';
    protected $allowedFields = ['material_code', 'name', 'description', 'category', 'unit', 'unit_price'];
    protected $useTimestamps = true;

    public function getAll()
    {
        return $this->findAll();
    }
}