<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Reçu de paiement</title>
</head>
<body style="margin:0; padding:0; background:#f1f5f9; font-family:Arial, sans-serif; color:#0f172a;">
    @php
        function money_ar($amount) {
            return number_format((float) $amount, 0, ',', ' ') . ' Ar';
        }
    @endphp

    <div style="max-width:720px; margin:0 auto; padding:24px;">
        <div style="background:linear-gradient(135deg,#0891b2,#2563eb); color:white; padding:24px; border-radius:18px 18px 0 0;">
            <h1 style="margin:0; font-size:26px;">JK TechStore</h1>
            <p style="margin:8px 0 0; font-size:14px;">
                Reçu de paiement et de livraison
            </p>
        </div>

        <div style="background:white; padding:24px; border-radius:0 0 18px 18px;">
            <p style="font-size:15px;">
                Bonjour <strong>{{ $sale->client?->name ?? 'Client' }}</strong>,
            </p>

            <p style="font-size:15px; line-height:1.6;">
                Nous vous confirmons que votre commande a été
                <strong>livrée</strong> et <strong>payée</strong> avec succès.
            </p>

            <div style="margin:20px 0; padding:16px; background:#ecfeff; border:1px solid #bae6fd; border-radius:14px;">
                <p style="margin:0 0 8px;">
                    <strong>Référence :</strong> {{ $sale->reference }}
                </p>
                <p style="margin:0 0 8px;">
                    <strong>Date :</strong>
                    {{ optional($sale->sale_date)->format('d/m/Y') ?? $sale->sale_date }}
                </p>
                <p style="margin:0;">
                    <strong>Mode de paiement :</strong>
                    {{ ucfirst(str_replace('_', ' ', $sale->payment_method ?? 'espèce')) }}
                </p>
            </div>

            <h2 style="font-size:18px; margin-top:24px;">Détails des produits</h2>

            <table style="width:100%; border-collapse:collapse; margin-top:12px;">
                <thead>
                    <tr>
                        <th style="text-align:left; padding:10px; background:#f8fafc; border-bottom:1px solid #e2e8f0;">Produit</th>
                        <th style="text-align:center; padding:10px; background:#f8fafc; border-bottom:1px solid #e2e8f0;">Qté</th>
                        <th style="text-align:right; padding:10px; background:#f8fafc; border-bottom:1px solid #e2e8f0;">Prix</th>
                        <th style="text-align:right; padding:10px; background:#f8fafc; border-bottom:1px solid #e2e8f0;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($sale->items as $item)
                        <tr>
                            <td style="padding:10px; border-bottom:1px solid #e2e8f0;">
                                {{ $item->product?->name ?? 'Produit supprimé' }}
                            </td>
                            <td style="padding:10px; text-align:center; border-bottom:1px solid #e2e8f0;">
                                {{ $item->quantity }}
                            </td>
                            <td style="padding:10px; text-align:right; border-bottom:1px solid #e2e8f0;">
                                {{ money_ar($item->unit_price) }}
                            </td>
                            <td style="padding:10px; text-align:right; border-bottom:1px solid #e2e8f0;">
                                {{ money_ar($item->total_price) }}
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" style="padding:10px; text-align:center; color:#64748b;">
                                Aucun produit enregistré.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>

            <div style="margin-top:24px; padding:18px; background:#f8fafc; border-radius:14px;">
                <p style="margin:0 0 8px; display:flex; justify-content:space-between;">
                    <span>Sous-total :</span>
                    <strong>{{ money_ar($sale->sub_total) }}</strong>
                </p>

                <p style="margin:0 0 8px; display:flex; justify-content:space-between;">
                    <span>Remise :</span>
                    <strong>{{ money_ar($sale->discount) }}</strong>
                </p>

                <p style="margin:0 0 8px; display:flex; justify-content:space-between;">
                    <span>Taxe :</span>
                    <strong>{{ money_ar($sale->tax) }}</strong>
                </p>

                <hr style="border:none; border-top:1px solid #e2e8f0; margin:14px 0;">

                <p style="margin:0; font-size:18px; display:flex; justify-content:space-between; color:#0369a1;">
                    <span>Total payé :</span>
                    <strong>{{ money_ar($sale->total_amount) }}</strong>
                </p>
            </div>

            @if ($sale->delivery)
                <div style="margin-top:20px; padding:16px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:14px;">
                    <p style="margin:0 0 8px;">
                        <strong>Adresse de livraison :</strong>
                        {{ $sale->delivery->delivery_address ?? 'Non renseignée' }}
                    </p>
                    <p style="margin:0;">
                        <strong>Téléphone livraison :</strong>
                        {{ $sale->delivery->delivery_phone ?? 'Non renseigné' }}
                    </p>
                </div>
            @endif

            <p style="margin-top:24px; font-size:14px; line-height:1.6; color:#475569;">
                Merci pour votre achat. Ce message sert de reçu officiel pour votre paiement.
            </p>

            <p style="margin-top:24px; font-size:14px;">
                Cordialement,<br>
                <strong>L’équipe JK TechStore</strong>
            </p>
        </div>
    </div>
</body>
</html>