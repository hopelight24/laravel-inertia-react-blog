<?php

use App\Http\Controllers\{
  ArticleController,
  CommentController,
  LikeController
};
use App\Http\Controllers\Dashboard\{
  DashboardArticleController,
  DashboardProfileController
};
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(ArticleController::class)->group(function () {
  Route::get('/', 'index')->name('article');
  Route::get('/articles/{article}', 'show')->name('article.detail');
});

Route::middleware(['auth', 'verified'])->group(function () {
  Route::prefix('/dashboard')->group(function () {
    Route::get('/', [DashboardArticleController::class, 'index'])->name('dashboard');
    Route::resource('/articles', DashboardArticleController::class);
  });

  Route::controller(DashboardProfileController::class)->prefix('/dashboard')->group(function () {
    Route::get('/profile', 'index')->name('profile');
    Route::get('/profile/edit', 'edit')->name('edit.profile');
    Route::post('/profile', 'update')->name('change.profile');
  });

  Route::post('/add-like-article', LikeController::class)->name('add.like');
  Route::post('/articles/comment', CommentController::class)->name('article.comment');
});

Route::fallback(function () {
  return view('errors.404');
});

require __DIR__ . '/auth.php';
