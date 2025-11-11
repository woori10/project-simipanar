<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SatuanKerja extends Model
{
    protected $fillable = ['satker'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
