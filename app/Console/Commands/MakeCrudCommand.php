<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeCrudCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:crud {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Créer un CRUD pour un modèle donné avec un contrôleur, des vues et une migration';

    /**
     * Execute the console command.
     */
    public function handle()
    {
            $model = $this->argument('model');

        $this->call('make:model', ['name' => $model]);
        $this->call('make:controller', ['name' => $model.'Controller']);
        $this->call('make:migration', [
            'name' => 'create_' . strtolower($model) . 's_table',
        ]);

        $this->updateController($model);
        $this->updateRoute($model);

        $this->info('Done');
    }

    protected function getStub(?string $key = null): array|string
    {
        $stubs = [
            'controller' => __DIR__ . '/stubs/controller.stub',
            'route'      => __DIR__ . '/stubs/web.stub',
        ];

        if ($key) {
            return $stubs[$key];
        }

        return $stubs;
    }

    private function updateController(string $model): void
    {
        $path = app_path("Http/Controllers/{$model}Controller.php");
        $stub = file_get_contents($this->getStub('controller'));

        $content = str_replace(
            ['{{ $model }}', '{{ $controllerName }}'],
            [$model, $model.'Controller'],
            $stub
        );

        file_put_contents($path, $content);
    }

    private function updateRoute(string $model): void
    {
        $path = base_path("routes/web.php");
        $stub = file_get_contents($this->getStub('route'));

        $content = str_replace(
            ['{{ $model }}', '{{ $name }}'],
            [$model, strtolower($model)],
            $stub
        );

        file_put_contents($path, $content);
    }
}
