<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Primary Meta Tags -->
        <meta name="title" content="Credsh Wedding Apps - Platform Pernikahan Digital">
        <meta name="description" content="Platform pernikahan digital terlengkap untuk membantu perencanaan pernikahan impian Anda. Temukan vendor, undangan digital, dan fitur RSVP dalam satu aplikasi.">
        <meta name="keywords" content="wedding apps, aplikasi pernikahan, vendor pernikahan, undangan digital, RSVP online, wedding organizer">
        <meta name="author" content="Credsh Wedding Apps">
        <meta name="robots" content="index, follow">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ config('app.url') }}">
        <meta property="og:title" content="Credsh Wedding Apps - Platform Pernikahan Digital">
        <meta property="og:description" content="Platform pernikahan digital terlengkap untuk membantu perencanaan pernikahan impian Anda.">
        <meta property="og:image" content="{{ asset('images/og-image.jpg') }}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ config('app.url') }}">
        <meta property="twitter:title" content="Credsh Wedding Apps - Platform Pernikahan Digital">
        <meta property="twitter:description" content="Platform pernikahan digital terlengkap untuk membantu perencanaan pernikahan impian Anda.">
        <meta property="twitter:image" content="{{ asset('images/og-image.jpg') }}">

        <!-- Mobile App Meta -->
        <meta name="application-name" content="Credsh Wedding">
        <meta name="apple-mobile-web-app-title" content="Credsh Wedding">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="theme-color" content="#ffffff">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        {{--
        ----------------------------------------------------------------------

            CREATE BY maousamanatz

        --}}
        @inertia
    </body>
</html>
