<?php

namespace App\Http\Controllers;


use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    // Ambil semua notif (misalnya untuk user)
    public function index()
    {
        return response()->json([
            'notifications' => Notification::orderBy('created_at', 'desc')->get()
        ]);
    }

    // Tambahkan notifikasi baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'message' => 'required|string',
        ]);

        Notification::create([
            'type' => $validated['type'],
            'message' => $validated['message'],
            'is_read' => false,
        ]);

        return response()->json(['success' => true]);
    }

    public function markAllRead()
    {
        Notification::where('is_read', false)->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }

}
