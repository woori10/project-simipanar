<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\DaftarAlatController;

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
    if (Auth::check()) {
        return redirect()->route('user.dashboard');
    }

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

// ADMIN

Route::middleware(['auth', 'verified', AdminMiddleware::class])->group(function () {

    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // Routing Admin User

    Route::get('/admin/kelola-user', function () {
        return Inertia::render('Admin/User/UserMain');
    })->name('admin.user');

    Route::get('/admin/kelola-user/tambah-data', function () {
        return Inertia::render('Admin/User/UserForm', [
            'title' => 'Tambah User',
        ]);
    })->name('admin.user.create');

    Route::get('/admin/kelola-user/edit/{id}', function ($id) {
        return Inertia::render('Admin/User/UserForm', [ 'id' => $id,]);
    })->name('admin.user.edit');

    Route::post('/admin/users', [UserController::class, 'store'])->name('admin.users.store');
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users.index');
    Route::get('/admin/users/{id}', [UserController::class, 'show']);

    Route::put('/admin/users/{id}', [UserController::class, 'update'])->name('admin.users.update');
    Route::delete('/admin/users/{id}', [UserController::class, 'destroy'])->name('admin.users.destroy');



    // Routing Admin Prosedur Kerja

    Route::get('/admin/kelola-prosedur-kerja', function () {
        return Inertia::render('Admin/ProsedurKerja/ProsedurKerjaMain');
    })->name('admin.prosedurKerja');

    Route::get('/admin/kelola-prosedur-kerja/tambah-data', function () {
        return Inertia::render('Admin/ProsedurKerja/ProsedurKerjaForm', [
            'title' => 'Tambah Prosedur Kerja',
        ]);
    })->name('admin.prosedurKerja.create');

    // Routing Admin Daftar Alat

    Route::get('/admin/kelola-daftar-alat', function () {
        return Inertia::render('Admin/DaftarAlat/DaftarAlatMain');
    })->name('admin.daftarAlat');

    Route::get('/admin/kelola-daftar-alat/tambah-data', function () {
        return Inertia::render('Admin/DaftarAlat/DaftarAlatForm', [
            'title' => 'Tambah Daftar Alat',
        ]);
    })->name('admin.alat.create');

    Route::get('/admin/kelola-daftar-alat/edit/{id}', function ($id) {
        return Inertia::render('Admin/DaftarAlat/DaftarAlatForm', ['id' => $id,]);
    })->name('admin.alat.edit');

    Route::post('/admin/daftar_alat', [DaftarAlatController::class, 'store'])->name('admin.alats.store');
    Route::get('/admin/daftar_alat', [DaftarAlatController::class, 'index'])->name('admin.alats.index');
    Route::get('/admin/daftar_alat/{id}', [DaftarAlatController::class, 'show']);


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

    Route::get('/admin/kelola-faq/edit/{id}', function ($id) {
        return Inertia::render('Admin/Faq/FaqForm', ['id' => $id,]);
    })->name('admin.faq.edit');

    Route::post('/admin/faqs', [FaqController::class, 'store'])->name('admin.faqs.store');
    Route::get('/admin/faqs', [FaqController::class, 'index'])->name('admin.faqs.index');
    Route::get('/admin/faqs/{id}', [FaqController::class, 'show']);

    // Routing Admin Video Tutorial

    Route::get('/admin/kelola-video-tutorial', function () {
        return Inertia::render('Admin/VideoTutorial/VideoTutorialMain');
    })->name('admin.videoTutorial');

    Route::get('/admin/kelola-video-tutorial/tambah-data', function () {
        return Inertia::render('Admin/VideoTutorial/VideoTutorialForm', [
            'title' => 'Tambah Video',
        ]);
    })->name('admin.videoTutorial.create');



});



require __DIR__.'/auth.php';
