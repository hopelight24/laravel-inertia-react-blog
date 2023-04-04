<?php

namespace App\Http\Controllers;

use App\Models\{Article, Category};
use App\Helpers\RenderInertia as React;
use Inertia\Response;

class ArticleController extends Controller
{
  use React;

  public function index(): Response
  {
    return $this->render('Articles/index', [
      'articles' => Article::latest()->simplePaginate(11),
      'categories' => Category::all()
    ]);
  }

  public function show(Article $article): Response
  {
    return $this->render('Articles/Article', [
      'article' => $article->load(['comments', 'likes']),
      'categories' => Category::all(),
    ]);
  }
}
