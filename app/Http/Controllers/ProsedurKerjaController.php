<?php

namespace App\Http\Controllers;

use App\Models\ProsedurKerja;
use Illuminate\Http\Request;

class ProsedurKerjaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'judul'=> 'required|string|max:255',
            'dokumen'=> 'required|mimes:pdf|max:102400',
        ], [
            'judul.required' => 'Judul harus diisi.',
            'judul.string'   => 'Judul harus berupa teks.',
            'judul.max'      => 'Judul maksimal 255 karakter.',

            'dokumen.required' => 'Dokumen wajib diunggah.',
            'dokumen.mimes'    => 'Dokumen hanya boleh berupa file PDF.',
            'dokumen.max'      => 'Ukuran file maksimal 100 MB.',
        ]);

        $dokumenPath = $request->file('dokumen')->store('dokumen', 'public');

        $prosedur_kerja = ProsedurKerja::create([
            'judul' => $request->judul,
            'dokumen' => $dokumenPath,
        ]);

        return response()->json([
            'message' => 'Prosedur Kerja Berhasil Ditambahkan',
            'data' => $prosedur_kerja

        ]);
    }

    public function index()
    {
        $prosedur_kerja = ProsedurKerja::all()->map(function ($item) {
            return[
                'id' => $item->id,
                'judul' => $item->judul,
                'dokumen_url' => asset('storage/'. $item->dokumen),
            ];
        });

        return response()->json($prosedur_kerja);
    }

    public function show($id)
    {
        $prosedur_kerja = ProsedurKerja::findOrFail($id);

        return response()->json([
            'id' => $prosedur_kerja->id,
            'judul' => $prosedur_kerja->judul,
            'dokumen_url' => asset('storage/' . $prosedur_kerja->dokumen),
        ]);
    }

    public function update (Request $request, $id)
    {
        $prosedur_kerja = ProsedurKerja::findOrFail($id);

        $request->validate([
            'judul'=> 'string|max:255',
            'dokumen'=> 'mimes:pdf|max:102400',
        ]);

        if ($request->has('judul')){
            $prosedur_kerja->judul = $request->judul;
        }

        if ($request->hasFile('dokumen')){
            Storage::disk('public')->delete($prosedur_kerja->dokumen);
            $prosedur_kerja->dokumen=$request->file('dokumen')->store('dokumen', 'public');
        }

        $prosedur_kerja->save();

        return response()->json([
            'message'=>'Prosedur Kerja Berhasil Diperbarui',
            'data'=>$prosedur_kerja
        ]);


    }

    public function destroy($id)
    {
        $prosedur_kerja = ProsedurKerja::findOrFail($id);

        Storage::disk('public')->delete($prosedur_kerja->dokumen);

        $prosedur_kerja->delete();

        return response()->json([
            'message' => 'Prosedur Kerja Berhasil Dihapus'
        ]);
    }
}
