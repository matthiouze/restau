import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, router } from '@inertiajs/react'

type Contact = {
    id: number
    name: string
    email?: string | null
    tel?: string | null
    reason?: 'contact' | 'booking' | null
    nb_people?: number | null
    message?: string | null
}

interface PageProps {
    contacts: Contact[]
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Contacts', href: '/contacts' },
]

export default function Index({ contacts }: PageProps) {
    function handleDelete(item: Contact) {
        if (!item.id) return
        const ok = window.confirm(`Supprimer le contact "${item.name}" ? Cette action est irréversible.`)
        if (!ok) return

        router.delete(route('contacts.delete'), {
            data: { id: item.id },
            preserveScroll: true,
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="border-b border-sidebar-border/70 dark:border-sidebar-border bg-neutral-50 dark:bg-neutral-900/20">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">Nom</th>
                                    <th className="px-4 py-3 text-left font-medium">Email</th>
                                    <th className="px-4 py-3 text-left font-medium">Téléphone</th>
                                    <th className="px-4 py-3 text-left font-medium">Raison</th>
                                    <th className="px-4 py-3 text-left font-medium">Personnes</th>
                                    <th className="px-4 py-3 text-left font-medium"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts && contacts.length > 0 ? (
                                    contacts.map((c) => (
                                        <tr key={c.id} className="border-b last:border-0 border-sidebar-border/70 dark:border-sidebar-border">
                                            <td className="px-4 py-3 align-top">{c.name}</td>
                                            <td className="px-4 py-3 align-top text-muted-foreground">{c.email ?? '—'}</td>
                                            <td className="px-4 py-3 align-top">{c.tel ?? '—'}</td>
                                            <td className="px-4 py-3 align-top">{c.reason === 'booking' ? 'Réservation' : c.reason === 'contact' ? 'Contact' : '—'}</td>
                                            <td className="px-4 py-3 align-top">{c.nb_people ?? '—'}</td>
                                            <td className="px-4 py-3 align-top space-x-2 whitespace-nowrap">
                                                <Link className='text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-md' href={route('contacts.show', c.id)}>
                                                    Détails
                                                </Link>
                                                <Link
                                                    className='text-white bg-red-500 hover:bg-red-600 p-2 rounded-md'
                                                    href="#"
                                                    onClick={(e) => { e.preventDefault(); handleDelete(c); }}
                                                >
                                                    Supprimer
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                                            Aucun contact pour le moment.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
