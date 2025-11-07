<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'pertanyaan' => 'required|string',
            'jawaban'    => 'required|string',
        ]);

        $faqs = Faq::create($data);

        return redirect('/admin/kelola-faq')
                        ->with('success', 'Data berhasil disimpan!');
    }

    public function index()
    {
        return response()->json([
            'message' => 'Daftar semua FAQ',
            'faqs'    => Faq::all()
        ]);
    }

    public function show($id)
    {
        $faqs = Faq::find($id);

        if (! $faqs) {
            return response()->json(['message' => 'FAQ tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Detail FAQ',
            'faqs'    => $faqs
        ]);
    }

    public function update(Request $request, $id)
    {
        $faqs = Faq::findOrFail($id);

        $validated = $request->validate([
            'pertanyaan' => 'sometimes|string|max:255',
            'jawaban'    => 'sometimes|string|max:255',
        ]);

        $faqs->update($validated);

        return response()->json([
            'message' => 'FAQ berhasil diperbarui',
            'faqs'    => $faqs
        ]);
    }

    public function destroy($id)
    {
        $faqs = Faq::findOrFail($id);
        $faqs->delete();

        return response()->json([
            'message' => 'FAQ berhasil dihapus'
        ]);
    }
}
