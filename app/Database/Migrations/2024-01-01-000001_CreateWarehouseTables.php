<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateWarehouseTables extends Migration
{
    public function up()
    {
        // Users table
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'username' => ['type' => 'VARCHAR', 'constraint' => 50, 'unique' => true],
            'password' => ['type' => 'VARCHAR', 'constraint' => 255],
            'email' => ['type' => 'VARCHAR', 'constraint' => 100],
            'role' => ['type' => 'ENUM', 'constraint' => ['warehouse_manager', 'inventory_auditor', 'procurement_officer', 'warehouse_staff']],
            'status' => ['type' => 'ENUM', 'constraint' => ['active', 'inactive'], 'default' => 'active'],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('users');

        // Inventory table
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'item_code' => ['type' => 'VARCHAR', 'constraint' => 50, 'unique' => true],
            'item_name' => ['type' => 'VARCHAR', 'constraint' => 100],
            'category' => ['type' => 'VARCHAR', 'constraint' => 50],
            'quantity' => ['type' => 'INT', 'constraint' => 11, 'default' => 0],
            'unit' => ['type' => 'VARCHAR', 'constraint' => 20],
            'location' => ['type' => 'VARCHAR', 'constraint' => 50],
            'batch_number' => ['type' => 'VARCHAR', 'constraint' => 50, 'null' => true],
            'expiry_date' => ['type' => 'DATE', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('inventory');

        // Suppliers table
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'supplier_code' => ['type' => 'VARCHAR', 'constraint' => 50, 'unique' => true],
            'name' => ['type' => 'VARCHAR', 'constraint' => 100],
            'contact_person' => ['type' => 'VARCHAR', 'constraint' => 100],
            'email' => ['type' => 'VARCHAR', 'constraint' => 100],
            'phone' => ['type' => 'VARCHAR', 'constraint' => 20],
            'address' => ['type' => 'TEXT'],
            'status' => ['type' => 'ENUM', 'constraint' => ['active', 'inactive'], 'default' => 'active'],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('suppliers');

        // Purchase Orders table
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'po_number' => ['type' => 'VARCHAR', 'constraint' => 50, 'unique' => true],
            'supplier_id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true],
            'status' => ['type' => 'ENUM', 'constraint' => ['pending', 'approved', 'completed', 'cancelled'], 'default' => 'pending'],
            'total_amount' => ['type' => 'DECIMAL', 'constraint' => '10,2', 'default' => 0],
            'order_date' => ['type' => 'DATE'],
            'expected_delivery' => ['type' => 'DATE'],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('supplier_id', 'suppliers', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('purchase_orders');
    }

    public function down()
    {
        $this->forge->dropTable('purchase_orders');
        $this->forge->dropTable('suppliers');
        $this->forge->dropTable('inventory');
        $this->forge->dropTable('users');
    }
}