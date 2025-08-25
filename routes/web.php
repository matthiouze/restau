<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TimetableController;
use App\Models\MenuItem;

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');

Route::get('menu', function () {
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
        'items' => $items,
    ]);
})->name('menu');

Route::get('menu/{slug}', function (string $slug) {
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
    ]);
})->name('menu.show');

Route::post('contacts', [ContactController::class, 'store'])->name('contacts.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('menu-items', [MenuItemController::class, 'index'])->name('menu-items.index');
    Route::get('menu-items/create', [MenuItemController::class, 'create'])->name('menu-items.create');
    Route::get('menu-items/{menuItem}', [MenuItemController::class, 'edit'])->name('menu-items.edit');
    Route::post('menu-items', [MenuItemController::class, 'store'])->name('menu-items.store');
    Route::put('menu-items/{menuItem}', [MenuItemController::class, 'update'])->name('menu-items.update');
    Route::delete('menu-items', [MenuItemController::class, 'delete'])->name('menu-items.delete');

    Route::get('contacts', [ContactController::class, 'index'])->name('contacts.index');
    Route::get('contacts/{contact}', [ContactController::class, 'show'])->name('contacts.show');
    Route::delete('contacts', [ContactController::class, 'delete'])->name('contacts.delete');

    Route::get('timetables', [TimetableController::class, 'index'])->name('timetables.index');
    Route::put('timetables', [TimetableController::class, 'bulkUpdate'])->name('timetables.bulk-update');
    Route::put('timetables/{timetable}', [TimetableController::class, 'update'])->name('timetables.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
