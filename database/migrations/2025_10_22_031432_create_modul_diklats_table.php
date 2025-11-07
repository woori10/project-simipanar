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
        Schema::create('modul_diklats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daftar_alat_id')
                  ->constrained('daftar_alats')
                  ->onDelete('cascade');
            $table->string('dokumen')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modul_diklats');
    }
};
