<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateDiscrepanciesTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'audit_id' => [
                'type'       => 'INT',
                'constraint' => 5,
                'unsigned'   => true,
            ],
            'item_id' => [
                'type'       => 'INT',
                'constraint' => 5,
                'unsigned'   => true,
            ],
            'expected_quantity' => [
                'type'       => 'INT',
                'constraint' => 11,
            ],
            'actual_quantity' => [
                'type'       => 'INT',
                'constraint' => 11,
            ],
            'variance' => [
                'type'       => 'INT',
                'constraint' => 11,
            ],
            'status' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
                'default'    => 'pending',
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        
        $this->forge->addKey('id', true);
        $this->forge->createTable('discrepancies');
    }

    public function down()
    {
        $this->forge->dropTable('discrepancies');
    }
}