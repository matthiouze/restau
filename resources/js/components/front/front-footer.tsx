import { useForm, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import type { SharedData, Timetable } from '@/types';

export default function FrontFooter() {
    const { props } = usePage<{ ziggy: unknown } & SharedData>();
    const timetables = (props.timetables as Timetable[] | undefined) ?? [];
    const isPmr = Boolean(props.is_pmr);
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        tel: '',
        reason: 'contact' as 'contact' | 'booking',
        nb_people: '' as number | string,
        message: '',
    });

    const [success, setSuccess] = useState<string | null>(null);

    const isBooking = useMemo(() => data.reason === 'booking', [data.reason]);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        setSuccess(null);
        post(route('contacts.store'), {
            onSuccess: () => {
                reset();
                setSuccess('Votre message a été envoyé. Nous vous répondrons rapidement.');
            },
            preserveScroll: true,
        });
    }

    return (
        <footer id="contact" className="border-t border-neutral-200 bg-neutral-50 dark:bg-neutral-950">
            <div className="bg-green-50 dark:bg-green-950/20 py-6">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Contact</h3>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                            Une question, une réservation ? Écrivez-nous.
                        </p>
                    </div>

                    <section itemScope itemType="https://schema.org/ContactPage" className="max-w-2xl mx-auto bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <meta itemProp="name" content="Page de contact" />
                        <meta itemProp="description"
                              content="Formulaire de contact et réservation pour le Restaurant Le Gourmet" />

                        {success && (
                            <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900/50 dark:bg-green-950 dark:text-green-200">
                                {success}
                            </div>
                        )}

                        <form
                            onSubmit={submit}
                            itemProp="mainEntity"
                            itemScope
                            itemType="https://schema.org/ContactPoint"
                            className="space-y-6"
                        >
                            <meta itemProp="areaServed" content="FR" />
                            <meta itemProp="contactType" content="customer service" />

                            {/* Première ligne : Nom, Email, Téléphone */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">Nom</label>
                                    <input
                                        itemProp="name"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        type="text"
                                        name="name"
                                        className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                        placeholder="Votre nom"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">Email</label>
                                    <input
                                        itemProp="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        type="email"
                                        name="email"
                                        className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                        placeholder="nom@domaine.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">Téléphone</label>
                                    <input
                                        itemProp="telephone"
                                        value={data.tel}
                                        onChange={(e) => setData('tel', e.target.value)}
                                        type="tel"
                                        name="tel"
                                        className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                        placeholder="06 00 00 00 00"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">Raison</label>
                                    <select
                                        itemProp="contactType"
                                        value={data.reason}
                                        onChange={(e) => setData('reason', e.target.value as 'contact' | 'booking')}
                                        name="reason"
                                        className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                    >
                                        <option value="contact">Contact</option>
                                        <option value="booking">Réservation</option>
                                    </select>
                                </div>
                                {isBooking && (
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">Nombre de personnes</label>
                                        <input
                                            itemProp="partySize"
                                            value={data.nb_people}
                                            onChange={(e) => setData('nb_people', e.target.value)}
                                            type="number"
                                            min={1}
                                            name="nb_people"
                                            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                            placeholder="Ex: 4"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">Message</label>
                                <textarea
                                    itemProp="description"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    name="message"
                                    rows={4}
                                    className="w-full resize-y rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                    placeholder={isBooking ? 'Votre demande de réservation...' : 'Votre message...'}
                                />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60 dark:focus:ring-offset-neutral-900"
                                >
                                    Envoyer
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800"></div>

            <div className="bg-neutral-100 dark:bg-neutral-900 py-6">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div itemScope itemType="https://schema.org/Restaurant">
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Notre adresse</h3>
                            <meta itemProp="name" content="Restaurant Le Gourmet" />
                            <meta itemProp="servesCuisine" content="Française" />
                            <meta itemProp="priceRange" content="€€" />
                            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                <p className="font-medium text-neutral-800 dark:text-neutral-200">Restaurant Le Gourmet</p>
                                <p itemProp="streetAddress" className="text-neutral-600 dark:text-neutral-400">123 Rue de la Gastronomie</p>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    <span itemProp="postalCode">75001</span> <span itemProp="addressLocality">Paris</span>, <span itemProp="addressCountry">France</span>
                                </p>
                            </div>
                            {isPmr && (
                                <p className="font-medium text-neutral-800 dark:text-neutral-200">
                                    Etablissement accessible aux personnes à mobilité réduite
                                </p>
                            )}
                        </div>

                        <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Contact</h3>
                            <div className="space-y-3">
                                <p>
                                    <span className="font-medium text-neutral-800 dark:text-neutral-200">Téléphone:</span><br />
                                    <a href="tel:+33123456789" itemProp="telephone">
                                        +33 1 23 45 67 89
                                    </a>
                                </p>
                                <p>
                                    <span className="font-medium text-neutral-800 dark:text-neutral-200">Email:</span><br />
                                    <a href="mailto:contact@legourmet.fr" itemProp="email">
                                        contact@legourmet.fr
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Horaires</h3>
                            <ul className="space-y-2">
                                {timetables.map((tt) => {
                                    const hasAm = Boolean(tt.start_am || tt.end_am);
                                    const hasPm = Boolean(tt.start_pm || tt.end_pm);
                                    const hasAnyHours = hasAm || hasPm;

                                    const dayLabel: Record<string, string> = {
                                        monday: 'Lundi',
                                        tuesday: 'Mardi',
                                        wednesday: 'Mercredi',
                                        thursday: 'Jeudi',
                                        friday: 'Vendredi',
                                        saturday: 'Samedi',
                                        sunday: 'Dimanche',
                                    };

                                    return (
                                        <li key={tt.id}
                                            itemProp="openingHoursSpecification"
                                            itemScope
                                            itemType="https://schema.org/OpeningHoursSpecification"
                                            className="flex justify-between items-center text-sm">
                                            <meta itemProp="dayOfWeek" content={tt.day} />
                                            <span className="font-medium text-neutral-800 dark:text-neutral-200">{dayLabel[tt.day] ?? tt.day}</span>
                                            <span className="text-neutral-600 dark:text-neutral-400">
                                                {hasAnyHours ? (
                                                    <>
                                                        {hasAm && (
                                                            <>
                                                                {tt.start_am && (
                                                                    <time itemProp="opens" dateTime={tt.start_am as string}>
                                                                        {tt.start_am}
                                                                    </time>
                                                                )}
                                                                {tt.start_am && tt.end_am && <span>{' - '}</span>}
                                                                {tt.end_am && (
                                                                    <time itemProp="closes" dateTime={tt.end_am as string}>
                                                                        {tt.end_am}
                                                                    </time>
                                                                )}
                                                            </>
                                                        )}
                                                        {hasAm && hasPm && <span className="mx-1">/</span>}
                                                        {hasPm && (
                                                            <>
                                                                {tt.start_pm && (
                                                                    <time itemProp="opens" dateTime={tt.start_pm as string}>
                                                                        {tt.start_pm}
                                                                    </time>
                                                                )}
                                                                {tt.start_pm && tt.end_pm && <span>{' - '}</span>}
                                                                {tt.end_pm && (
                                                                    <time itemProp="closes" dateTime={tt.end_pm as string}>
                                                                        {tt.end_pm}
                                                                    </time>
                                                                )}
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-neutral-500 dark:text-neutral-400">
                                                        Fermé
                                                    </span>
                                                )}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}


