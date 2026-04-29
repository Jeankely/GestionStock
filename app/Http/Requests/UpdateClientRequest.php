<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClientRequest extends FormRequest
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
        $clientId = $this->route('client')?->id;

        return [
            'name' => [
                'required',
                'string',
                'max:150',
            ],

            'email' => [
                'nullable',
                'email',
                'max:150',
                Rule::unique('clients', 'email')
                    ->ignore($clientId)
                    ->whereNull('deleted_at'),
            ],

            'phone' => [
                'nullable',
                'string',
                'max:50',
                Rule::unique('clients', 'phone')
                    ->ignore($clientId)
                    ->whereNull('deleted_at'),
            ],

            'address' => [
                'nullable',
                'string',
                'max:255',
            ],

            'type' => [
                'required',
                Rule::in(['particulier', 'entreprise']),
            ],

            'is_active' => [
                'required',
                'boolean',
            ],
        ];
    }
}
