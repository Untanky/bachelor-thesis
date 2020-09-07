<?php

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

Route::prefix('blog')->group(function() {

    /**
     * Display All Posts
     */
    Route::get('/post', 'PostController@fetchAll');

    /**
     * Add A New Post
     */
    Route::post('/post', 'PostController@createPost');

    /**
     * Update A Post
     */
    Route::put('/post/{id}', 'PostController@updatePost');

    /**
     * Delete An Existing Post
     */
    Route::delete('/post/{id}', 'PostController@deletePost');
});
