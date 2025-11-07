<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoTutorial extends Model
{
    use HasFactory;

    protected $fillable = ['daftar_alat_id', 'judul_video', 'kategori', 'foto', 'video'];

    public function daftarAlat()
    {
        return $this->belongsTo(DaftarAlat::class, 'daftar_alat_id');
    }
}

