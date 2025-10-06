<?php

namespace App\Controllers;

use App\Models\UserModel;

class AuthController extends BaseController
{
    public function login()
    {
        return view('auth/login');
    }

    public function authenticate()
    {
        $userModel = new UserModel();
        
        $username = $this->request->getPost('username');
        $password = $this->request->getPost('password');
        $role = $this->request->getPost('role');
        
        $user = $userModel->authenticate($username, $password);
        
        if ($user && $user['role'] === $role) {
            session()->set([
                'user_id' => $user['id'],
                'username' => $user['username'],
                'role' => $user['role'],
                'logged_in' => true
            ]);
            
            return redirect()->to($this->getDashboardByRole($user['role']));
        }
        
        return redirect()->to('/login')->with('error', 'Invalid credentials or role mismatch');
    }

    public function logout()
    {
        session()->destroy();
        return redirect()->to('/login');
    }

    private function getDashboardByRole($role)
    {
        switch ($role) {
            case 'warehouse_manager': return '/warehouse-manager/dashboard';
            case 'inventory_auditor': return '/inventory-auditor/dashboard';
            case 'procurement_officer': return '/procurement-officer/dashboard';
            case 'warehouse_staff': return '/warehouse-staff/dashboard';
            default: return '/login';
        }
    }
}