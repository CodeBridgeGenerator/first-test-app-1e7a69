<?php

namespace App\Repositories;

use App\Interfaces\IPBDRepositoryInterface;
use App\Models\IPBD;
use App\Http\Resources\IPBDResource;

class IPBDRepository implements IPBDRepositoryInterface 
{
    public function getAllIPBDS() 
    {
        $iPBD = IPBD::all();
        return IPBDResource::collection($iPBD);
    }

    public function getIPBDById($IPBDId) 
    {
        $iPBD = IPBD::findOrFail($IPBDId);
        return IPBDResource::collection($iPBD);
    }

    public function deleteIPBD($IPBDId) 
    {
        IPBD::destroy($IPBDId);
    }

    public function createIPBD(array $IPBDDetails) 
    {
        return IPBD::create($IPBDDetails);
    }

    public function updateIPBD($IPBDId, array $newDetails) 
    {
        return IPBD::whereId($IPBDId)->update($newDetails);
    }

}