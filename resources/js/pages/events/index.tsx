import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evènements',
        href: '/events',
    },
];

type Event = {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    published: boolean;
};

interface PageProps {
    events: Event[];
}

export default function Index({ events }: PageProps) {

    function handleDelete(item: Event) {
        if (!item.id) return;
        const ok = window.confirm(`Supprimer "${item.title}" ? Cette action est irréversible.`);
        if (!ok) return;

        router.delete(route('events.delete'), {
            data: { id: item.id },
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex items-center justify-end">
                    <Link className='text-white bg-green-500 hover:bg-green-600 p-2 rounded-md'
                          href={route('events.create')}>
                        Ajouter
                    </Link>
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="border-b border-sidebar-border/70 dark:border-sidebar-border bg-neutral-50 dark:bg-neutral-900/20">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Titre</th>
                                <th className="px-4 py-3 text-left font-medium">Date de début</th>
                                <th className="px-4 py-3 text-left font-medium">Date de fin</th>
                                <th className="px-4 py-3 text-left font-medium">Description</th>
                                <th className="px-4 py-3 text-left font-medium">Publié</th>
                                <th className="px-4 py-3 text-left font-medium"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {events && events.length > 0 ? (
                                events.map((item) => (
                                    <tr key={item.id} className="border-b last:border-0 border-sidebar-border/70 dark:border-sidebar-border">
                                        <td className="px-4 py-3 align-top">{item.title}</td>
                                        <td className="px-4 py-3 align-top text-muted-foreground">{item.start_date}</td>
                                        <td className="px-4 py-3 align-top text-muted-foreground">{item.end_date}</td>
                                        <td className="px-4 py-3 align-top">{item.description}</td>
                                        <td className="px-4 py-3 align-top">{item.published ? 'Oui' : 'Non'}</td>
                                        <td className="px-4 py-3 align-top space-x-2">
                                            <Link className='text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-md'
                                                  href={route('events.edit', item.id)}>
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
                                        Aucun évènement pour le moment.
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
