<?php

namespace App\Helpers;

use Inertia\{Inertia, Response};

trait RenderInertia
{
  public function render(string $component, array $props = []): Response
  {
    return Inertia::render($component, $props);
  }
}
