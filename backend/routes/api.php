<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SocialAuthController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['guest'])->group(function () {
    Route::controller(SocialAuthController::class)->group(function() {
        Route::get('/login/google', 'redirectToGoogle');
        Route::get('/login/google/callback', 'handleGoogleCallback');
        Route::get('/login/facebook', 'redirectToFacebook');
        Route::get('/login/facebook/callback', 'handleFacebookCallback');
    });

    Route::controller(AuthController::class)->group(function() {
        Route::post('/auth/login', 'login');
        Route::post('/auth/register', 'register');
    });
});
