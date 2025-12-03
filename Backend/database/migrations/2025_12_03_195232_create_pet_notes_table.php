<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pet_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pet_id')->constrained()->onDelete('cascade');
            $table->text('note');
            $table->string('mood')->nullable(); // "enerjik", "yorgun" vs. opsiyonel
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pet_notes');
    }
};
