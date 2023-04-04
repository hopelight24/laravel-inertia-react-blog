<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="image/png" sizes="16x16" rel="icon" href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link type="image/png" sizes="32x32" rel="icon" href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link type="image/png" sizes="96x96" rel="icon" href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link type="image/png" sizes="120x120" rel="icon" href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="icon" type="image/png" sizes="72x72" href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="icon" type="image/png" sizes="96x96" href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="icon" type="image/png" sizes="144x144" href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="icon" type="image/png" sizes="192x192" href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="icon" type="image/png" sizes="512x512" href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="apple-touch-icon" type="image/png" sizes="57x57"
        href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="apple-touch-icon" type="image/png" sizes="60x60"
        href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="apple-touch-icon" type="image/png" sizes="72x72"
        href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="apple-touch-icon" type="image/png" sizes="76x76"
        href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="apple-touch-icon" type="image/png" sizes="114x114"
        href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="apple-touch-icon" type="image/png" sizes="120x120"
        href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="apple-touch-icon" type="image/png" sizes="144x144"
        href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="apple-touch-icon" type="image/png" sizes="152x152"
        href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link rel="apple-touch-icon" type="image/png" sizes="180x180"
        href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <link color="#26E07F" rel="mask-icon" href="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <meta name="msapplication-square70x70logo" content="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <meta name="msapplication-TileImage" content="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <meta name="msapplication-square150x150logo" content="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <meta name="msapplication-square310x310logo" content="https://img.icons8.com/dusk/256/000000/php-logo.png">
    <meta name="msapplication-TileColor" content="#C0FFEE">
    <meta name="application-name" content="Larablog">
    <title>404 Not Found</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="overflow-hidden">
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-blue-400">
        <div class="container">
            <div class="px-20 py-10 md:px-40 md:py-20 bg-white sm:rounded-md sm:shadow-xl">
                <div class="flex flex-col items-center">
                    <h1 class="font-bold text-blue-600 text-9xl">404</h1>

                    <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span class="text-red-500">Oops!</span> Page not found
                    </h6>

                    <p class="mb-8 text-center text-gray-500 md:text-lg">
                        The page you’re looking for doesn’t exist.
                    </p>

                    <a href="{{ route('article') }}"
                        class="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100">
                        Go home
                    </a>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
