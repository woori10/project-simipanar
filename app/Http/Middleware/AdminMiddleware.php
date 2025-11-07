<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Cek apakah user sudah login dan rolenya admin
        if (auth()->check() && auth()->user()->role === 'Admin') {
            return $next($request);
        }

        // Kalau bukan admin, tolak akses
        abort(403, 'Unauthorized access.');
    }
}
