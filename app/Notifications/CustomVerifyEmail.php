<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailNotification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;

class CustomVerifyEmail extends VerifyEmailNotification
{
    protected function verificationUrl($notifiable)
    {
        return URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(60),
            ['id' => $notifiable->getKey(), 'hash' => sha1($notifiable->getEmailForVerification())]
        );
    }

    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject('Verifikasi Email Akun SIMIPANAR 💌')
            ->greeting('Hai, ' . $notifiable->name . ' 👋')
            ->line('Terima kasih sudah mendaftar di SIMIPANAR!')
            ->line('Sebelum kamu bisa masuk ke sistem, silakan verifikasi alamat email kamu dengan menekan tombol di bawah ini.')
            ->action('Verifikasi Sekarang', $verificationUrl)
            ->line('Link ini hanya berlaku selama 60 menit.')
            ->salutation('Salam hangat, 💐' . "\n" . 'Tim SIMIPANAR');
    }
}
