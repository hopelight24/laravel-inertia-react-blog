<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
  public function __invoke(Request $request): RedirectResponse
  {
    $validated_data = $request->validate(['comment' => ['required']]);
    $validated_data['user_id'] = auth()->user()->id;
    $validated_data['article_id'] = $request->article_id;

    if (Comment::create($validated_data)) return Redirect::back();
  }
}
