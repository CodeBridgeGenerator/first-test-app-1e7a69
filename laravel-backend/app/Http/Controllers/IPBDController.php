<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\IPBD;
use App\Interfaces\IPBDRepositoryInterface;
use App\Http\Requests\CreateIPBDRequest;
use App\Http\Resources\IPBDResource;


class IPBDController extends Controller
{
    private IPBDRepositoryInterface $IPBDRepository;

    public function __construct(IPBDRepositoryInterface $userRepository) 
    {
        $this->IPBDRepository = $userRepository;
    }

    public function index(Request $request): JsonResponse 
    {
        $query = IPBD::query();

        // Handle specific FeathersJS query parameters
        if ($request->has('SN')) {$query->where('SN', $request->input('SN'));}
if ($request->has('No')) {$query->where('No', $request->input('No'));}
if ($request->has('PktMgktFED')) {$query->where('PktMgktFED', $request->input('PktMgktFED'));}
if ($request->has('Pkt')) {$query->where('Pkt', $request->input('Pkt'));}
if ($request->has('Nama')) {$query->where('Nama', $request->input('Nama'));}
if ($request->has('Jawatan')) {$query->where('Jawatan', $request->input('Jawatan'));}
if ($request->has('TarikhMasukTentera')) {$query->where('TarikhMasukTentera', $request->input('TarikhMasukTentera'));}
if ($request->has('KursusKerjaya')) {$query->where('KursusKerjaya', $request->input('KursusKerjaya'));}
if ($request->has('KursusKepakaran')) {$query->where('KursusKepakaran', $request->input('KursusKepakaran'));}
if ($request->has('KelayakanAkademik')) {$query->where('KelayakanAkademik', $request->input('KelayakanAkademik'));}
if ($request->has('DKT')) {$query->where('DKT', $request->input('DKT'));}
if ($request->has('SKT')) {$query->where('SKT', $request->input('SKT'));}
if ($request->has('TarikhTamatPerkhidmatan')) {$query->where('TarikhTamatPerkhidmatan', $request->input('TarikhTamatPerkhidmatan'));}
if ($request->has('KursusTerkiniDalamNegara')) {$query->where('KursusTerkiniDalamNegara', $request->input('KursusTerkiniDalamNegara'));}
if ($request->has('TarikhKursusTerkini')) {$query->where('TarikhKursusTerkini', $request->input('TarikhKursusTerkini'));}
if ($request->has('KursusLuarNegara')) {$query->where('KursusLuarNegara', $request->input('KursusLuarNegara'));}
if ($request->has('TarikhKursusLuarNegara')) {$query->where('TarikhKursusLuarNegara', $request->input('TarikhKursusLuarNegara'));}
if ($request->has('Catatan')) {$query->where('Catatan', $request->input('Catatan'));}

        // Handle pagination
        $limit = $request->input('$limit', 10);  // Default to 10 items
        $skip = $request->input('$skip', 0);  // Default to no offset

        $query->limit($limit)->offset($skip);

        // Handle sorting
        if ($request->has('$sort')) {
            foreach ($request->input('$sort') as $field => $order) {
                if($field === "createdAt") $field = "created_at";
                if($field === "updatedAt") $field = "updated_at";
                if($field === "_id") $field = "id";
                $query->orderBy($field, $order == 1 ? 'asc' : 'desc');
            }
        }

        if ($request->has('$populate')) {
            $populateParams = $request->input('$populate');

            // Initialize an array to hold the relationships and their field constraints
            $relationships = [];

            foreach ($populateParams as $populate) {
                $relationship = $populate['path'];
                $fields = $populate['select'] ?? ['*'];

                // Add the relationship and its fields to the array
                $relationships[$relationship] = function ($query) use ($fields) {
                    $query->select($fields);
                };
            }

            // Apply eager loading with specific fields
            $query->with($relationships);
        }

        // Execute and get the results
        $results = $query->get();

        // Return as a JSON resource (optional)
        return response()->json(["data" => IPBDResource::collection($results)]);
    }

    public function store(CreateIPBDRequest $request): JsonResponse 
    {
        $request->merge(['created_by' => Auth::id(), 'updated_by' => Auth::id()]);
        $data = IPBD::create($request->all());
        return response()->json(new IPBDResource($data));
    }

    public function show(Request $request,  $id): JsonResponse
    {

        $query = IPBD::query();

        // Check for `$populate` parameters
        if ($request->has('$populate')) {
            $populateParams = $request->input('$populate');

            // Initialize an array to hold the relationships and their field constraints
            $relationships = [];

            foreach ($populateParams as $populate) {
                $relationship = $populate['path'];
                $fields = $populate['select'] ?? ['*'];

                // Add the relationship and its fields to the array
                $relationships[$relationship] = function ($query) use ($fields) {
                    $query->select($fields);
                };
            }

            // Apply eager loading with specific fields
            $query->with($relationships);
        }

        $data = IPBD::with([
            'createdBy' => function ($query) {
                $query->select('id', 'name'); // Assumes 'id' is needed for relationship linking
            },
            'updatedBy' => function ($query) {
                $query->select('id', 'name');
            }
        ])->findOrFail($id)->$query->get();
        return response()->json(IPBDResource::collection($data));
    }

    public function update(CreateIPBDRequest $request, $id): JsonResponse
    {
        $request->merge(['updated_by' => Auth::id()]);
        $newData = $request->except(["id","created_at"]);
        $data = $this->IPBDRepository->updateIPBD( $id, (array) $newData);
        return response()->json($data);
    }

    public function destroy($id)
    {
        $post = IPBD::find($id);
        $post->delete();
        return response()->json(['message' => 'IPBD deleted successfully']);
    }

    public function getSchema() : JsonResponse{
        return response()->json([
            \Illuminate\Support\Facades\DB::select("DESCRIBE i_p_b_d")
        ]);
    }

}
