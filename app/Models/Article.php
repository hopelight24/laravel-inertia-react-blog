<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Article extends Model
{
  use HasFactory;

  protected $guarded = ['id'];
  protected $with = ['user', 'category'];

  public function getRouteKeyName(): string
  {
    return 'slug';
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function category(): BelongsTo
  {
    return $this->belongsTo(Category::class);
  }

  public function comments(): HasMany
  {
    return $this->hasMany(Comment::class);
  }

  public function likes(): HasMany
  {
    return $this->hasMany(Like::class);
  }
}
