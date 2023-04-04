<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\{Request, RedirectResponse};
use Illuminate\Support\Facades\{Auth, Route};
use App\Helpers\RenderInertia as React;
use Illuminate\Validation\ValidationException;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
  use React;

  /**
   * Display the login view.
   *
   * @return Response
   */
  public function create(): Response
  {
    return $this->render('Auth/Login', [
      'canResetPassword' => Route::has('password.request'),
      'status' => session('status'),
    ]);
  }

  /**
   * Handle an incoming authentication request.
   *
   * @param LoginRequest $request
   * @return RedirectResponse
   * @throws ValidationException
   */
  public function store(LoginRequest $request): RedirectResponse
  {
    $request->authenticate();
    $request->session()->regenerate();
    return redirect()->intended(RouteServiceProvider::HOME);
  }

  /**
   * Destroy an authenticated session.
   *
   * @param Request $request
   * @return RedirectResponse
   */
  public function destroy(Request $request): RedirectResponse
  {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
  }
}
