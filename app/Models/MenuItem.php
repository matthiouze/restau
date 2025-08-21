<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class MenuItem extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'menu_items';
    protected $fillable = ['name', 'slug', 'ingredients', 'price'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('media');
    }
}
