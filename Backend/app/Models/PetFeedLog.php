<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PetFeedLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'pet_id',
        'amount_gram',
        'meal_type',
        'fed_at',
    ];

    protected $casts = [
        'fed_at' => 'datetime',
    ];

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }
}
