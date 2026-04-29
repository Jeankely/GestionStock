<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSalePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'method' => 'espece',
        ]);
    }

    public function rules(): array
    {
        return [
            'payment_date' => [
                'required',
                'date',
            ],

            'amount' => [
                'required',
                'numeric',
                'min:1',
            ],

            'method' => [
                'required',
                'in:espece',
            ],

            'notes' => [
                'nullable',
                'string',
                'max:1500',
            ],
        ];
    }
}