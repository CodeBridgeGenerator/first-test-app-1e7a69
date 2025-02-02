<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profile extends Model
{
    use HasApiTokens, HasFactory;

    protected $table = "profiles";
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'image',
        'bio',
        'hod',
        'hos',
        'skills'
    ];

    public function userId()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'id');
    }

    public function section()
    {
        return $this->belongsTo(Section::class, 'id');
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'id');
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'id');
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'id');
    }

    public function address()
    {
        return $this->belongsTo(UserAddress::class, 'id');
    }

    public function phone()
    {
        return $this->belongsTo(UserPhone::class, 'id');
    }

    public function permissionServices(): HasMany
    {
        return $this->hasMany(PermissionService::class);
    }
    public function permissionFields(): HasMany
    {
        return $this->hasMany(PermissionField::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    public $timestamps = true;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];
}
