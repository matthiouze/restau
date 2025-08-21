import { Head, Link, useForm } from '@inertiajs/react';
import { useMemo } from 'react';

export default function Index() {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        tel: '',
        reason: 'contact' as 'contact' | 'booking',
        nb_people: '' as number | string,
        message: '',
    });

    const isBooking = useMemo(() => data.reason === 'booking', [data.reason]);

    function scrollToContact(e?: React.MouseEvent) {
        if (e) e.preventDefault();
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

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
        <>
            <Head title="Accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <header className="sticky top-0 z-40 w-full border-b border-neutral-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800/70 dark:bg-neutral-900/60">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
                    {/* Logo left */}
                    <Link href={route('home')} className="flex items-center gap-2">
                        <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
                        <span className="hidden text-sm font-semibold tracking-wide md:inline text-neutral-800 dark:text-neutral-100">Restau</span>
                    </Link>

                    {/* Centered menu */}
                    <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block">
                        <ul className="flex items-center gap-6 text-sm font-medium">
                            <li>
                                <Link href={route('home')} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">Accueil</Link>
                            </li>
                            <li>
                                <Link href={route('menu')} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">Menu</Link>
                            </li>
                            <li>
                                <a href="#contact" onClick={scrollToContact} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">Contact</a>
                            </li>
                        </ul>
                    </nav>

                    {/* CTA right */}
                    <div className="ml-auto">
                        <a
                            href="#contact"
                            onClick={scrollToContact}
                            className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                        >
                            Contact
                        </a>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className="block border-t border-neutral-200/70 md:hidden dark:border-neutral-800/70">
                    <div className="mx-auto max-w-6xl px-4 py-2 md:px-6">
                        <ul className="flex items-center justify-center gap-6 text-sm font-medium">
                            <li>
                                <Link href={route('home')} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">Accueil</Link>
                            </li>
                            <li>
                                <Link href={route('menu')} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">Menu</Link>
                            </li>
                            <li>
                                <a href="#contact" onClick={scrollToContact} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            {/* Hero with parallax */}
            <section
                className="relative flex h-[60vh] items-center justify-center bg-neutral-200 text-center text-white md:h-[70vh]"
                style={{
                    backgroundImage: "url('/img/banner.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 mx-auto max-w-3xl px-6">
                    <h1 className="text-3xl font-bold leading-tight md:text-5xl">Bienvenue chez Restau</h1>
                    <p className="mt-4 text-base text-neutral-100 md:text-lg">
                        Cuisine de saison, produits frais et ambiance conviviale.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <Link
                            href={route('menu')}
                            className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-neutral-900 backdrop-blur hover:bg-white"
                        >
                            Découvrir le menu
                        </Link>
                        <a
                            href="#contact"
                            onClick={scrollToContact}
                            className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700"
                        >
                            Nous contacter
                        </a>
                    </div>
                </div>
            </section>

            {/* Centered placeholder content */}
            <main className="mx-auto max-w-6xl px-4 py-16 md:px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Une expérience gourmande</h2>
                    <p className="mt-4 text-neutral-600 dark:text-neutral-300">
                        Découvrez une carte créative, élaborée avec des ingrédients locaux sélectionnés avec soin. Que ce soit pour
                        un déjeuner entre amis, un dîner romantique ou une réservation de groupe, notre équipe vous accueille avec
                        le sourire.
                    </p>
                </div>

                {/* Simple grid of placeholders */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="rounded-xl border border-neutral-200 p-6 shadow-sm dark:border-neutral-800">
                            <div className="h-28 w-full rounded-lg bg-gradient-to-br from-green-200 to-emerald-300 dark:from-neutral-800 dark:to-neutral-700" />
                            <div className="mt-4 h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
                            <div className="mt-2 h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
                        </div>
                    ))}
                </div>
            </main>

            {/* Contact form in footer */}
            <footer id="contact" className="border-t border-neutral-200 bg-neutral-50 py-14 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="mx-auto max-w-3xl">
                        <h3 className="text-center text-xl font-semibold text-neutral-900 dark:text-neutral-100">Contact</h3>
                        <p className="mt-2 text-center text-neutral-600 dark:text-neutral-300">
                            Une question, une réservation ? Écrivez-nous.
                        </p>

                        {/* Microdata: ContactPage > ContactPoint */}
                        <section itemScope itemType="https://schema.org/ContactPage" className="mt-8">
                            <meta itemProp="name" content="Page de contact" />
                            <form
                                onSubmit={submit}
                                itemProp="mainEntity"
                                itemScope
                                itemType="https://schema.org/ContactPoint"
                                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                            >
                                <meta itemProp="areaServed" content="FR" />
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
            </footer>
        </>
    );
}
