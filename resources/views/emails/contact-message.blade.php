<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact</title>
</head>
<body style="margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#0f172a;">
    <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
        <div style="background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;">
            <div style="background:#0e7490;padding:24px;color:#ffffff;">
                <h1 style="margin:0;font-size:24px;">Nouveau message de contact</h1>
            </div>

            <div style="padding:28px;">
                <p style="margin:0 0 12px;"><strong>Nom :</strong> {{ $name }}</p>
                <p style="margin:0 0 24px;">
                    <strong>Email :</strong>
                    <a href="mailto:{{ $email }}" style="color:#0e7490;">{{ $email }}</a>
                </p>

                <div style="padding:18px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;line-height:1.6;">
                    {!! nl2br(e($contactMessage)) !!}
                </div>
            </div>
        </div>
    </div>
</body>
</html>
