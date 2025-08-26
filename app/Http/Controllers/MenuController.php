<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        $items = MenuItem::query()
            ->orderBy('name')
            ->get()
            ->map(function (MenuItem $item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'slug' => $item->slug,
                    'ingredients' => $item->ingredients,
                    'price' => $item->price,
                    'preview_url' => $item->getFirstMediaUrl('media') ?: null,
                ];
            });

        return Inertia::render('menu', [
            'items'           => $items,
            'is_closed'       => config('app.is_closed'),
            'is_closed_until' => config('app.is_closed') ? config('app.is_closed_until') : null,
        ]);
    }

    public function show(string $slug): Response
    {
        $item = MenuItem::query()->where('slug', $slug)->firstOrFail();

        $gallery = $item->getMedia('media')->map(function ($media) {
            return [
                'id' => $media->id,
                'url' => $media->getUrl(),
                'name' => $media->name,
            ];
        });

        return Inertia::render('menu/show', [
            'item' => [
                'id' => $item->id,
                'name' => $item->name,
                'slug' => $item->slug,
                'ingredients' => $item->ingredients,
                'price' => $item->price,
                'preview_url' => $item->getFirstMediaUrl('media') ?: null,
            ],
            'gallery' => $gallery,
            'is_closed'       => config('app.is_closed'),
            'is_closed_until' => config('app.is_closed') ? config('app.is_closed_until') : null,
        ]);
    }
}
