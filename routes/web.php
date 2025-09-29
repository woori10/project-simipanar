<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    // kalau sudah login, arahkan ke dashboard
    if (Auth::check()) {
        return redirect()->route('user.dashboard'); // ganti 'dashboard' sesuai route setelah login
    }

    // kalau belum login, arahkan ke halaman login
    return redirect()->route('login');
});

Route::get('/user/dashboard', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('user.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin', function () {
    return Inertia::render('Admin/Dashboard');
});

Route::get('/user', function () {
    return Inertia::render('User/Dashboard');
});


require __DIR__.'/auth.php';
