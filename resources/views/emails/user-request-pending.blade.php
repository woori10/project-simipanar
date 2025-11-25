@component('mail::message')
# Hai, {{ $userRequest->name }} 👋

Terima kasih telah melakukan pendaftaran di **SIMIPANAR**!
Akun kamu saat ini **sedang menunggu konfirmasi dari admin**.

@component('mail::panel')
Proses verifikasi biasanya memakan waktu **maksimal 24 jam**.
@endcomponent

Silakan tunggu informasi lebih lanjut ya, Woori 🤍
Terima kasih telah menggunakan layanan kami!

Salam hangat,
**Tim SIMIPANAR**
@endcomponent
