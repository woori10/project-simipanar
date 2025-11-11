<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SatuanKerja;


class SatuanKerjaController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('query');

        $results = SatuanKerja::where('satker', 'like', "%{$query}%")
            ->orderBy('satker', 'asc')
            ->get(); // hapus take(10)

        return response()->json($results);
    }
}
