<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Rapport commercial</title>

    <style>
        @page {
            margin: 25px;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #0f172a;
        }

        .header {
            background: #0ea5e9;
            color: white;
            padding: 18px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
            text-transform: uppercase;
        }

        .header p {
            margin: 6px 0 0;
            font-size: 12px;
        }

        .section-title {
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0 10px;
            color: #0369a1;
            border-bottom: 2px solid #0ea5e9;
            padding-bottom: 5px;
        }

        .cards {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }

        .cards td {
            width: 50%;
            padding: 8px;
            vertical-align: top;
        }

        .card {
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 12px;
            background: #f8fafc;
        }

        .card-title {
            color: #64748b;
            font-size: 12px;
            margin-bottom: 6px;
        }

        .card-value {
            font-size: 20px;
            font-weight: bold;
            color: #0f172a;
        }

        table.data {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
        }

        table.data th {
            background: #e0f2fe;
            color: #075985;
            text-align: left;
            padding: 8px;
            border: 1px solid #bae6fd;
        }

        table.data td {
            padding: 8px;
            border: 1px solid #e2e8f0;
        }

        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 20px;
            background: #dcfce7;
            color: #166534;
            font-weight: bold;
            font-size: 11px;
            margin-right: 4px;
        }

        .footer {
            position: fixed;
            bottom: -10px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
            padding-top: 8px;
        }
    </style>
</head>
<body>
    @php
        function money_format_ar($amount) {
            return number_format((float) $amount, 0, ',', ' ') . ' Ar';
        }

        function number_format_fr($number) {
            return number_format((float) $number, 0, ',', ' ');
        }
    @endphp

    <div class="header">
        <h1>Rapport commercial</h1>
        <p>
            Mois : {{ $currentMonth }} {{ $currentYear }} |
            Généré le : {{ $generatedAt }}
        </p>
    </div>

    <div class="section-title">Indicateurs principaux</div>

    <table class="cards">
        <tr>
            <td>
                <div class="card">
                    <div class="card-title">Chiffre d’affaires mensuel</div>
                    <div class="card-value">
                        {{ money_format_ar($reports['monthly_turnover'] ?? 0) }}
                    </div>
                </div>
            </td>
            <td>
                <div class="card">
                    <div class="card-title">Produits vendus</div>
                    <div class="card-value">
                        {{ number_format_fr($reports['sold_products_count'] ?? 0) }}
                    </div>
                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div class="card">
                    <div class="card-title">Nouveaux clients</div>
                    <div class="card-value">
                        {{ number_format_fr($reports['new_clients_count'] ?? 0) }}
                    </div>
                </div>
            </td>
            <td>
                <div class="card">
                    <div class="card-title">Stock total</div>
                    <div class="card-value">
                        {{ number_format_fr($reports['stock_total'] ?? 0) }}
                    </div>
                </div>
            </td>
        </tr>
    </table>

    <div class="section-title">Résumé rapide</div>

    <table class="data">
        <tr>
            <th>Meilleure catégorie</th>
            <td>{{ $summary['best_category'] ?? 'Aucune donnée' }}</td>
        </tr>
        <tr>
            <th>Produit vedette</th>
            <td>{{ $summary['top_product'] ?? 'Aucune donnée' }}</td>
        </tr>
        <tr>
            <th>Taux de croissance</th>
            <td>
                {{ ($summary['growth_rate'] ?? 0) >= 0 ? '+' : '' }}
                {{ $summary['growth_rate'] ?? 0 }} %
            </td>
        </tr>
    </table>

    <div class="section-title">Évolution mensuelle du chiffre d’affaires</div>

    <table class="data">
        <thead>
            <tr>
                <th>Mois</th>
                <th>Montant</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($monthlyData as $item)
                <tr>
                    <td>{{ $item['month'] }}</td>
                    <td>{{ money_format_ar($item['amount']) }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="2">Aucune donnée mensuelle disponible.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="section-title">Statuts comptabilisés</div>

    <p>
        <span class="badge">Validée</span>
        <span class="badge">Payée</span>
        <span class="badge">Livrée</span>
    </p>

    <div class="footer">
        Rapport généré automatiquement par JK TechStore
    </div>
</body>
</html>