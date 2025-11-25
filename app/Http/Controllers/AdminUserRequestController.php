<?php

namespace App\Http\Controllers;

use App\Models\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AdminUserRequestController extends Controller
{
    public function index()
    {
        $requests = UserRequest::where('status', 'pending')->get();
        return response()->json($requests);
    }

    public function approve($id)
    {
        $request = UserRequest::findOrFail($id);

        // Masukkan ke tabel users
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'satker' => $request->satker,
            'nip' => $request->nip,
            'no_telp' => $request->no_telp,
            'role' => $request->role,
            'password' => $request->password, // hash sudah ada
        ]);

        // Update status
        $request->status = 'approved';
        $request->save();

        // Kirim email info akses diberikan
        Mail::to($user->email)->send(new \App\Mail\UserApproved($user));

        return response()->json(['message' => 'User berhasil diberikan akses.']);
    }

    public function reject($id)
    {
        $request = UserRequest::findOrFail($id);
        $request->status = 'rejected';
        $request->save();

        return response()->json(['message' => 'User berhasil ditolak.']);
    }
}
