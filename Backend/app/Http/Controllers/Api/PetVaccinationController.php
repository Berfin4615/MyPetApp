<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use App\Models\PetVaccination;
use Illuminate\Http\Request;

class PetVaccinationController extends Controller
{
    public function index(Request $request, Pet $pet)
    {
        if ($pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $vaccines = $pet->vaccinations()
            ->orderBy('next_due_at')
            ->orderBy('given_at', 'desc')
            ->get();

        return response()->json($vaccines);
    }

    public function store(Request $request, Pet $pet)
    {
        if ($pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'given_at'    => 'nullable|date',
            'next_due_at' => 'nullable|date',
            'notes'       => 'nullable|string',
        ]);

        $vaccine = $pet->vaccinations()->create($data);

        return response()->json($vaccine, 201);
    }

    public function destroy(Request $request, PetVaccination $vaccination)
    {
        if ($vaccination->pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $vaccination->delete();

        return response()->json(null, 204);
    }
}
