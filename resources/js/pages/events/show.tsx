import FrontLayout from '@/layouts/front-layout';
import { Head } from '@inertiajs/react';

type Event = {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    media?: string;
};

interface PageProps {
    event: Event;
}

export default function MenuShow({ event }: PageProps) {

    return (
        <FrontLayout>
            <Head title={event.title}>
                <meta name="description" content="Meta desc event show" />
            </Head>
            <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div>
                        <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-neutral-900">
                            <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-800">
                                {event.media ? (
                                    <img
                                        src={event.media}
                                        alt={event.title}
                                        className="h-full w-full object-cover transition-opacity"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-neutral-400">
                                        Aperçu indisponible
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight">{event.title}</h1>
                            <p className="mt-2 text-lg font-semibold">{event.description}</p>
                        </div>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}


