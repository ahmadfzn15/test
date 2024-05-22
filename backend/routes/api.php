<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(AuthController::class)->group(function() {
        Route::post('/logout', 'logout');
    });

    Route::controller(AuthController::class)->group(function() {
        Route::post('/verify-email', 'verify');
        Route::post('/send-verify', 'sendVerify');
    });
});

Route::middleware(['guest'])->group(function () {
    Route::controller(AuthController::class)->group(function() {
        Route::post('/auth/login', 'login');
        Route::post('/auth/register', 'register');
    });
});

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    $response = [
        "success" => true,
        "message" => "Email verifikasi berhasil dikirim"
    ];

    return response()->json($response, 200);
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::controller(PasswordResetLinkController::class)->group(function() {
    Route::post('/forgot-password', 'store');
});

