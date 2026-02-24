import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Mot de passe oublié" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-700 px-4">
                
                <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
                    
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
                        Mot de passe oublié ?
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                        Entrez votre adresse email et nous vous enverrons un lien
                        pour réinitialiser votre mot de passe.
                    </p>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">

                        <div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Votre adresse email"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <PrimaryButton
                                className="w-full justify-center py-3 text-lg bg-indigo-600 hover:bg-indigo-700 transition duration-300 rounded-lg"
                                disabled={processing}
                            >
                                Envoyer le lien
                            </PrimaryButton>
                        </div>

                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}