<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TimetableController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\SitemapController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('menu', [MenuController::class, 'index'])->name('menu');
Route::get('menu/{slug}', [MenuController::class, 'show'])->name('menu.show');
Route::post('contacts', [ContactController::class, 'store'])->name('contacts.store');
Route::get('sitemap.xml', [SitemapController::class, 'index'])->name('sitemap.index');

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
    Route::put('timetables', [TimetableController::class, 'update'])->name('timetables.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
