<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PetNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'pet_id',
        'note',
        'mood',
    ];

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }
}
