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
use App\Http\Controllers\ProsedurKerjaController;
use App\Http\Controllers\ModulDiklatController;
use App\Http\Controllers\VideoTutorialController;
use App\Http\Controllers\DashboardController;
use \App\Http\Controllers\SatuanKerjaController;
use App\Http\Controllers\RegisterRequestController;
use App\Http\Controllers\AdminUserRequestController;


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

Route::post('/register-request', [RegisterRequestController::class, 'store']);

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('user.dashboard');
    }

    return redirect()->route('login');
});

Route::get('/admin/satuan-kerja/search', [SatuanKerjaController::class, 'search'])->name('satker.search');


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
})->middleware(['auth'])->name('user.dashboard');

Route::get('/user/prosedur-kerja', [ProsedurKerjaController::class, 'indexUser'])
    ->middleware(['auth', 'verified'])
    ->name('user.prosedurKerja');

Route::get('/user/modul-diklat', [ModulDiklatController::class, 'indexUser'])
    ->middleware(['auth', 'verified'])
    ->name('user.modulDiklat');

Route::get('/user/faq', function () {
    return Inertia::render('User/Faq', [
        'faqs' => \App\Models\Faq::all(),
    ]);
});

// Semua video tutorial per user
Route::get('/user/video-tutorial', [VideoTutorialController::class, 'indexUser'])
    ->middleware(['auth', 'verified'])
    ->name('user.videoTutorial');

// Dinamis per alat
Route::get('/user/video-tutorial/{alat_id}', [VideoTutorialController::class, 'showByAlat'])
    ->middleware(['auth', 'verified'])
    ->name('user.videoTutorial.show');
// Route::prefix('video-tutorial')->group(function () {
//     Route::get('/ion-scan', function () {
//         return Inertia::render('User/VideoTutorial/IonScan');
//     });
//     Route::get('/hamzat', function () {
//         return Inertia::render('User/VideoTutorial/Hamzat');
//     });
// })->middleware(['auth', 'verified'])->name('user.videoTutorial');

Route::get('/user/daftar-alat', [DaftarAlatController::class, 'listAlatUser'])
    ->middleware(['auth', 'verified'])
    ->name('user.daftarAlat');

Route::get('/user/video-tutorial', function () {
    return Inertia::render('User/VideoTutorial');
})->middleware(['auth', 'verified'])->name('user.videoTutorial');

// ADMIN

Route::middleware(['auth', 'verified', AdminMiddleware::class])->group(function () {

    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    Route::get('/admin/dashboard/counts', [DashboardController::class, 'getCounts'])->name('admin.dashboard.counts');

    // Request User

    // List semua request pending
    Route::get('/admin/requests', [AdminUserRequestController::class, 'index']);

    // Approve request
    Route::post('/admin/requests/{id}/approve', [AdminUserRequestController::class, 'approve']);

    // Reject request
    Route::post('/admin/requests/{id}/reject', [AdminUserRequestController::class, 'reject']);

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

    Route::get('/admin/kelola-prosedur-kerja/edit/{id}', function ($id) {
        return Inertia::render('Admin/ProsedurKerja/ProsedurKerjaForm', [ 'id' => $id,]);
    })->name('admin.prosedurKerja.edit');

    Route::post('/admin/prosedur-kerja', [ProsedurKerjaController::class, 'store'])->name('admin.prosedurKerja.store');
    Route::get('/admin/prosedur-kerja', [ProsedurKerjaController::class, 'index'])->name('admin.prosedurKerja.index');
    Route::get('/admin/prosedur-kerja/{id}', [ProsedurKerjaController::class, 'show']);
    Route::put('/admin/prosedur-kerja/{id}', [ProsedurKerjaController::class, 'update'])->name('admin.prosedurKerja.update');
    Route::delete('/admin/prosedur-kerja/{id}', [ProsedurKerjaController::class, 'destroy'])->name('admin.prosedurKerja.destroy');


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

    Route::post('/admin/daftar-alat', [DaftarAlatController::class, 'store'])->name('admin.alats.store');
    Route::get('/admin/daftar-alat', [DaftarAlatController::class, 'index'])->name('admin.alats.index');
    Route::get('/admin/daftar-alat/{id}', [DaftarAlatController::class, 'show']);
    Route::put('/admin/daftar-alat/{id}', [DaftarAlatController::class, 'update'])->name('admin.alats.update');
    Route::delete('/admin/daftar-alat/{id}', [DaftarAlatController::class, 'destroy'])->name('admin.alats.destroy');



    // Routing Admin Modul Diklat

    Route::get('/admin/kelola-modul-diklat', function () {
        return Inertia::render('Admin/ModulDiklat/ModulDiklatMain' , [
            'title' => 'Kelola Modul Diklat',
        ]);
    })->name('admin.modulDiklat');

    Route::get('/admin/kelola-modul-diklat/tambah-data', function () {
        return Inertia::render('Admin/ModulDiklat/ModulDiklatForm', [
            'title' => 'Tambah Modul Diklat',
        ]);
    })->name('admin.modulDiklat.create');

    Route::get('/admin/kelola-modul-diklat/edit/{id}', function ($id) {
        return Inertia::render('Admin/ModulDiklat/ModulDiklatForm', [ 'id' => $id,]);
    })->name('admin.modulDiklat.edit');

    Route::post('/admin/modul-diklat', [ModulDiklatController::class, 'store'])->name('admin.modulDiklat.store');
    Route::get('/admin/modul-diklat', [ModulDiklatController::class, 'index'])->name('admin.modulDiklat.index');
    Route::get('/admin/modul-diklat/{id}', [ModulDiklatController::class, 'show']);
    Route::put('admin/modul-diklat/{id}', [ModulDiklatController::class, 'update'])->name('admin.modulDiklat.update');
    Route::delete('admin/modul-diklat/{id}', [ModulDiklatController::class, 'destroy'])->name('admin.modulDiklat.destroy');


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
    Route::put('/admin/faqs/{id}', [FaqController::class, 'update'])->name('admin.faqs.update');
    Route::delete('/admin/faqs/{id}', [FaqController::class, 'destroy'])->name('admin.faqs.destroy');

    // Routing Admin Video Tutorial

    Route::get('/admin/kelola-video-tutorial', function () {
        return Inertia::render('Admin/VideoTutorial/VideoTutorialMain');
    })->name('admin.videoTutorial');

    Route::get('/admin/kelola-video-tutorial/tambah-data', function () {
        return Inertia::render('Admin/VideoTutorial/VideoTutorialForm', [
            'title' => 'Tambah Video',
        ]);
    })->name('admin.videoTutorial.create');

    Route::get('/admin/kelola-video-tutorial/edit/{id}', function ($id) {
        return Inertia::render('Admin/VideoTutorial/VideoTutorialForm', [ 'id' => $id,]);
    })->name('admin.videoTutorial.edit');

    Route::post('/admin/video-tutorial', [VideoTutorialController::class, 'store'])->name('admin.videoTutorial.store');
    Route::get('/admin/video-tutorial', [VideoTutorialController::class, 'index'])->name('admin.videoTutorial.index');
    Route::get('/admin/video-tutorial/{id}', [VideoTutorialController::class, 'show']);
    Route::put('/admin/video-tutorial/{id}', [VideoTutorialController::class, 'update'])->name('admin.videoTutorial.update');
    Route::delete('/admin/video-tutorial/{id}', [VideoTutorialController::class, 'destroy'])->name('admin.videoTutorial.destroy');

});



require __DIR__.'/auth.php';
