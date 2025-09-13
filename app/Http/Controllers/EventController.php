<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class EventController extends Controller
{
    public function __construct()
    {
        if (!config('app.open_events')) {
            abort(404);
        }
    }

    public function index(): Response
    {
        return Inertia::render('events/index', [
            'events' => Event::query()->orderBy('start_date')->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('events/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'start_date'  => ['required', 'date'],
            'end_date'    => ['required', 'date'],
            'description' => ['required'],
            'published'   => ['boolean'],
            'media'       => ['nullable', 'mimes:jpg,jpeg,png,webp,gif', 'max:12288'],
        ]);

        $event = Event::create([
            'title'       => $validated['title'],
            'start_date'  => $validated['start_date'],
            'end_date'    => $validated['end_date'],
            'description' => $validated['description'] ?? null,
            'published'   => $validated['published'],
        ]);

        if ($request->hasFile('media')) {
            $event
                ->addMedia($request->file('media'))
                ->toMediaCollection('media');
        }

        return redirect()->route('events.index');
    }

    public function edit(Event $event): Response
    {
        $media = $event->getMedia('media')->map(function ($media) {
            return [
                'id'        => $media->id,
                'name'      => $media->name,
                'file_name' => $media->file_name,
                'url'       => $media->getUrl(),
            ];
        });

        return Inertia::render('events/edit', [
            'event' => [
                'id'          => $event->id,
                'title'       => $event->title,
                'start_date'  => $event->start_date->format('Y-m-d'),
                'end_date'    => $event->end_date->format('Y-m-d'),
                'description' => $event->description,
                'published'   => $event->published ? 1 : 0,
                'media'       => $media,
            ]
        ]);
    }

    public function update(Event $event, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'start_date'  => ['required', 'date'],
            'end_date'    => ['required', 'date'],
            'description' => ['required'],
            'published'   => ['boolean'],
            'media'       => ['nullable', 'mimes:jpg,jpeg,png,webp,gif', 'max:12288'],
        ]);

        $event->update([
            'title'       => $validated['title'],
            'start_date'  => $validated['start_date'],
            'end_date'    => $validated['end_date'],
            'description' => $validated['description'] ?? null,
            'published'   => $validated['published'],
        ]);

        if ($request->hasFile('media')) {
            $event->deleteMedia($event->media()->first()->id);

            $event
                ->addMedia($request->file('media'))
                ->toMediaCollection('media');
        }

        return back();
    }

    public function delete(Event $event): RedirectResponse
    {
        $event->delete();

        return back();
    }
}
