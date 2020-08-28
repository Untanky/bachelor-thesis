<?php

interface PostDAO
{
    function findAll();

    function create(Post $post);

    function update(Post $post);

    function delete(int $id);
}