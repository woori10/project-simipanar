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
                    ->markdown('emails.user-request-pending');
    }
}
