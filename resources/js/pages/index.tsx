import { Head, Link } from '@inertiajs/react';
import FrontLayout from '@/layouts/front-layout';

export default function Index() {

    function scrollToContact(e?: React.MouseEvent) {
        if (e) e.preventDefault();
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <FrontLayout>
            <Head title="Accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

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

            <main className="mx-auto max-w-6xl px-4 py-16 md:px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Une expérience gourmande</h2>
                    <p className="mt-4 text-neutral-600 dark:text-neutral-300">
                        Découvrez une carte créative, élaborée avec des ingrédients locaux sélectionnés avec soin. Que ce soit pour
                        un déjeuner entre amis, un dîner romantique ou une réservation de groupe, notre équipe vous accueille avec
                        le sourire.
                    </p>
                </div>

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
        </FrontLayout>
    );
}
