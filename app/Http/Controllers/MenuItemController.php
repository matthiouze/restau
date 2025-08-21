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
        ]);

        MenuItem::create($validated);

        return redirect()->route('menu-items.index');
    }

    public function edit(MenuItem $menuItem): Response
    {
        return Inertia::render('menu-items/edit', [
            'menuItem' => $menuItem,
        ]);
    }

    public function update(MenuItem $menuItem, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('menu_items', 'slug')->ignore($menuItem->id),
            ],
            'ingredients' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        $menuItem->update([
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'ingredients' => $validated['ingredients'] ?? null,
            'price' => $validated['price'],
        ]);

        return redirect()->route('menu-items.index');
    }

    public function delete(Request $request): RedirectResponse
    {
        $menuItem = MenuItem::findOrFail($request->integer('id'));
        $menuItem->delete();

        return back();
    }
}
