<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;


class UserController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'satker' => 'required|string',
            'nip' => 'required|string|max:18|unique:users,nip',
            'no_telp' => 'required|string|max:20',
            'role' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        $data['email'] = strtolower($data['email']); // optional
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json([
            'message' => 'User berhasil ditambahkan',
            'user' => $user
        ]);
    }

    public function index()
    {
        $users = User::all();
        return response()->json([
            'message' => 'Daftar semua user',
            'users' => $users
        ]);
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Detail user',
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $id,
            'satker' => 'string',
            'nip' => 'string|max:18|unique:users,nip,' . $id,
            'no_telp' => 'string|max:20',
            'role' => 'string',
        ]);


        $user->update([
            'name' => $request->name ?? $user->name,
            'email' => $request->email ?? $user->email,
            'satker' => $request->satker ?? $user->satker,
            'nip' => $request->nip ?? $user->nip,
            'no_telp' => $request->no_telp ?? $user->no_telp,
            'role' => $request->role ?? $user->role,
        ]);

        return response()->json([
            'message' => 'User berhasil diperbarui',
            'user' => $user
        ]);
    }


    public function destroy ($id)
    {
        $user = User::findorFail($id);
        $user->delete();

        return response()->json([
            'message'=>'User berhasil dihapus'
        ]);
    }
}
