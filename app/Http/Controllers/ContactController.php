<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use App\Enum\Reason;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('contacts/index', [
            'contacts' => Contact::orderByDesc('created_at')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'tel' => ['nullable', 'string', 'max:50'],
            'reason' => ['nullable', Rule::in(array_column(Reason::cases(), 'value'))],
            'nb_people' => ['nullable', 'integer', 'min:1'],
            'message' => ['nullable', 'string'],
        ]);

        Contact::create($validated);

        return redirect()->route('home');
    }

    public function show(Contact $contact): Response
    {
        return Inertia::render('contacts/show', [
            'contact' => $contact,
        ]);
    }

    public function delete(Request $request): RedirectResponse
    {
        $contact = Contact::findOrFail($request->integer('id'));
        $contact->delete();

        return back();
    }
}
