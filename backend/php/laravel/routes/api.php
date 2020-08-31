<?php

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

Route::prefix('blog')->group(function() {
    /**
     * Display All Posts
     */
    Route::get('/post', function () {
        //
    });

    /**
     * Add A New Post
     */
    Route::post('/post', function (Request $request) {
        //
    });

    /**
     * Update A Post
     */
    Route::put('/post/{id}', function ($id, Request $request) {
        //
    });

    /**
     * Delete An Existing Post
     */
    Route::delete('/task/{id}', function ($id) {
        //
    });
});
