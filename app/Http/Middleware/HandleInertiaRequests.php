<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use App\Models\Timetable;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'timetables' => fn () => Timetable::query()
                ->orderBy('id')
                ->get()
                ->map(fn (Timetable $tt) => [
                    'id' => $tt->id,
                    'day' => $tt->day,
                    'start_am' => $tt->start_am,
                    'end_am' => $tt->end_am,
                    'start_pm' => $tt->start_pm,
                    'end_pm' => $tt->end_pm,
                ]),
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'is_closed'       => config('app.is_closed'),
            'is_pmr'          => config('app.is_pmr'),
            'is_closed_until' => config('app.is_closed') ? config('app.is_closed_until') : null,
        ];
    }
}
