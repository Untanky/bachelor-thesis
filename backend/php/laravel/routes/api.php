<?php

use exception\IllegalArgumentException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use dao\PostDBDAO;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
use model\Post;

// Create a simple "default" Doctrine ORM configuration for Annotations
$isDevMode = true;
$config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."../dao/src"), $isDevMode, null, null, false);
// or if you prefer XML
// $config = Setup::createXMLMetadataConfiguration(array(__DIR__."/config"), $isDevMode);
// database configuration parameters
$conn = array(
    'url' => 'pdo-pgsql://root:root@localhost:5432/blog'
);

// obtaining the entity manager
$entityManager = EntityManager::create($conn, $config);

$dao = new PostDBDAO($entityManager);

Route::prefix('blog')->group(function() use ($dao) {

    /**
     * Display All Posts
     */
    Route::get('/post', function () use ($dao) {
        return $dao->findAll();
    });

    /**
     * Add A New Post
     */
    Route::post('/post', function (Request $request) use ($dao) {
        try {
            $content = $request->getContent();
            $decodedContent = json_decode($content);
            $post = Post::fromArray($decodedContent);
            $dao->create($post);
            return 204;
        } catch (IllegalArgumentException $e) {
            return 400;
        }
    });

    /**
     * Update A Post
     */
    Route::put('/post/{id}', function ($id, Request $request) use ($dao) {
        try {
            $content = $request->getContent();
            $decodedContent = json_decode($content);
            $post = Post::fromArray($decodedContent);

            if($post->getId() != $id) {
                return 400;
            }

            $dao->update($post);
            return 204;
        } catch (IllegalArgumentException $e) {
            return 404;
        }
    });

    /**
     * Delete An Existing Post
     */
    Route::delete('/post/{id}', function ($id) use ($dao) {
        try {
            $dao->delete($id);
            return 204;
        } catch (IllegalArgumentException $e) {
            return 404;
        }
    });
});
