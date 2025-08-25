<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Timetable;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;

class TimetableController extends Controller
{
    public function index(): Response
    {
        $timetables = Timetable::query()
            ->orderBy('id')
            ->get()
            ->map(function (Timetable $tt) {
                return [
                    'id' => $tt->id,
                    'day' => $tt->day,
                    'start_am' => $tt->start_am,
                    'end_am' => $tt->end_am,
                    'start_pm' => $tt->start_pm,
                    'end_pm' => $tt->end_pm,
                ];
            });

        return Inertia::render('timetables/index', [
            'timetables' => $timetables,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
           'rows'            => ['required', 'array'],
           'rows.*.id'       => ['required', 'integer', 'exists:timetables,id'],
           'rows.*.start_am' => ['nullable', 'date_format:H:i'],
           'rows.*.end_am'   => ['nullable', 'date_format:H:i'],
           'rows.*.start_pm' => ['nullable', 'date_format:H:i'],
           'rows.*.end_pm'   => ['nullable', 'date_format:H:i'],
        ]);

        foreach ($data['rows'] as $row) {
            $tt = Timetable::find($row['id']);
            $tt->update([
                'start_am' => Arr::get($row, 'start_am'),
                'end_am'   => Arr::get($row, 'end_am'),
                'start_pm' => Arr::get($row, 'start_pm'),
                'end_pm'   => Arr::get($row, 'end_pm'),
            ]);
        }

        return back()->with('success', 'Horaires mis à jour');
    }
}
