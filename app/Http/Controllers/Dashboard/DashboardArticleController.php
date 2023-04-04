<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\{Article, Category};
use Inertia\Response;
use Illuminate\Http\{Request, RedirectResponse};
use Illuminate\Support\Facades\{Redirect, Session, Storage};
use Illuminate\Support\Str;
use App\Helpers\RenderInertia as React;
use App\Http\Controllers\Controller;

class DashboardArticleController extends Controller
{
  use React;

  /**
   * Display a listing of the resource.
   *
   * @return Response
   */
  public function index(): Response
  {
    return $this->render('Dashboard/Article/index', [
      'articles' => Article::where('user_id', auth()->user()->id)->latest()->get(),
      'categories' => Category::all()
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return Response
   */
  public function create(): Response
  {
    return $this->render('Dashboard/Article/Create', [
      'categories' => Category::all()
    ]);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param Request $request
   * @return RedirectResponse
   */
  public function store(Request $request): RedirectResponse
  {
    $validated_data = $request->validate([
      'title' => ['required', 'unique:articles', 'min:10', 'max:255'],
      'image' => ['required', 'image', 'file', 'max:2560'],
      'category_id' => ['required'],
      'content' => ['required', 'min:100']
    ]);

    $validated_data['image'] = $request->file('image')->store('articles-image');
    $validated_data['category_id'] = intval($validated_data['category_id']);
    $validated_data['user_id'] = auth()->user()->id;
    $validated_data['slug'] = Str::slug(strtolower($validated_data['title']));
    $validated_data['excerpt'] = Str::limit(strip_tags($validated_data['content']), 100);

    if (Article::create($validated_data)) Session::flash('message', 'Berhasil membuat artikel baru');
    else Session::flash('message', 'Gagal membuat artikel baru');

    return Redirect::route('dashboard');
  }

  /**
   * Display the specified resource.
   *
   * @param Article $article
   * @return Response
   */
  public function show(Article $article): Response
  {
    return $this->render('Dashboard/Article/Show', [
      'article' => $article->load('comments')
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param Article $article
   * @return Response
   */
  public function edit(Article $article): Response
  {
    return $this->render('Dashboard/Article/Edit', [
      'article' => $article,
      'author' => $article->user,
      'categories' => Category::all()
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param Request $request
   * @param Article $article
   * @return RedirectResponse
   */
  public function update(Request $request, Article $article): RedirectResponse
  {
    $validated_data = $request->validate([
      'category_id' => ['required'],
      'content' => ['required', 'min:100']
    ]);

    if ($request->title !== $article->title) {
      $request->validate(['title' => 'required|unique:articles|min:10|max:255']);
      $validated_data['title'] = $request->title;
    }

    if ($request->file('image')) {
      if (!is_null($article->image)) Storage::delete($article->image);
      $request->validate(['image' => 'required|image|file|max:2560']);
      $validated_data['image'] = $request->file('image')->store('articles-image');
    } else $validated_data['image'] = $article->image;

    $validated_data['slug'] = Str::slug(strtolower($request->title ?? $article->title));
    $validated_data['category_id'] = intval($validated_data['category_id']);
    $validated_data['user_id'] = auth()->user()->id;
    $validated_data['excerpt'] = Str::limit(strip_tags($validated_data['content']), 100);

    $article = Article::find($article->id);

    if ($article->update($validated_data)) Session::flash('message', 'Berhasil memperbarui artikel');
    else Session::flash('message', 'Gagal memperbarui artikel :(');

    return Redirect::route('dashboard');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param Article $article
   * @return RedirectResponse
   */
  public function destroy(Article $article): RedirectResponse
  {
    $article = Article::find($article->id);

    if (!is_null($article)) {
      if (!is_null($article->image)) Storage::delete($article->image);
      $article->delete();
      Session::flash('message', 'Artikel berhasil dihapus');
    } else Session::flash('message', 'Artikel gagal dihapus');

    return Redirect::back();
  }
}
