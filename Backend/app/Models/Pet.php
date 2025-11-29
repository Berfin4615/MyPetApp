<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'species',
        'breed',
        'gender',
        'birth_date',
        'current_weight_kg',
        'is_neutered',
        'chip_number',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
