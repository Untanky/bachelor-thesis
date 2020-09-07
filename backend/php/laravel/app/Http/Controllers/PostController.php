<?php

namespace  App\Http\Controllers;

use dao\PostDAO;
use Illuminate\Http\Request;
use exception\IllegalArgumentException;
use Illuminate\Http\Response;
use model\Post;

class PostController extends Controller {

    /**
     * @var PostDAO
     */
    private $dao;

    public function __construct(PostDAO $dao)
    {
        $this->dao = $dao;
    }

    function fetchAll() {
        return $this->dao->findAll();
    }

    function createPost(Request $request) {
        try {
            $content = $request->getContent();
            $decodedContent = json_decode($content);
            $post = Post::fromArray($decodedContent);
            $this->dao->create($post);
            return new Response(null, Response::HTTP_NO_CONTENT);
        } catch (IllegalArgumentException $e) {
            return new Response(null, Response::HTTP_BAD_REQUEST);
        }
    }

    function updatePost($id, Request $request) {
        try {
            $content = $request->getContent();
            $decodedContent = json_decode($content);
            $post = Post::fromArray($decodedContent);

            if($post->getId() != $id) {
                return new Response(null, Response::HTTP_BAD_REQUEST);
            }

            $this->dao->update($post);
            return new Response(null, Response::HTTP_NO_CONTENT);
        } catch (IllegalArgumentException $e) {
            return new Response(null, Response::HTTP_NOT_FOUND);
        }
    }


    function deletePost($id) {
        try {
            $this->dao->delete($id);
            return new Response(null, Response::HTTP_NO_CONTENT);
        } catch (IllegalArgumentException $e) {
            return new Response(null, Response::HTTP_NOT_FOUND);
        }
    }
}
