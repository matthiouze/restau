import FrontLayout from '@/layouts/front-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

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
    const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openImageModal = (image: MediaItem) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeImageModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <FrontLayout>
            <Head>
                <title>{item.name}</title>
                <meta name="description" content="Meta desc menu show" />
            </Head>
            <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div>
                        <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-neutral-900">
                            <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-800">
                                {item.preview_url ? (
                                    <img
                                        src={item.preview_url}
                                        alt={item.name}
                                        className="h-full w-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => item.preview_url && openImageModal({ id: 0, url: item.preview_url, name: item.name })}
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-neutral-400">Aperçu indisponible</div>
                                )}
                            </div>
                        </div>
                        {gallery && gallery.length > 0 && (
                            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                                {gallery.map((g) => (
                                    <div
                                        key={g.id}
                                        className="overflow-hidden rounded-md border border-sidebar-border/70 dark:border-sidebar-border cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => openImageModal(g)}
                                    >
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

            {/* Modal pour afficher l'image en plus grand */}
            {isModalOpen && selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={closeImageModal}
                >
                    <div className="relative max-h-full max-w-full">
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.name}
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
                        />
                        <button
                            onClick={closeImageModal}
                            className="absolute -top-4 -right-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </FrontLayout>
    );
}


