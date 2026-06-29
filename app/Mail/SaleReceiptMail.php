<?php

namespace App\Mail;

use App\Models\Sale;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SaleReceiptMail extends Mailable
{
    use Queueable, SerializesModels;

    public Sale $sale;

    public function __construct(Sale $sale)
    {
        $this->sale = $sale;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reçu de paiement - ' . $this->sale->reference,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.sales.receipt',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}