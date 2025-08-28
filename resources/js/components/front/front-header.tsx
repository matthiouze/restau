import { Link } from '@inertiajs/react';
import { useCallback } from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export default function FrontHeader() {
    const { props } = usePage<SharedData & {
        is_closed?: boolean;
        is_pmr?: boolean;
        is_closed_until?: string;
        open_events?: boolean;
    }>();
    const isClosed = Boolean(props.is_closed);
    const openEvents = Boolean(props.open_events);
    const closedUntil = (props.is_closed_until as string | null) ?? null;
    const scrollToContact = useCallback((e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const NavLinks = (
        <ul className="flex flex-col gap-4 text-base font-medium md:flex-row md:items-center md:gap-6 md:text-sm">
            <li>
                <Link href={route('home')} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">Accueil</Link>
            </li>
            <li>
                <Link href={route('menu')} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">Menu</Link>
            </li>
            {openEvents ? (
                <li>
                    <Link href={route('events')} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">Evènements</Link>
                </li>
            ) : ''}
        </ul>
    );

    return (
        <>
            {isClosed && (
                <div className="w-full border-b border-amber-200 bg-amber-50 py-2 text-center text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950 dark:text-amber-200">
                    Le restaurant est actuellement fermé{closedUntil ? ` jusqu'au ${closedUntil}` : ''}.
                </div>
            )}

            <header className="sticky top-0 z-40 w-full border-b border-neutral-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800/70 dark:bg-neutral-900/60">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
                <Link href={route('home')} className="flex items-center gap-2">
                    <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
                    <span className="hidden text-sm font-semibold tracking-wide md:inline text-neutral-800 dark:text-neutral-100">Restau</span>
                </Link>

                <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block">
                    {NavLinks}
                </nav>

                <div className="ml-auto hidden md:block">
                    <a
                        href="#contact"
                        onClick={scrollToContact}
                        className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                    >
                        Contact
                    </a>
                </div>

                <div className="ml-auto md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button aria-label="Ouvrir le menu" className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white p-2 text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800">
                                <MenuIcon className="h-5 w-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-white dark:bg-neutral-900">
                            <div className="px-2 py-6">
                                <div className="mb-6 flex items-center gap-2 px-2">
                                    <img src="/logo.svg" alt="Logo" className="h-7 w-auto" />
                                    <span className="text-sm font-semibold tracking-wide text-neutral-800 dark:text-neutral-100">Restau</span>
                                </div>
                                <nav>
                                    <ul className="flex flex-col gap-4 text-base font-medium">
                                        <li>
                                            <SheetClose asChild>
                                                <Link href={route('home')} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">
                                                    Accueil
                                                </Link>
                                            </SheetClose>
                                        </li>
                                        <li>
                                            <SheetClose asChild>
                                                <Link href={route('menu')} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">
                                                    Menu
                                                </Link>
                                            </SheetClose>
                                        </li>
                                        <li>
                                            <SheetClose asChild>
                                                <Link href={route('events')} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">
                                                    Evènements
                                                </Link>
                                            </SheetClose>
                                        </li>
                                        <li>
                                            <SheetClose asChild>
                                                <a href="#contact" onClick={scrollToContact} className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">Contact</a>
                                            </SheetClose>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            </header>
        </>
    );
}


