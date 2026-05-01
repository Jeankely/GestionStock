<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();

            $table->foreignId('sale_id')
                ->constrained('sales')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreignId('livreur_id')
                ->nullable()
                ->constrained('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->string('delivery_address')->nullable();
            $table->string('delivery_phone', 40)->nullable();

            $table->enum('status', [
                'en_attente',
                'assignee',
                'en_cours',
                'livree',
                'annulee',
            ])->default('en_attente');

            $table->date('scheduled_date')->nullable();
            $table->timestamp('delivered_at')->nullable();

            $table->text('notes')->nullable();

            $table->timestamps();

            $table->index(['livreur_id', 'status']);
            $table->index(['sale_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deliveries');
    }
};