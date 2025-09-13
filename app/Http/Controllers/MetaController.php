<?php

namespace App\Http\Controllers;

use App\Models\Meta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class MetaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('metas/index', [
            'metas' => Meta::all()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('metas/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description'  => ['required'],
            'owner_type'  => ['required'],
            'owner_id'  => ['required'],
        ]);

        Meta::create([
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'owner_type'  => $validated['owner_type'],
            'owner_id'    => $validated['owner_id'],
        ]);

        return redirect()->route('metas.index');
    }

    public function edit(Meta $meta): Response
    {
        return Inertia::render('metas/edit', ['meta' => $meta]);
    }

    public function update(Meta $meta, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description'  => ['required'],
            'owner_type'  => ['required'],
            'owner_id'  => ['required'],
        ]);

        $meta->update([
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'owner_type'  => $validated['owner_type'],
            'owner_id'    => $validated['owner_id'],
        ]);

        return back();
    }

    public function delete(Meta $meta): RedirectResponse
    {
        $meta->delete();

        return back();
    }
}
