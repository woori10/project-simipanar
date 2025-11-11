<?php

namespace App\Mail;

use App\Models\UserRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserRequestPending extends Mailable
{
    use Queueable, SerializesModels;

    public $userRequest;

    public function __construct(UserRequest $userRequest)
    {
        $this->userRequest = $userRequest;
    }

    public function build()
    {
        return $this->subject('Pendaftaran Anda Sedang Diproses')
                    ->html(
                        "<p>Hai {$this->userRequest->name},</p>
                        <p>Terima kasih telah mendaftar. Akun Anda sedang menunggu konfirmasi admin dalam 24 jam.</p>
                        <p>Silakan tunggu informasi lebih lanjut.</p>"
                    );
    }
}
