import FrontLayout from '@/layouts/front-layout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock } from 'lucide-react';

type Event = {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    published: boolean;
    media?: {
        original_url: string;
        name: string;
    }[];
};

interface PageProps {
    events: Event[];
}

export default function Event({ events }: PageProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <FrontLayout>
            <Head title="Événements">
                <meta name="description" content="Liste des événements" />
            </Head>

            <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Nos événements
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Retrouvez nos événements à venir.
                </p>

                {events && events.length > 0 ? (
                    <ul className="mt-6 w-full divide-y divide-gray-200 dark:divide-gray-700">
                        {events.map((event) => (
                            <li key={event.id} className="pb-3 sm:pb-4">
                                <Link
                                    href={route('events.show', event.id)}
                                    className="flex items-center space-x-4 rtl:space-x-reverse p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                                >
                                    {event.media && event.media.length > 0 ? (
                                        <img
                                            className="w-12 h-12 rounded-full object-cover"
                                            src={event.media[0].original_url}
                                            alt={event.media[0].name || event.title}
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-white" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {event.title}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {event.description}
                                        </p>
                                        <div className="flex items-center mt-1 text-xs text-gray-400">
                                            <Clock className="w-3 h-3 mr-1" />
                                            <span>
                                                Du {formatDate(event.start_date)} au {formatDate(event.end_date)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
                        <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Aucun événement pour le moment.</p>
                    </div>
                )}
            </section>
        </FrontLayout>
    );
}
