<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\{Request, RedirectResponse};

class LikeController extends Controller
{
  public function __invoke(Request $request): RedirectResponse
  {
    $data = ['user_id' => auth()->user()->id, 'article_id' => $request->article_id];
    $like = Like::where(['user_id' => auth()->user()->id, 'article_id' => $request->article_id])
      ->first();

    if (!is_null($like)) Like::find($like->id)->delete();
    else Like::create($data);

    return Redirect::back();
  }
}
