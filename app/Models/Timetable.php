<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timetable extends Model
{
    protected $table = 'timetables';
    protected $fillable = ['day', 'start_am', 'end_am', 'start_pm', 'end_pm'];
}
