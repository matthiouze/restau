<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;

class MenuItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('menu-items/index', [
            'menus_items' => MenuItem::all()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('menu-items/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'alpha_dash', Rule::unique('menu_items', 'slug')],
            'ingredients' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'media' => ['nullable', 'array'],
            'media.*' => ['file', 'mimes:jpg,jpeg,png,webp,gif', 'max:12288'],
        ]);

        $menuItem = MenuItem::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'ingredients' => $validated['ingredients'] ?? null,
            'price' => $validated['price'],
        ]);

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $uploadedFile) {
                if ($uploadedFile) {
                    $menuItem
                        ->addMedia($uploadedFile)
                        ->toMediaCollection('media');
                }
            }
        }

        return redirect()->route('menu-items.index');
    }

    public function edit(MenuItem $menuItem): Response
    {
        return Inertia::render('menu-items/edit', [
            'menuItem' => $menuItem->load('media'),
        ]);
    }

    public function update(MenuItem $menuItem, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'slug' => [
                'required',
                'max:255',
                'alpha_dash',
                Rule::unique('menu_items', 'slug')->ignore($menuItem->id),
            ],
            'ingredients' => ['nullable'],
            'price' => ['required', 'numeric', 'min:0'],
            'media' => ['nullable', 'array'],
            'media.*' => ['file', 'mimes:jpg,jpeg,png,webp,gif', 'max:12288'],
            'remove_media_ids' => ['nullable', 'array'],
            'remove_media_ids.*' => ['integer'],
        ]);

        $menuItem->update([
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'ingredients' => $validated['ingredients'] ?? null,
            'price' => $validated['price'],
        ]);

        // Remove selected media if requested
        $idsToRemove = collect($request->input('remove_media_ids', []))
            ->filter(fn ($id) => is_numeric($id))
            ->map(fn ($id) => (int) $id)
            ->all();
        if (!empty($idsToRemove)) {
            $menuItem->media()->whereIn('id', $idsToRemove)->each(function ($media) {
                $media->delete();
            });
        }

        // Attach new uploads
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $uploadedFile) {
                if ($uploadedFile) {
                    $menuItem
                        ->addMedia($uploadedFile)
                        ->toMediaCollection('media');
                }
            }
        }

        return redirect()->route('menu-items.index');
    }

    public function delete(Request $request): RedirectResponse
    {
        $menuItem = MenuItem::findOrFail($request->integer('id'));
        $menuItem->delete();

        return back();
    }
}
