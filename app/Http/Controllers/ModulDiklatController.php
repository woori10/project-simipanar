<?php

namespace App\Http\Controllers;

use App\Models\ModulDiklat;
use App\Models\DaftarAlat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ModulDiklatController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'daftar_alat_id' => 'required|exists:daftar_alats,id',
            'dokumen'       => 'required|mimes:pdf|max:102400',
        ]);

        // Ambil data alat dari tabel daftar_alats
        $alat = DaftarAlat::findOrFail($validated['daftar_alat_id']);

        // Simpan file PDF ke storage/public/file_pdf
        $filePDFPath = $request->file('dokumen')->store('dokumen', 'public');


        // Simpan ke tabel materi_diklat
        $modulDiklat = ModulDiklat::create([
            'daftar_alat_id' => $alat->id,
            'nama_alat'      => $alat->nama_alat,
            'foto'           => $alat->foto,
            'dokumen'       => $filePDFPath,
        ]);


        return response()->json([
            'message' => 'Modul Diklat berhasil ditambahkan!',
            'data' => $modulDiklat
        ]);

    }

    public function index()
    {
        $modulDiklat = ModulDiklat::with('daftarAlat')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'nama_alat' => $item->nama_alat,
                'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                'dokumen' => $item->dokumen ? asset('storage/' . $item->dokumen) : null,
                'tanggal' => $item->created_at->format('Y-m-d'),
            ];
        });

        return response()->json([
            'modulDiklat' => $modulDiklat,
        ]);

    }

    public function show($id)
    {
        $modulDiklat = ModulDiklat::with('daftarAlat')->findOrFail($id);

        $alat = $modulDiklat->daftarAlat;

        return response()->json([
            'id' => $modulDiklat->id,
            'daftar_alat_id' => $modulDiklat->daftar_alat_id,
            'nama_alat' => $alat->nama_alat,
            'foto' => $alat && $alat->foto ? asset('storage/' . $alat->foto) : null,
            'dokumen' => $modulDiklat->dokumen ? asset('storage/' . $modulDiklat->dokumen) : null,
        ]);
    }

    public function update(Request $request, $id)
    {
        $modulDiklat = ModulDiklat::findOrFail($id);

        $request->validate([
            'daftar_alat_id' => 'sometimes|exists:daftar_alats,id',
            'dokumen'       => 'sometimes|mimes:pdf|max:102400',
        ]);

        // Jika alat diganti, update nama & foto juga
        if ($request->filled('daftar_alat_id')) {
            $alat = DaftarAlat::findOrFail($request->daftar_alat_id);
            $modulDiklat->daftar_alat_id = $alat->id;
            $modulDiklat->nama_alat = $alat->nama_alat;
            $modulDiklat->foto = $alat->foto;
        }

        // Jika PDF baru diupload
        if ($request->hasFile('dokumen')) {
            Storage::disk('public')->delete($modulDiklat->dokumen);
            $modulDiklat->dokumen = $request->file('dokumen')->store('dokumen', 'public');
        }

        $modulDiklat->save();

        return response()->json([
            'message' => 'Modul Diklat berhasil diperbarui!',
            'data' => $modulDiklat
        ]);
    }

    public function destroy($id)
    {
        $modulDiklat = ModulDiklat::findOrFail($id);

        // hapus file PDF juga dari storage
        Storage::disk('public')->delete($modulDiklat->dokumen);

        $modulDiklat->delete();

        return response()->json([
            'message' => 'Materi Diklat Berhasil Dihapus'
        ]);
    }

    public function indexUser()
    {
        $moduls = \App\Models\ModulDiklat::latest()->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'nama_alat' => $item->nama_alat,
                'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                'dokumen' => $item->dokumen ? asset('storage/' . $item->dokumen) : null,
                'tanggal' => $item->created_at->format('Y-m-d'),
            ];
        });

        return inertia('User/ModulDiklat', [
            'moduls' => $moduls,
        ]);
    }
}
