<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth, Hash};
use Illuminate\Validation\Rules;
use App\Helpers\RenderInertia as React;
use Illuminate\Validation\ValidationException;
use Inertia\Response;

class RegisteredUserController extends Controller
{
  use React;

  /**
   * Display the registration view.
   *
   * @return Response
   */
  public function create(): Response
  {
    return $this->render('Auth/Register');
  }

  /**
   * Handle an incoming registration request.
   *
   * @param Request $request
   * @return RedirectResponse
   *
   * @throws ValidationException
   */
  public function store(Request $request): RedirectResponse
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
    ]);

    event(new Registered($user));
    return redirect(RouteServiceProvider::LOGIN)->with('message', 'Register berhasil, silahkan login!');
  }
}
