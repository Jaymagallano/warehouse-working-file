<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePhysicalCountsTable extends Migration
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
            'count_number' => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
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
            'counted_quantity' => [
                'type'       => 'INT',
                'constraint' => 11,
                'null'       => true,
            ],
            'status' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
                'default'    => 'active',
            ],
            'counted_by' => [
                'type'       => 'INT',
                'constraint' => 5,
                'unsigned'   => true,
                'null'       => true,
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
        $this->forge->createTable('physical_counts');
    }

    public function down()
    {
        $this->forge->dropTable('physical_counts');
    }
}