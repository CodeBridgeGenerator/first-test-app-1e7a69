<?php

namespace App\Interfaces;

interface IPBDRepositoryInterface 
{
    public function getAllIPBDS();
    public function getIPBDById($iPBDId);
    public function deleteIPBD($iPBDId);
    public function createIPBD(array $iPBDDetails);
    public function updateIPBD($iPBDId, array $newDetails);
}