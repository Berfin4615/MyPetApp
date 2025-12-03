<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use App\Models\PetNote;
use Illuminate\Http\Request;

class PetNoteController extends Controller
{
    // Belirli bir pet'in notlarını listele
    public function index(Request $request, Pet $pet)
    {
        if ($pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $notes = $pet->notes()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notes);
    }

    // Yeni not ekle
    public function store(Request $request, Pet $pet)
    {
        if ($pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $request->validate([
            'note' => 'required|string',
            'mood' => 'nullable|string|max:255',
        ]);

        $note = $pet->notes()->create($data);

        return response()->json($note, 201);
    }

    // İstersen ileride silme de ekleriz
    public function destroy(Request $request, PetNote $note)
    {
        if ($note->pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $note->delete();

        return response()->json(null, 204);
    }
}
