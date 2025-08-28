import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Evènements', href: '/events' },
    { title: 'Créer', href: '/events/create' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un évènements" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-lg font-semibold">Nouvel évènements</h1>
                        <Link href={route('events.index')}
                              className="text-sm text-primary underline-offset-4 hover:underline">
                            Retour à la liste
                        </Link>
                    </div>

                    <Form method="post"
                          action={route('events.store')}
                          className="space-y-6"
                          options={{ preserveScroll: true }}
                          encType="multipart/form-data">
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Titre</Label>
                                    <Input id="title"
                                           name="title"
                                           required
                                           placeholder="Titre"
                                           autoComplete="off" />
                                    <InputError className="mt-2" message={errors.title} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="start_date">Date de début</Label>
                                    <Input type="date"
                                           id="start_date"
                                           name="start_date"
                                           required />
                                    <InputError className="mt-2" message={errors.start_date} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="end_date">Date de fin</Label>
                                    <Input type='date'
                                           id="end_date"
                                           name="end_date"
                                           required />
                                    <InputError className="mt-2" message={errors.end_date} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Description"
                                        className="border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                                    />
                                    <InputError className="mt-2" message={errors.description} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="published">Publié</Label>
                                    <Checkbox id="published" name="published" value="1"/>
                                    <InputError className="mt-2" message={errors.description} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="media">Image</Label>
                                    <Input id="media" name="media" type="file" multiple accept="image/*" />
                                    <InputError className="mt-2" message={errors.media} />
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button disabled={processing}>Ajouter</Button>
                                    <Button asChild variant="outline">
                                        <Link href={route('events.index')}>Annuler</Link>
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}

