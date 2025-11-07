<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModulDiklat extends Model
{
    use HasFactory;

    protected $fillable = ['daftar_alat_id', 'nama_alat', 'foto', 'dokumen'];

    public function daftarAlat()
    {
        return $this->belongsTo(DaftarAlat::class, 'daftar_alat_id');
    }
}
