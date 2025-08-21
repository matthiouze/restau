import FrontLayout from '@/layouts/front-layout';
import { Head } from '@inertiajs/react';

type MediaItem = {
    id: number;
    url: string;
    name: string;
};

type Item = {
    id: number;
    name: string;
    slug: string;
    ingredients: string | null;
    price: number | string;
    preview_url: string | null;
};

interface PageProps {
    item: Item;
    gallery: MediaItem[];
}

export default function MenuShow({ item, gallery }: PageProps) {
    const currency = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

    return (
        <FrontLayout>
            <Head title={item.name} />
            <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div>
                        <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-neutral-900">
                            <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-800">
                                {item.preview_url ? (
                                    <img src={item.preview_url} alt={item.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-neutral-400">Aperçu indisponible</div>
                                )}
                            </div>
                        </div>
                        {gallery && gallery.length > 0 && (
                            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                                {gallery.map((g) => (
                                    <div key={g.id} className="overflow-hidden rounded-md border border-sidebar-border/70 dark:border-sidebar-border">
                                        <img src={g.url} alt={g.name} className="h-20 w-full object-cover" loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight">{item.name}</h1>
                            <p className="mt-2 text-lg font-semibold">{typeof item.price === 'number' ? currency.format(item.price) : item.price}</p>
                        </div>
                        {item.ingredients && (
                            <div>
                                <h2 className="text-sm font-medium text-muted-foreground">Ingrédients</h2>
                                <p className="mt-1 leading-relaxed">{item.ingredients}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}


