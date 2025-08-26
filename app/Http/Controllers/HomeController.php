<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('index', [
            'is_closed'       => config('app.is_closed'),
            'is_closed_until' => config('app.is_closed') ? config('app.is_closed_until') : null,
        ]);
    }
}
