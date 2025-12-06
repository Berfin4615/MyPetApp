<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use App\Models\PetFeedLog;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PetFeedLogController extends Controller
{
    public function today(Request $request, Pet $pet)
    {
        if ($pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $today = Carbon::today();

        $logs = $pet->feedLogs()
            ->whereDate('fed_at', $today)
            ->orderBy('fed_at', 'desc')
            ->get();

        $totalGram = $logs->sum('amount_gram');

        return response()->json([
            'logs' => $logs,
            'total_gram' => $totalGram,
            'count' => $logs->count(),
        ]);
    }

    public function store(Request $request, Pet $pet)
    {
        if ($pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $request->validate([
            'amount_gram' => 'nullable|integer|min:0',
            'meal_type'   => 'nullable|string|max:255',
            'fed_at'      => 'nullable|date', 
        ]);

        if (empty($data['fed_at'])) {
            $data['fed_at'] = now();
        }

        $log = $pet->feedLogs()->create($data);

        return response()->json($log, 201);
    }
}
