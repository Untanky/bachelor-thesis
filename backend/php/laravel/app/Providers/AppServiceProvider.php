<?php

namespace App\Providers;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('dao\PostDAO', function ($app) {
            // Create a simple "default" Doctrine ORM configuration for Annotations
            $isDevMode = true;
            $config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/src"), $isDevMode, null, null, false);
            // or if you prefer XML
            // $config = Setup::createXMLMetadataConfiguration(array(__DIR__."/config"), $isDevMode);
            // database configuration parameters
            $conn = array(
                'url' => 'pdo-pgsql://root:root@localhost:5432/blog'
            );

            // obtaining the entity manager
            $entityManager = EntityManager::create($conn, $config);

            return new \dao\PostDBDAO($entityManager);
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
