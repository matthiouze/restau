<?php

namespace Database\Seeders;

use App\Models\Timetable;
use Illuminate\Database\Seeder;

class TimetableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TimeTable::query()->truncate();

        foreach (['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as $day) {
            TimeTable::query()->create([
                'day'      => $day,
                'start_am' => '09:00',
                'end_am'   => '12:00',
                'start_pm' => '14:00',
                'end_pm'   => '18:00',
            ]);
        }
    }
}
