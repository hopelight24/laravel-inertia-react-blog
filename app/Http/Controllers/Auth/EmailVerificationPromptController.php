<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Helpers\RenderInertia as React;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
  use React;

  /**
   * Display the email verification prompt.
   *
   * @param Request $request
   * @return RedirectResponse|Response
   */
  public function __invoke(Request $request): RedirectResponse|Response
  {
    return $request->user()->hasVerifiedEmail()
      ? redirect()->intended(RouteServiceProvider::HOME)
      : $this->render('Auth/VerifyEmail', ['status' => session('status')]);
  }
}
