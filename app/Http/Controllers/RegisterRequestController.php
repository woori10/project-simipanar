<?php

namespace App\Http\Controllers;

use App\Models\UserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class RegisterRequestController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'satker' => 'nullable|string',
            'nip' => 'nullable|string|max:18',
            'no_telp' => 'nullable|string|max:20',
            'role' => 'nullable|string',
            'password' => 'required|string|min:6|confirmed', // jangan lupa confirm field
        ]);

        $data['password'] = Hash::make($data['password']);

        $userRequest = UserRequest::create($data);

        // Kirim email ke user: tunggu konfirmasi admin
        Mail::to($data['email'])->send(new \App\Mail\UserRequestPending($userRequest));

        // return response()->json([
        //     'message' => 'Pendaftaran berhasil, silakan tunggu konfirmasi admin',
        // ]);

        return redirect()->route('login')->with('success', 'Pendaftaran berhasil, silakan tunggu konfirmasi admin');

    }
}
