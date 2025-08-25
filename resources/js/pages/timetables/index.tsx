import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, useForm } from '@inertiajs/react'

type Timetable = {
    id: number
    day: string
    start_am?: string | null
    end_am?: string | null
    start_pm?: string | null
    end_pm?: string | null
}

interface PageProps {
    timetables: Timetable[]
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Horaires', href: '/timetables' },
]

const dayLabel: Record<string, string> = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche',
}

export default function Index({ timetables }: PageProps) {
    const { data, setData, put, processing } = useForm<{ rows: Timetable[] }>({ rows: timetables })

    function handleChange(id: number, field: keyof Timetable, value: string) {
        setData('rows', data.rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Horaires" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <form onSubmit={(e) => { e.preventDefault(); put(route('timetables.bulk-update'), { preserveScroll: true, preserveState: true }); }}
                      className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="border-b border-sidebar-border/70 dark:border-sidebar-border bg-neutral-50 dark:bg-neutral-900/20">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">Jour</th>
                                    <th className="px-4 py-3 text-left font-medium">Début matin</th>
                                    <th className="px-4 py-3 text-left font-medium">Fin matin</th>
                                    <th className="px-4 py-3 text-left font-medium">Début après-midi</th>
                                    <th className="px-4 py-3 text-left font-medium">Fin après-midi</th>
                                    <th className="px-4 py-3 text-left font-medium"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.rows.map((r) => (
                                    <tr key={r.id} className="border-b last:border-0 border-sidebar-border/70 dark:border-sidebar-border">
                                        <td className="px-4 py-3 align-top">{dayLabel[r.day] ?? r.day}</td>
                                        <td className="px-4 py-3 align-top">
                                            <input type="time" value={r.start_am ?? ''} onChange={(e) => handleChange(r.id, 'start_am', e.target.value)} />
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <input type="time" value={r.end_am ?? ''} onChange={(e) => handleChange(r.id, 'end_am', e.target.value)} />
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <input type="time" value={r.start_pm ?? ''} onChange={(e) => handleChange(r.id, 'start_pm', e.target.value)} />
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <input type="time" value={r.end_pm ?? ''} onChange={(e) => handleChange(r.id, 'end_pm', e.target.value)} />
                                        </td>
                                        <td className="px-4 py-3 align-top whitespace-nowrap"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-end gap-2 border-t border-sidebar-border/70 dark:border-sidebar-border p-3">
                        <button type="submit" disabled={processing}
                                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}


