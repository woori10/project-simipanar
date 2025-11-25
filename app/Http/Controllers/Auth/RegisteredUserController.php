<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\UserRequest;
use App\Mail\UserRequestPending;
use Illuminate\Support\Facades\Mail;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'satker' => 'required|string',
            'nip' => 'required|string|max:18|unique:user_requests',
            'no_telp' => 'required|string|max:20',
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $userRequest = UserRequest::create([
            'name' => $request->name,
            'email' => $request->email,
            'satker' => $request->satker,
            'nip' => $request->nip,
            'no_telp' => $request->no_telp,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);

        // kirim email
        Mail::to($userRequest->email)->send(new UserRequestPending($userRequest));

        // BALIKKAN JSON, BUKAN REDIRECT
        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil! Silakan tunggu konfirmasi admin.'
        ]);
    }

}
