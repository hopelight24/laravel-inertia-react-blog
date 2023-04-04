<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Response;
use Illuminate\Http\{Request, RedirectResponse};
use Illuminate\Support\Facades\{Redirect, Session, Storage};
use App\Models\User;
use App\Helpers\RenderInertia as React;
use App\Http\Controllers\Controller;

class DashboardProfileController extends Controller
{
  use React;

  public function index(): Response
  {
    return $this->render('Dashboard/Profile/index');
  }

  public function edit(): Response
  {
    return $this->render('Dashboard/Profile/Edit');
  }

  public function update(Request $request): RedirectResponse
  {
    $image = $request->file('avatar');

    $validated_data = $request->validate([
      'name' => ['required', 'max:255'],
      'email' => ['required', 'email:dns'],
      'phone_number' => ['nullable', 'numeric'],
      'city' => ['nullable', 'max:255'],
      'gender' => ['nullable', 'max:255'],
      'country' => ['nullable', 'max:255'],
      'avatar' => ['nullable', 'image', 'file', 'max:1024'],
    ]);

    if ($image) {
      if (!is_null(auth()->user()->avatar)) Storage::delete(auth()->user()->avatar);
      $validated_data['avatar'] = $image->store('profile-images');
    } else $validated_data['avatar'] = auth()->user()->avatar ?? null;

    $user = User::where('id', auth()->user()->id);

    if ($user->update($validated_data)) Session::flash('message', 'Profile updated successfully');
    else Session::flash('message', 'Profile updated failed');

    return Redirect::route('profile');
  }
}
