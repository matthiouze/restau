import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Menu',
        href: '/menu-items',
    },
];

type MenuItem = {
    id?: number;
    name: string;
    slug: string;
    description: string;
    price: number | string;
};

interface PageProps {
    menus_items: MenuItem[];
}

export default function Index({ menus_items }: PageProps) {
    const currency = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

    function handleDelete(item: MenuItem) {
        if (!item.id) return;
        const ok = window.confirm(`Supprimer "${item.name}" ? Cette action est irréversible.`);
        if (!ok) return;

        router.delete(route('menu-item.delete'), {
            data: { id: item.id },
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex items-center justify-end">
                    <Link className='text-white bg-green-500 hover:bg-green-600 p-2 rounded-md' href={route('menu-item.create')}>Ajouter</Link>
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="border-b border-sidebar-border/70 dark:border-sidebar-border bg-neutral-50 dark:bg-neutral-900/20">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">Nom</th>
                                    <th className="px-4 py-3 text-left font-medium">Slug</th>
                                    <th className="px-4 py-3 text-left font-medium">Description</th>
                                    <th className="px-4 py-3 text-left font-medium">Prix</th>
                                    <th className="px-4 py-3 text-left font-medium"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {menus_items && menus_items.length > 0 ? (
                                    menus_items.map((item) => (
                                        <tr key={item.slug} className="border-b last:border-0 border-sidebar-border/70 dark:border-sidebar-border">
                                            <td className="px-4 py-3 align-top">{item.name}</td>
                                            <td className="px-4 py-3 align-top text-muted-foreground">{item.slug}</td>
                                            <td className="px-4 py-3 align-top">{item.ingredients}</td>
                                            <td className="px-4 py-3 align-top whitespace-nowrap">
                                                {typeof item.price === 'number'
                                                    ? currency.format(item.price)
                                                    : (() => {
                                                        const n = Number(item.price);
                                                        return Number.isFinite(n) ? currency.format(n) : item.price;
                                                    })()}
                                            </td>
                                            <td className="px-4 py-3 align-top space-x-2">
                                                <Link className='text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-md' href={route('menu-item.edit', item.id)}>
                                                    Modifier
                                                </Link>
                                                <Link
                                                    className='text-white bg-red-500 hover:bg-red-600 p-2 rounded-md'
                                                    href="#"
                                                    onClick={(e) => { e.preventDefault(); handleDelete(item); }}
                                                >
                                                    Supprimer
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                                            Aucun item de menu pour le moment.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
