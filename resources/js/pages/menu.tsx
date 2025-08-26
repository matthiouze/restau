import FrontLayout from '@/layouts/front-layout';
import { Head, Link } from '@inertiajs/react';

type MenuListItem = {
    id: number;
    name: string;
    slug: string;
    ingredients: string | null;
    price: number | string;
    preview_url: string | null;
};

interface PageProps {
    items: MenuListItem[];
}

export default function MenuIndex({ items }: PageProps) {
    const currency = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

    return (
        <FrontLayout>
            <Head title="Menu" />
            <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold tracking-tight">Notre menu</h1>
                <p className="mt-2 text-muted-foreground">Découvrez nos plats et spécialités.</p>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items && items.length > 0 ? (
                        items.map((item) => (
                            <Link
                                key={item.id}
                                href={route('menu.show', { slug: item.slug })}
                                className="group block overflow-hidden rounded-xl border border-sidebar-border/70 bg-white shadow-sm transition hover:shadow-md dark:border-sidebar-border dark:bg-neutral-900"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                    {item.preview_url ? (
                                        <img
                                            src={item.preview_url}
                                            alt={item.name}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-neutral-400">Aperçu indisponible</div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-base font-medium leading-tight">{item.name}</h3>
                                        <span className="shrink-0 text-sm font-semibold">
                                            {typeof item.price === 'number'
                                                ? currency.format(item.price)
                                                : (() => {
                                                    const n = Number(item.price);
                                                    return Number.isFinite(n) ? currency.format(n) : item.price;
                                                })()}
                                        </span>
                                    </div>
                                    {item.ingredients && (
                                        <p className="line-clamp-2 text-sm text-muted-foreground">{item.ingredients}</p>
                                    )}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full rounded-md border border-dashed p-8 text-center text-muted-foreground">
                            Aucun plat n'est disponible pour le moment.
                        </div>
                    )}
                </div>
            </section>
        </FrontLayout>
    );
}
