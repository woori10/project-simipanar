<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],

            // Tambahkan aturan validasi untuk field baru di sini
            'nip' => ['nullable', 'string', 'max:20'], // Max length 20 (misalnya)
            // Sesuaikan nama field 'satker' jika di database menggunakan 'satker' bukan 'satuan_kerjas_id'
            'satker' => ['nullable', 'string', 'max:255'],
            'no_telp' => ['nullable', 'string', 'max:15'], // Max length 15 (misalnya)
        ];
    }
}
