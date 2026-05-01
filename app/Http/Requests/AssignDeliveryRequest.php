<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignDeliveryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'livreur_id' => ['required', 'integer', 'exists:users,id'],
            'scheduled_date' => ['nullable', 'date'],
            'delivery_address' => ['nullable', 'string', 'max:255'],
            'delivery_phone' => ['nullable', 'string', 'max:40'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
