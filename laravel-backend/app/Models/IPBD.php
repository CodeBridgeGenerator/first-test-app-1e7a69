<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;


class IPBD extends Model
{
    use HasApiTokens, HasFactory;

    protected $table = "i_p_b_d";
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'SN',
'No',
'PktMgktFED',
'Pkt',
'Nama',
'Jawatan',
'TarikhMasukTentera',
'KursusKerjaya',
'KursusKepakaran',
'KelayakanAkademik',
'DKT',
'SKT',
'TarikhTamatPerkhidmatan',
'KursusTerkiniDalamNegara',
'TarikhKursusTerkini',
'KursusLuarNegara',
'TarikhKursusLuarNegara',
'Catatan'
    ];

    
    
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
    protected $hidden = [
        
    ];

    public $timestamps = true;
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        
    ];
}
