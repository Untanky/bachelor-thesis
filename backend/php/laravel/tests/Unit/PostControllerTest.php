<?php

use App\Http\Controllers\PostController;
use Codeception\Stub\Expected;
use dao\PostDAO;
use exception\IllegalArgumentException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use model\Post;

class PostControllerTest extends \Codeception\Test\Unit {

    protected function _before()
    {
        parent::_before(); // TODO: Change the autogenerated stub
    }

    function testFetchAll() {
        $post1 = new Post();
        $post1->setTitle('First post');
        $post1->setDescription('My very first post');

        $post2 = new Post();
        $post2->setTitle('Second post');
        $post2->setDescription('My very second post');

        $postList = [ $post1, $post2 ];

        $dao = $this->make('dao\PostDBDAO', [
            'findAll' => Expected::once($postList),
        ]);

        $postController = new PostController($dao);

        $actual = $postController->fetchAll();

        $this->assertEquals($postList, $actual);
    }

    function testCreatePost() {
        $post = new Post();
        $post->setTitle('First post');
        $post->setDescription('My very first post');

        $request = $this->make('Illuminate\Http\Request', [
            'getContent' => Expected::once(function () use ($post) { return json_encode($post); } ),
        ]);

        $dao = $this->make('dao\PostDBDAO', [
            'create' => Expected::once(),
        ]);

        $postController = new PostController($dao);

        $response = $postController->createPost($request);

        $this->assertEquals(Response::HTTP_NO_CONTENT, $response->getStatusCode());
    }

    function testCreatePostWithId() {
        $post = new Post();
        $post->setTitle('First post');
        $post->setDescription('My very first post');

        $request = $this->make('Illuminate\Http\Request', [
            'getContent' => Expected::once(function () use ($post) { return json_encode($post); } ),
        ]);

        $dao = $this->make('dao\PostDBDAO', [
            'create' => Expected::once(function () { throw new IllegalArgumentException(); }),
        ]);

        $postController = new PostController($dao);

        $response = $postController->createPost($request);

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
    }

    function testUpdatePost() {
        $postId = 3;

        $post = new Post();
        $post->setTitle('First post');
        $post->setDescription('My very first post');
        $reflObj = new ReflectionObject($post);
        $reflProperty = $reflObj->getProperty('id');
        $reflProperty->setAccessible(true);
        $reflProperty->setValue($post, $postId);

        $request = $this->make('Illuminate\Http\Request', [
            'getContent' => Expected::once(function () use ($post) { return json_encode($post); } ),
        ]);

        $dao = $this->make('dao\PostDBDAO', [
            'update' => Expected::once(),
        ]);

        $postController = new PostController($dao);

        $response = $postController->updatePost($postId, $request);

        $this->assertEquals(Response::HTTP_NO_CONTENT, $response->getStatusCode());
    }

    function testUpdatePostWithMismatchesId() {
        $postId = 3;

        $post = new Post();
        $post->setTitle('First post');
        $post->setDescription('My very first post');
        $reflObj = new ReflectionObject($post);
        $reflProperty = $reflObj->getProperty('id');
        $reflProperty->setAccessible(true);
        $reflProperty->setValue($post, $postId);

        $request = $this->make('Illuminate\Http\Request', [
            'getContent' => Expected::once(function () use ($post) { return json_encode($post); } ),
        ]);

        $dao = $this->make('dao\PostDBDAO', [
            'update' => Expected::never(),
        ]);

        $postController = new PostController($dao);

        $response = $postController->updatePost($postId + 1, $request);

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
    }

    function testUpdatePostWithUnknownId() {
        $postId = 3;

        $post = new Post();
        $post->setTitle('First post');
        $post->setDescription('My very first post');
        $reflObj = new ReflectionObject($post);
        $reflProperty = $reflObj->getProperty('id');
        $reflProperty->setAccessible(true);
        $reflProperty->setValue($post, $postId);

        $request = $this->make('Illuminate\Http\Request', [
            'getContent' => Expected::once(function () use ($post) { return json_encode($post); } ),
        ]);

        $dao = $this->make('dao\PostDBDAO', [
            'update' => Expected::once(function () { throw new IllegalArgumentException(); }),
        ]);

        $postController = new PostController($dao);

        $response = $postController->updatePost($postId, $request);

        $this->assertEquals(Response::HTTP_NOT_FOUND, $response->getStatusCode());
    }

    function testDeletePost() {
        $postId = 3;

        $dao = $this->make('dao\PostDBDAO', [
            'delete' => Expected::once(),
        ]);

        $postController = new PostController($dao);

        $response = $postController->deletePost($postId);

        $this->assertEquals(Response::HTTP_NO_CONTENT, $response->getStatusCode());
    }

    function testDeletePostWithUnknownId() {
        $postId = 3;

        $dao = $this->make('dao\PostDBDAO', [
            'delete' => Expected::once(function () { throw new IllegalArgumentException(); }),
        ]);

        $postController = new PostController($dao);

        $response = $postController->deletePost($postId);

        $this->assertEquals(Response::HTTP_NOT_FOUND, $response->getStatusCode());
    }
}
