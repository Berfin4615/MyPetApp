<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use Illuminate\Http\Request;

class PetController extends Controller
{
    public function index(Request $request)
    {
        // Giriş yapmış kullanıcının pet’leri
        $pets = $request->user()->pets()->get();

        return response()->json($pets);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'   => 'required|string|max:255',
            'species'=> 'nullable|string|max:255',
            'breed'  => 'nullable|string|max:255',
            'gender' => 'nullable|in:male,female',
            'birth_date' => 'nullable|date',
            'current_weight_kg' => 'nullable|numeric',
            'is_neutered' => 'boolean',
            'chip_number' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $pet = $request->user()->pets()->create($data);

        return response()->json($pet, 201);
    }

    public function show(Pet $pet)
    {
        $this->authorize('view', $pet); // istersen policy ile korursun
        return response()->json($pet);
    }

    public function update(Request $request, Pet $pet)
    {
        $this->authorize('update', $pet);

        $data = $request->validate([
            'name'   => 'sometimes|string|max:255',
            'species'=> 'sometimes|nullable|string|max:255',
            'breed'  => 'sometimes|nullable|string|max:255',
            'gender' => 'sometimes|nullable|in:male,female',
            'birth_date' => 'sometimes|nullable|date',
            'current_weight_kg' => 'sometimes|nullable|numeric',
            'is_neutered' => 'sometimes|boolean',
            'chip_number' => 'sometimes|nullable|string|max:255',
            'description' => 'sometimes|nullable|string',
        ]);

        $pet->update($data);

        return response()->json($pet);
    }

    public function destroy(Pet $pet)
    {
        $this->authorize('delete', $pet);

        $pet->delete();

        return response()->json(null, 204);
    }
}

