<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminMiddleware;

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
});

Route::get('/user/dashboard', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('user.dashboard');

Route::get('/user/prosedur-kerja', function () {
    return Inertia::render('User/ProsedurKerja');
})->middleware(['auth', 'verified'])->name('user.prosedurKerja');

Route::get('/user/modul-diklat', function () {
    return Inertia::render('User/ModulDiklat');
})->middleware(['auth', 'verified'])->name('user.modulDiklat');

Route::get('/user/faq', function () {
    return Inertia::render('User/Faq');
})->middleware(['auth', 'verified'])->name('user.FAQ');

Route::prefix('video-tutorial')->group(function () {
    Route::get('/ion-scan', function () {
        return Inertia::render('User/VideoTutorial/IonScan');
    });
    Route::get('/hamzat', function () {
        return Inertia::render('User/VideoTutorial/Hamzat');
    });
})->middleware(['auth', 'verified'])->name('user.videoTutorial');

Route::get('/user/video-tutorial', function () {
    return Inertia::render('User/ModulDiklat');
})->middleware(['auth', 'verified'])->name('user.modulDiklat');

Route::middleware(['auth', 'verified', AdminMiddleware::class])->group(function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');


    // Routing Admin Prosedur Kerja

    Route::get('/admin/kelola-prosedur-kerja', function () {
        return Inertia::render('Admin/ProsedurKerja/ProsedurKerjaMain');
    })->name('admin.prosedurKerja');

    Route::get('/admin/kelola-prosedur-kerja/tambah-data', function () {
        return Inertia::render('Admin/ProsedurKerja/ProsedurKerjaForm', [
            'title' => 'Tambah Prosedur Kerja',
        ]);
    })->name('admin.prosedurKerja.create');


    // Routing Admin Modul Diklat

    Route::get('/admin/kelola-modul-diklat', function () {
        return Inertia::render('Admin/ModulDiklat/ModulDiklatMain');
    })->name('admin.modulDiklat');

    Route::get('/admin/kelola-modul-diklat/tambah-data', function () {
        return Inertia::render('Admin/ModulDiklat/ModulDiklatForm', [
            'title' => 'Tambah Modul Diklat',
        ]);
    })->name('admin.modulDiklat.create');


    // Routing Admin FAQ

    Route::get('/admin/kelola-faq', function () {
        return Inertia::render('Admin/Faq/FaqMain');
    })->name('admin.faq');

    Route::get('/admin/kelola-faq/tambah-data', function () {
        return Inertia::render('Admin/Faq/FaqForm', [
            'title' => 'Tambah Faq',
        ]);
    })->name('admin.faq.create');


    // Routing Admin Video Tutorial

    Route::get('/admin/kelola-video-tutorial', function () {
        return Inertia::render('Admin/VideoTutorial/VideoTutorialMain');
    })->name('admin.videoTutorial');

    Route::get('/admin/kelola-video-tutorial/tambah-data', function () {
        return Inertia::render('Admin/VideoTutorial/VideoTutorialForm', [
            'title' => 'Tambah Video',
        ]);
    })->name('admin.videoTutorial.create');


    // Routing Admin User

    Route::get('/admin/kelola-user', function () {
        return Inertia::render('Admin/User/UserMain');
    })->name('admin.user');

    Route::get('/admin/kelola-user/tambah-data', function () {
        return Inertia::render('Admin/User/UserForm', [
            'title' => 'Tambah User',
        ]);
    })->name('admin.user.create');

});



require __DIR__.'/auth.php';
