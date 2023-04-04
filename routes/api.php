<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
  return response()->json([
    'message' => 'This API is under development, please stay tuned hehe',
    'author' => 'https://github.com/hopelight24',
  ], 200);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return response()->json(['users' => User::all()]);
});
