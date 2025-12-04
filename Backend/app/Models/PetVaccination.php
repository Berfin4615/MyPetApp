<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PetVaccination extends Model
{
    use HasFactory;

    protected $fillable = [
        'pet_id',
        'name',
        'given_at',
        'next_due_at',
        'notes',
    ];

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }
}
