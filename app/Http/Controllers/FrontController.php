<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;

class FrontController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('index');
    }

    public function events(): Response
    {
        if (!config('app.open_events')) {
            abort(404);
        }

        return Inertia::render('events', [
            'events' => Event::query()->with('media')->published()->orderBy('start_date', 'desc')->get()
        ]);
    }

    public function showEvent(Event $event): Response
    {
        if (!config('app.open_events')) {
            abort(404);
        }

        $media = $event->getMedia('media')->map(function ($media) {
            return [
                'url' => $media->getUrl(),
            ];
        });

        return Inertia::render('events/show', [
            'event' => [
                'id'          => $event->id,
                'title'       => $event->title,
                'start_date'  => $event->start_date->format('Y-m-d'),
                'end_date'    => $event->end_date->format('Y-m-d'),
                'description' => $event->description,
                'media'       => $media[0]['url'],
            ]
        ]);
    }
}
