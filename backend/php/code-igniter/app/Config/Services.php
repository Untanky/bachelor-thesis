<?php namespace Config;

use CodeIgniter\Config\Services as CoreServices;
use dao\PostDBDAO;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;

/**
 * Services Configuration file.
 *
 * Services are simply other classes/libraries that the system uses
 * to do its job. This is used by CodeIgniter to allow the core of the
 * framework to be swapped out easily without affecting the usage within
 * the rest of your application.
 *
 * This file holds any application-specific services, or service overrides
 * that you might need. An example has been included with the general
 * method format you should use for your service methods. For more examples,
 * see the core Services file at system/Config/Services.php.
 */
class Services extends CoreServices
{

    public static function dao() {
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

        return new PostDBDAO($entityManager);
    }

	//    public static function example($getShared = true)
	//    {
	//        if ($getShared)
	//        {
	//            return static::getSharedInstance('example');
	//        }
	//
	//        return new \CodeIgniter\Example();
	//    }
}
