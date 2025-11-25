@component('mail::message')
# Hai, {{ $user->name }} 🎉

Selamat! Akses kamu ke **SIMIPANAR** sudah disetujui oleh admin.

@component('mail::panel')
Sekarang kamu sudah bisa login dan menggunakan semua fitur yang tersedia.
@endcomponent

@component('mail::button', ['url' => url('/login')])
Login Sekarang
@endcomponent

Jika tombol tidak berfungsi, kamu bisa membuka link berikut secara manual:
{{ url('/login') }}

Salam hangat,
**Tim SIMIPANAR**
@endcomponent
