<?php

interface PostDAO
{
    function findAll();

    function create($post);

    function update($post);

    function delete($post);
}