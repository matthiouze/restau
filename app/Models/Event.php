<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Event extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'events';
    protected $fillable = ['title', 'description', 'start_date', 'end_date', 'published'];
    protected $casts = [
        'published'  => 'boolean',
        'start_date' => 'datetime:d/m/Y',
        'end_date'   => 'datetime:d/m/Y',
    ];

    public function meta(): MorphOne
    {
        return $this->morphOne(Meta::class, 'metable');
    }

    public function scopePublished(Builder $query)
    {
        return $query->where('published', 1);
    }
}
