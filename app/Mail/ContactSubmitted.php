<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    /** @var array<string, mixed> */
    public array $data;

    /**
     * @param array<string, mixed> $data
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function build(): self
    {
        $subject = 'Nouveau message de contact';
        if (!empty($this->data['reason'])) {
            $subject .= ' - ' . ucfirst((string) $this->data['reason']);
        }

        return $this->subject($subject)
            ->view('emails.contact-submitted')
            ->with(['data' => $this->data]);
    }
}
