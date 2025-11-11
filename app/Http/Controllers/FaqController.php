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

        return response()->json([
            'message' => 'FAQ berhasil ditambahkan!',
            'faq' => $faqs
        ]);
        
    }

    public function index()
    {
        $faqs = Faq::all()->map(function ($item) {
            return[
                'id' => $item->id,
                'pertanyaan' => $item->pertanyaan,
                'jawaban' => $item->jawaban,
                'tanggal' => $item->created_at->format('Y-m-d'),
            ];
        });

        return response()->json($faqs);
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
            'message' => 'FAQ berhasil diperbarui!',
            'faq' => $faqs
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
