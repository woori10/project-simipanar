<?php

namespace App\Http\Controllers;

use App\Models\DaftarAlat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DaftarAlatController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nama_alat'=> 'required|string|max:255',
            'kategori'=> 'required|string|max:255',
            'foto'=> 'required|image|mimes:jpg,jpeg,png|max:2048',
        ], [
            'nama_alat.required' => 'Nama harus diisi.',
            'nama_alat.string'   => 'Nama harus berupa teks.',
            'nama_alat.max'      => 'Nama maksimal 255 karakter.',

            'kategori.required' => 'Kategori harus diisi.',
            'kategori.string'   => 'Kategori harus berupa teks.',
            'kategori.max'      => 'Kategori maksimal 255 karakter.',

            'foto.required' => 'Foto wajib diunggah.',
            'foto.image'    => 'File foto harus berupa gambar.',
            'foto.mimes'    => 'Format foto harus jpg, jpeg, atau png.',
            'foto.max'      => 'Ukuran foto maksimal 2 MB.',
        ]);

        $fotoPath = $request->file('foto')->store('foto', 'public');

        $nama_alat = DaftarAlat::create([
            'nama_alat' => $request->nama_alat,
            'kategori' => $request->kategori,
            'foto' => $fotoPath,
        ]);

        return redirect('/admin/kelola-daftar-alat')
                        ->with('success', 'Data berhasil disimpan!');
    }

    public function index()
    {
        $daftar_alat = DaftarAlat::all()->map(function ($item) {
            return[
                'id' => $item->id,
                'nama_alat' => $item->nama_alat,
                'kategori' => $item->kategori,
                'foto' => asset('storage/'. $item->foto),
                'tanggal' => $item->created_at->format('Y-m-d'),
            ];
        });

        return response()->json([
            'alats' => $daftar_alat
        ]);
    }

    public function show($id)
    {
        $daftar_alat = DaftarAlat::findOrFail($id);

        return response()->json([
            'id' => $daftar_alat->id,
            'nama_alat' => $daftar_alat->nama_alat,
            'kategori' => $daftar_alat->kategori,
            'foto' => asset('storage/' . $daftar_alat->foto),
        ]);
    }

    public function update (Request $request, $id)
    {
        $daftar_alat = DaftarAlat::findOrFail($id);

        $request->validate([
            'nama_alat'=> 'sometimes|string|max:255',
            'kategori'=> 'sometimes|string|max:255',
            'foto'=> 'sometimes|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // update kolom teks
        $daftar_alat->nama_alat = $request->nama_alat ?? $daftar_alat->nama_alat;
        $daftar_alat->kategori = $request->kategori ?? $daftar_alat->kategori;

        // update file foto bila ada
        if ($request->hasFile('foto')) {
            Storage::disk('public')->delete($daftar_alat->foto);
            $daftar_alat->foto = $request->file('foto')->store('foto', 'public');
        }

        $daftar_alat->save();

        return response()->json([
            'message'=>'Daftar Alat Berhasil Diperbarui',
            'daftar_alat'=>$daftar_alat
        ]);

    }

    public function destroy($id)
    {
        $daftar_alat = DaftarAlat::findOrFail($id);

        Storage::disk('public')->delete($daftar_alat->foto);

        $daftar_alat->delete();

        return response()->json([
            'message' => 'Alat Berhasil Dihapus'
        ]);
    }
}
