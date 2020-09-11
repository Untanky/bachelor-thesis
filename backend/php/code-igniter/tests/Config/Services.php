<?php

namespace Config;

use CodeIgniter\Config\Services as CoreServices;
use dao\PostDBDAO;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;
use model\Post;

class Services extends CoreServices
{

    public static function dao()
    {
        // Create a simple "default" Doctrine ORM configuration for Annotations
        $isDevMode = true;
        $config = Setup::createAnnotationMetadataConfiguration(array(__DIR__ . "/src"), $isDevMode, null, null, false);
        // or if you prefer XML
        // $config = Setup::createXMLMetadataConfiguration(array(__DIR__."/config"), $isDevMode);
        // database configuration parameters
        $conn = array(
            'driver' => 'pdo_sqlite',
            'database' => ':memory:',
            'prefix' => '',
        );

        // obtaining the entity manager
        $entityManager = EntityManager::create($conn, $config);

        Services::createDatabaseSchema($entityManager);

        return new PostDBDAO($entityManager);
    }

    private static function createDatabaseSchema(EntityManager $entityManager) {
        $metadata = $entityManager->getClassMetadata(Post::class);
        $schemaTool = new \Doctrine\ORM\Tools\SchemaTool($entityManager);
        // you can drop the table like this if necessary
        $schemaTool->dropSchema(array($metadata));
        $schemaTool->createSchema(array($metadata));
    }
}