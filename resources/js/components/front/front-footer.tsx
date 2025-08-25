import { useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import type { SharedData, Timetable } from '@/types';

export default function FrontFooter() {
    const { props } = usePage<{ ziggy: unknown } & SharedData>();
    const timetables = (props.timetables as Timetable[] | undefined) ?? [];
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        tel: '',
        reason: 'contact' as 'contact' | 'booking',
        nb_people: '' as number | string,
        message: '',
    });

    const isBooking = useMemo(() => data.reason === 'booking', [data.reason]);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('contacts.store'), {
            onSuccess: () => {
                reset();
            },
            preserveScroll: true,
        });
    }

    return (
        <footer id="contact" className="border-t border-neutral-200 bg-neutral-50 py-14 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div itemScope itemType="https://schema.org/Restaurant">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Notre adresse</h3>
                        <meta itemProp="name" content="Restaurant Le Gourmet" />
                        <meta itemProp="servesCuisine" content="Française" />
                        <meta itemProp="priceRange" content="€€" />
                        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                            <p className="font-medium">Restaurant Le Gourmet</p>
                            <p itemProp="streetAddress">123 Rue de la Gastronomie</p>
                            <p><span itemProp="postalCode">75001</span> <span itemProp="addressLocality">Paris</span>, <span itemProp="addressCountry">France</span></p>
                        </div>
                        <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                            <p className="pt-2">
                                <span className="font-medium">Téléphone:</span> <a href="tel:+33123456789" itemProp="telephone">+33 1 23 45 67 89</a>
                            </p>
                            <p>
                                <span className="font-medium">Email:</span> <a href="mailto:contact@legourmet.fr" itemProp="email">contact@legourmet.fr</a>
                            </p>
                        </div>
                        {(() => {
                            const visible = timetables.filter((tt) =>
                                Boolean(tt.start_am || tt.end_am || tt.start_pm || tt.end_pm)
                            );
                            return visible.length > 0 ? (
                            <div className="pt-2">
                                <span className="font-medium">Horaires:</span>
                                <ul className="mt-2 space-y-1">
                                    {visible.map((tt) => {
                                        const hasAm = Boolean(tt.start_am || tt.end_am);
                                        const hasPm = Boolean(tt.start_pm || tt.end_pm);
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
                                                itemType="https://schema.org/OpeningHoursSpecification">
                                                <meta itemProp="dayOfWeek" content={tt.day} />
                                                <span className="inline-block w-28">{dayLabel[tt.day] ?? tt.day}</span>
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
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            ) : null;
                        })()}
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Contact</h3>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                            Une question, une réservation ? Écrivez-nous.
                        </p>

                        <section itemScope itemType="https://schema.org/ContactPage" className="mt-6">
                            <meta itemProp="name" content="Page de contact" />
                            <meta itemProp="description" content="Formulaire de contact et réservation pour le Restaurant Le Gourmet" />
                            <form
                                onSubmit={submit}
                                itemProp="mainEntity"
                                itemScope
                                itemType="https://schema.org/ContactPoint"
                                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                            >
                                <meta itemProp="areaServed" content="FR" />
                                <meta itemProp="contactType" content="customer service" />
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="col-span-1 sm:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Nom</label>
                                        <input
                                            itemProp="name"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            type="text"
                                            name="name"
                                            className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                            placeholder="Votre nom"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Email</label>
                                        <input
                                            itemProp="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            type="email"
                                            name="email"
                                            className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                            placeholder="nom@domaine.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Téléphone</label>
                                        <input
                                            itemProp="telephone"
                                            value={data.tel}
                                            onChange={(e) => setData('tel', e.target.value)}
                                            type="tel"
                                            name="tel"
                                            className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                            placeholder="06 00 00 00 00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Raison</label>
                                        <select
                                            itemProp="contactType"
                                            value={data.reason}
                                            onChange={(e) => setData('reason', e.target.value as 'contact' | 'booking')}
                                            name="reason"
                                            className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                        >
                                            <option value="contact">Contact</option>
                                            <option value="booking">Réservation</option>
                                        </select>
                                    </div>

                                    {isBooking && (
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Nombre de personnes</label>
                                            <input
                                                itemProp="partySize"
                                                value={data.nb_people}
                                                onChange={(e) => setData('nb_people', e.target.value)}
                                                type="number"
                                                min={1}
                                                name="nb_people"
                                                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                                placeholder="Ex: 4"
                                            />
                                        </div>
                                    )}

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Message</label>
                                        <textarea
                                            itemProp="description"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            name="message"
                                            rows={4}
                                            className="mt-1 w-full resize-y rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                            placeholder={isBooking ? 'Votre demande de réservation...' : 'Votre message...'}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60 dark:focus:ring-offset-neutral-900"
                                    >
                                        Envoyer
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </footer>
    );
}


