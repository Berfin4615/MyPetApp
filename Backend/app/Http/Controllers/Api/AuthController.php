<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Kayıt ol (istersen sonra mobilde kullanırsın)
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password), // ŞİFRE HASH'Lİ
        ]);

        // Mobil app için token üret
        $token = $user->createToken('mobile')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }

    // Giriş yap
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        // Email ile kullanıcıyı bul
        $user = User::where('email', $request->email)->first();

        // Kullanıcı yoksa veya şifre yanlışsa
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'E-posta veya şifre hatalı.',
            ], 401);
        }

        // İstersen eski tokenları silebilirsin:
        // $user->tokens()->delete();

        // Yeni token üret
        $token = $user->createToken('mobile')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    // Çıkış yap
    public function logout(Request $request)
    {
        // Sadece kullanılan tokenı sil
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Çıkış yapıldı.',
        ]);
    }
}
