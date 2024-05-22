<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Notifications\EmailVerification;
use Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validated = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string'
            ]);

            if ($validated->fails()) {
                $response = [
                    'success' => false,
                    'message' => "Email dan password wajib diisi!"
                ];

                return response()->json($response, 400);
            }

            if (!User::where('email', $request->email)->first()) {
                $response = [
                    'success' => false,
                    'message' => "No account found with this email address."
                ];
    
                return response()->json($response, 400);
            }

            if (!Auth::attempt($request->all())) {
                $response = [
                    'success' => false,
                    'message' => "Wrong password."
                ];

                return response()->json($response, 400);
            }

            $user = User::where('email', $request->email)->first();
            $token = $user->createToken('authToken')->plainTextToken;

            $response = [
                "success" => true,
                "token" => $token,
                "message" => "Login Successfully, Welcome back " . $user->nama
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = [
                "success" => false,
                "message" => "Terjadi Kesalahan"
            ];

            return response()->json($response, 400);
        }
    }

    public function register(Request $request)
    {
        try {
            $validated = Validator::make($request->all(), [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email:rfc'],
                'password' => ['required', 'string', 'min:6'],
            ]);

            if ($validated->fails()) {
                $response = [
                    'success' => false,
                    'message' => $validated->errors()
                ];

                return response()->json($response, 400);
            }

            if (User::where('email', $request->email)->first()) {
                $response = [
                    'success' => false,
                    'message' => "Email has been registered, please login."
                ];
    
                return response()->json($response, 400);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Auth::login($user);
            $token = $user->createToken('authToken')->plainTextToken;

            $response = [
                "success" => true,
                "token" => $token,
                "message" => "Daftar Berhasil"
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = [
                "success" => false,
                "message" => "Terjadi Kesalahan"
            ];

            return response()->json($response, 400);
        }
    }

    public function logout(Request $request) {
        try {
            $request->user()->currentAccessToken()->delete();

            $response = [
                'success' => true,
                'message' => "Logout berhasil"
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = [
                'success' => false,
                'message' => "Logout gagal"
            ];

            return response()->json($response, 400);
        }
    }

    public function verify(Request $request)
    {
        try {
            $request->validate([
                "code" => "required|string|max:6"
            ]);

            $verify = auth()->user()->code == $request->code;

            if ($verify) {
                $response = [
                    'success' => true,
                    'message' => "Verifikasi email berhasil"
                ];

                return response()->json($response, 200);
            } else {
                $response = [
                    'success' => true,
                    'message' => "Kode yang anda masukkan salah"
                ];

                return response()->json($response, 400);
            }

        } catch (\Throwable $th) {
            $response = [
                'success' => false,
                'message' => "Verifikasi email gagal"
            ];

            return response()->json($response, 400);
        }
    }

    public function sendVerify(Request $request)
    {
        try {
            $code = mt_rand(000000, 999999);
            $user = Auth::user();
            $user->update([
                "code" => $code
            ]);
            $user->save();

            $user->notify(new EmailVerification($user));

            $response = [
                'success' => true,
                'message' => "Email verifikasi berhasil terkirim"
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = [
                'success' => false,
                'message' => "Email verifikasi gagal terkirim"
            ];

            return response()->json($response, 400);
        }
    }
}
