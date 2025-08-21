<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MenuItemController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('menu', function () {
    return Inertia::render('menu');
})->name('menu');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('menu-items', [MenuItemController::class, 'index'])->name('menu-item.index');
    Route::get('menu-items/create', [MenuItemController::class, 'create'])->name('menu-item.create');
    Route::get('menu-items/{menuItem}', [MenuItemController::class, 'edit'])->name('menu-item.edit');
    Route::post('menu-items', [MenuItemController::class, 'store'])->name('menu-item.store');
    Route::put('menu-items/{menuItem}', [MenuItemController::class, 'update'])->name('menu-item.update');
    Route::delete('menu-items', [MenuItemController::class, 'delete'])->name('menu-item.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
