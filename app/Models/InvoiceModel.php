<?php

namespace App\Models;

use CodeIgniter\Model;

class InvoiceModel extends Model
{
    protected $table = 'invoices';
    protected $primaryKey = 'id';
    protected $allowedFields = ['invoice_number', 'supplier_id', 'po_id', 'amount', 'status', 'invoice_date', 'due_date'];
    protected $useTimestamps = true;

    public function getAll()
    {
        return $this->findAll();
    }
}