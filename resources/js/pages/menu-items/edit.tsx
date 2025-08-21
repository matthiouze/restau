import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

type MenuItem = {
    id: number;
    name: string;
    slug: string;
    ingredients: string;
    price: number | string;
    media?: Array<{ id: number; name: string; file_name: string }>;
};

export default function Edit({ menuItem }: { menuItem: MenuItem }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Menu', href: '/menu-items' },
        { title: menuItem?.name ?? 'Modifier', href: `/menu-items/${menuItem.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Modifier - ${menuItem.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-lg font-semibold">Modifier l'item</h1>
                        <Link href={route('menu-items.index')}
                              className="text-sm text-primary underline-offset-4 hover:underline">
                            Retour à la liste
                        </Link>
                    </div>

                    <Form method="put"
                          action={route('menu-items.update', menuItem.id)}
                          className="space-y-6"
                          options={{ preserveScroll: true }}
                          encType="multipart/form-data">
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nom</Label>
                                    <Input id="name" name="name" required defaultValue={menuItem.name} />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" name="slug" required defaultValue={menuItem.slug} />
                                    <InputError className="mt-2" message={errors.slug} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="ingredients">Ingrédients</Label>
                                    <textarea
                                        id="ingredients"
                                        name="ingredients"
                                        defaultValue={menuItem.ingredients}
                                        className="border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                                    />
                                    <InputError className="mt-2" message={errors.ingredients} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="price">Prix</Label>
                                    <Input id="price"
                                           name="price"
                                           type="number"
                                           step="0.01"
                                           min="0"
                                           required
                                           defaultValue={menuItem.price} />
                                    <InputError className="mt-2" message={errors.price} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Médias existants</Label>
                                    <div className="flex flex-wrap gap-3">
                                        {(menuItem.media ?? []).map((m) => (
                                            <label key={m.id} className="flex items-center gap-2">
                                                <img src={m.name}
                                                     alt={m.file_name}
                                                     className="w-16 rounded object-cover border" />
                                                <input type="checkbox" name="remove_media_ids[]" value={m.id} />
                                                <span className="text-xs">Supprimer</span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError className="mt-2" message={errors.remove_media_ids} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="media">Ajouter des médias</Label>
                                    <Input id="media" name="media[]" type="file" multiple accept="image/*" />
                                    <InputError className="mt-2" message={errors.media} />
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button disabled={processing}>Mettre à jour</Button>
                                    <Button asChild variant="outline">
                                        <Link href={route('menu-items.index')}>Annuler</Link>
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

