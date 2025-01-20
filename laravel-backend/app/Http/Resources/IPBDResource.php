<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IPBDResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if ($this->resource instanceof \Illuminate\Support\Collection) {
            return [
                $this->resource->map(function ($dField) {
                    return [
                        '_id' => $dField->id,
'SN' => $dField->SN,
'No' => $dField->No,
'PktMgktFED' => $dField->PktMgktFED,
'Pkt' => $dField->Pkt,
'Nama' => $dField->Nama,
'Jawatan' => $dField->Jawatan,
'TarikhMasukTentera' => $dField->TarikhMasukTentera,
'KursusKerjaya' => $dField->KursusKerjaya,
'KursusKepakaran' => $dField->KursusKepakaran,
'KelayakanAkademik' => $dField->KelayakanAkademik,
'DKT' => $dField->DKT,
'SKT' => $dField->SKT,
'TarikhTamatPerkhidmatan' => $dField->TarikhTamatPerkhidmatan,
'KursusTerkiniDalamNegara' => $dField->KursusTerkiniDalamNegara,
'TarikhKursusTerkini' => $dField->TarikhKursusTerkini,
'KursusLuarNegara' => $dField->KursusLuarNegara,
'TarikhKursusLuarNegara' => $dField->TarikhKursusLuarNegara,
'Catatan' => $dField->Catatan,
                        'createdAt' => $dField->created_at,
                        'updatedAt' => $dField->updated_at,
                    ];
                }),
            ];
        }
        return [
            '_id' => $this->id,
'SN' => $this->SN,
'No' => $this->No,
'PktMgktFED' => $this->PktMgktFED,
'Pkt' => $this->Pkt,
'Nama' => $this->Nama,
'Jawatan' => $this->Jawatan,
'TarikhMasukTentera' => $this->TarikhMasukTentera,
'KursusKerjaya' => $this->KursusKerjaya,
'KursusKepakaran' => $this->KursusKepakaran,
'KelayakanAkademik' => $this->KelayakanAkademik,
'DKT' => $this->DKT,
'SKT' => $this->SKT,
'TarikhTamatPerkhidmatan' => $this->TarikhTamatPerkhidmatan,
'KursusTerkiniDalamNegara' => $this->KursusTerkiniDalamNegara,
'TarikhKursusTerkini' => $this->TarikhKursusTerkini,
'KursusLuarNegara' => $this->KursusLuarNegara,
'TarikhKursusLuarNegara' => $this->TarikhKursusLuarNegara,
'Catatan' => $this->Catatan,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}
