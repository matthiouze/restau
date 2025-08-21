import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link } from '@inertiajs/react'

type Contact = {
    id: number
    name: string
    email?: string | null
    tel?: string | null
    reason?: 'contact' | 'booking' | null
    nb_people?: number | null
    message?: string | null
    created_at?: string
}

export default function Show({ contact }: { contact: Contact }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contacts', href: '/contacts' },
        { title: contact?.name ?? 'Détails', href: `/contacts/${contact?.id}` },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Contact - ${contact.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-lg font-semibold">Détails du contact</h1>
                        <Link href={route('contacts.index')} className="text-sm text-primary underline-offset-4 hover:underline">
                            Retour à la liste
                        </Link>
                    </div>

                    <div className="grid gap-4">
                        <div>
                            <div className="text-xs text-muted-foreground">Nom</div>
                            <div className="text-sm">{contact.name}</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Email</div>
                            <div className="text-sm">{contact.email ?? '—'}</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Téléphone</div>
                            <div className="text-sm">{contact.tel ?? '—'}</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Raison</div>
                            <div className="text-sm">{contact.reason === 'booking' ? 'Réservation' : contact.reason === 'contact' ? 'Contact' : '—'}</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Nombre de personnes</div>
                            <div className="text-sm">{contact.nb_people ?? '—'}</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Message</div>
                            <div className="text-sm whitespace-pre-wrap">{contact.message ?? '—'}</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Créé le</div>
                            <div className="text-sm">{contact.created_at ? new Date(contact.created_at).toLocaleString('fr-FR') : '—'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
