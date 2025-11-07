<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaftarAlat extends Model
{
    use HasFactory;

    protected $table = 'daftar_alats';
    protected $fillable = ['nama_alat','kategori','foto'];

    public function modulDiklats()
    {
        return $this->hasMany(ModulDiklat::class);
    }

    public function videoTutorial()
    {
        return $this->hasMany(VideoTutorial::class);
    }
}
