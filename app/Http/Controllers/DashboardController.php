<?php

namespace App\Http\Controllers;
use App\Models\DaftarAlat;
use App\Models\ModulDiklat;
use App\Models\ProsedurKerja;
use App\Models\Faq;
use App\Models\VideoTutorial;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getCounts()
    {
        return response()->json([
            'prosedur' => ProsedurKerja::count(),
            'alat' => DaftarAlat::count(),
            'modul' => ModulDiklat::count(),
            'faq' => Faq::count(),
            'video' => VideoTutorial::count(),
            'user' => User::count(),
            // 'requestUser' => RequestUser::count(),
        ]);
    }
}
