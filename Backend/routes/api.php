<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PetController;
use App\Http\Controllers\Api\PetNoteController;
use App\Http\Controllers\Api\PetVaccinationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('me', function (Request $request) {
        return $request->user();
    });

    Route::get('/pets', [PetController::class, 'index']);
    Route::post('/pets', [PetController::class, 'store']);
    Route::get('/pets/{pet}', [PetController::class, 'show']);
    Route::put('/pets/{pet}', [PetController::class, 'update']);
    Route::delete('/pets/{pet}', [PetController::class, 'destroy']);

    Route::get('pets/{pet}/notes', [PetNoteController::class, 'index']);
    Route::post('pets/{pet}/notes', [PetNoteController::class, 'store']);
    Route::delete('pet-notes/{note}', [PetNoteController::class, 'destroy']);

    Route::get('pets/{pet}/vaccinations', [PetVaccinationController::class, 'index']);
    Route::post('pets/{pet}/vaccinations', [PetVaccinationController::class, 'store']);
    Route::delete('pet-vaccinations/{vaccination}', [PetVaccinationController::class, 'destroy']);

});
