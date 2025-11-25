<?php

namespace App\Http\Controllers;

use App\Models\VideoTutorial;
use App\Models\DaftarAlat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VideoTutorialController extends Controller
{
    public function listAlat()
    {
        $alat = DaftarAlat::withCount('videoTutorial')->get();
        return response()->json($alat);
    }

    public function listByAlat($id)
    {
        $alat = DaftarAlat::with('videoTutorial')->findOrFail($id);
        return response()->json($alat);
    }

    public function index()
    {
        $videoTutorial = VideoTutorial::with('daftarAlat')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'judul_video' => $item->judul_video,
                'nama_alat' => $item->daftarAlat ? $item->daftarAlat->nama_alat : '-',
                'kategori' => $item->kategori,
                'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                'video' => $item->video ? asset('storage/' . $item->video) : null,
                'tanggal' => $item->created_at->format('Y-m-d'),
            ];
        });

        return response()->json(['videoTutorial' => $videoTutorial]);
    }

    public function show($id)
    {
        $video = VideoTutorial::with('daftarAlat')->findOrFail($id);

        return response()->json([
            'id' => $video->id,
            'judul_video' => $video->judul_video,
            'daftar_alat_id' => $video->daftar_alat_id,
            'video' => $video->video ? asset('storage/' . $video->video) : null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul_video' => 'required|string|max:255',
            'daftar_alat_id' => 'required|exists:daftar_alats,id',
            'video' => 'required|mimetypes:video/mp4,video/mpeg,video/quicktime|max:512000',
        ]);

        $alat = DaftarAlat::findOrFail($validated['daftar_alat_id']);
        $fileVideoPath = $request->file('video')->store('video', 'public');

        $videoTutorial = VideoTutorial::create([
            'daftar_alat_id' => $alat->id,
            'judul_video' => $validated['judul_video'],
            'nama_alat' => $alat->nama_alat,
            'kategori' => $alat->kategori,
            'foto' => $alat->foto,
            'video' => $fileVideoPath,
        ]);

        return response()->json([
            'message' => 'Video berhasil ditambahkan!',
            'data' => $videoTutorial
        ]);
    }

    public function update(Request $request, $id)
    {
        $video_tutorial = VideoTutorial::findOrFail($id);

        $validated = $request->validate([
            'judul_video' => 'sometimes|string|max:255',
            'daftar_alat_id' => 'sometimes|exists:daftar_alats,id',
            'video' => 'sometimes|mimetypes:video/mp4,video/mpeg,video/quicktime|max:512000',
        ]);

        if ($request->has('judul_video')) {
            $video_tutorial->judul_video = $validated['judul_video'];
        }

        if ($request->has('daftar_alat_id')) {
            $video_tutorial->daftar_alat_id = $validated['daftar_alat_id'];
        }

        if ($request->hasFile('video')) {
            // hapus file lama
            if ($video_tutorial->video && Storage::disk('public')->exists($video_tutorial->video)) {
                Storage::disk('public')->delete($video_tutorial->video);
            }

            $videoPath = $request->file('video')->store('video', 'public');
            $video_tutorial->video = $videoPath;
        }

        $video_tutorial->save();

        return response()->json([
            'message' => 'Video berhasil diperbarui!',
            'data' => $video_tutorial
        ]);
    }

    public function destroy($id)
    {
        $video_tutorial = VideoTutorial::findOrFail($id);

        if ($video_tutorial->video && Storage::disk('public')->exists($video_tutorial->video)) {
            Storage::disk('public')->delete($video_tutorial->video);
        }

        $video_tutorial->delete();

        return response()->json(['message' => 'Video tutorial berhasil dihapus']);
    }

    public function indexUser()
    {
        $alatList = DaftarAlat::withCount('videoTutorial')->get();

        $videos = VideoTutorial::with('daftarAlat')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'judul_video' => $item->judul_video,
                'video' => $item->video ? asset('storage/' . $item->video) : null,
                'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
            ];
        });

        return Inertia::render('User/VideoTutorial', [
            'alats' => $alatList,
            'videos' => [],
            'selectedAlatId' => null,
        ]);
    }

    public function showByAlat($alat_id)
    {
        $alatList = DaftarAlat::withCount('videoTutorial')->get();
        $selectedAlat = DaftarAlat::findOrFail($alat_id);

        $videos = $selectedAlat->videoTutorial->map(function ($item) {
            return [
                'id' => $item->id,
                'judul_video' => $item->judul_video,
                'video' => asset('storage/' . $item->video),
                'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
            ];
        });

        return Inertia::render('User/VideoTutorial', [
            'alats' => $alatList,
            'videos' => $videos,
            'selectedAlatId' => $selectedAlat->id,
        ]);
    }


}
