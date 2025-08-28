<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
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

    public function scopePublished(Builder $query)
    {
        return $query->where('published', 1);
    }
}
