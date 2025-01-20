<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateIPBDRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'SN' => 'required|string|unique:iPBD',
'No' => 'required|numeric',
'PktMgktFED' => 'required|string',
'Pkt' => 'required|string',
'Nama' => 'required|string',
'Jawatan' => 'required|string',
'TarikhMasukTentera' => 'date',
'KursusKerjaya' => 'required|string',
'KursusKepakaran' => 'required|string',
'KelayakanAkademik' => 'required|string',
'DKT' => 'required|string',
'SKT' => 'required|string',
'TarikhTamatPerkhidmatan' => 'date',
'KursusTerkiniDalamNegara' => 'required|string',
'TarikhKursusTerkini' => 'date',
'KursusLuarNegara' => 'required|string',
'TarikhKursusLuarNegara' => 'date',
'Catatan' => 'required|string'
        ];
    }
}
