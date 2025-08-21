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
                        <Link href={route('menu-item.index')} className="text-sm text-primary underline-offset-4 hover:underline">
                            Retour à la liste
                        </Link>
                    </div>

                    <Form method="put" action={route('menu-item.update', menuItem.id)} className="space-y-6" options={{ preserveScroll: true }}>
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
                                    <Input id="price" name="price" type="number" step="0.01" min="0" required defaultValue={menuItem.price} />
                                    <InputError className="mt-2" message={errors.price} />
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button disabled={processing}>Mettre à jour</Button>
                                    <Button asChild variant="outline">
                                        <Link href={route('menu-item.index')}>Annuler</Link>
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

