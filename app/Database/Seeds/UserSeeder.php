<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'username' => 'manager',
                'password' => password_hash('password', PASSWORD_DEFAULT),
                'email' => 'manager@warehouse.com',
                'role' => 'warehouse_manager',
                'status' => 'active'
            ],
            [
                'username' => 'staff',
                'password' => password_hash('password', PASSWORD_DEFAULT),
                'email' => 'staff@warehouse.com',
                'role' => 'warehouse_staff',
                'status' => 'active'
            ],
            [
                'username' => 'auditor',
                'password' => password_hash('password', PASSWORD_DEFAULT),
                'email' => 'auditor@warehouse.com',
                'role' => 'inventory_auditor',
                'status' => 'active'
            ],
            [
                'username' => 'procurement',
                'password' => password_hash('password', PASSWORD_DEFAULT),
                'email' => 'procurement@warehouse.com',
                'role' => 'procurement_officer',
                'status' => 'active'
            ]
        ];

        $this->db->table('users')->insertBatch($data);
    }
}