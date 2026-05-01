<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $product = $this->route('product');
        $productId = $product?->id;

        return [
            'category_id' => [
                'required',
                'integer',
                Rule::exists('categories', 'id'),
            ],

            'name' => [
                'required',
                'string',
                'max:150',
                Rule::unique('products', 'name')
                    ->ignore($productId)
                    ->whereNull('deleted_at'),
            ],

            'description' => [
                'nullable',
                'string',
                'max:1500',
            ],

            'purchase_price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'selling_price' => [
                'required',
                'numeric',
                'min:0',
                'gte:purchase_price',
            ],

            'stock_quantity' => [
                'required',
                'integer',
                'min:0',
            ],

            'alert_quantity' => [
                'required',
                'integer',
                'min:0',
            ],

            'status' => [
                'nullable',
                Rule::in(['disponible', 'faible_stock', 'rupture', 'inactif']),
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ];
    }
}