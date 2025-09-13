<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class MenuItem extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'menu_items';
    protected $fillable = ['name', 'slug', 'ingredients', 'price'];

    public function meta(): MorphOne
    {
        return $this->morphOne(Meta::class, 'metable');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('media');
    }
}
