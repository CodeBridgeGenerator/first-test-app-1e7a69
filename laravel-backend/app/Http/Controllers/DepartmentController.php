<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Department;
use App\Interfaces\DepartmentRepositoryInterface;
use App\Http\Requests\CreateDepartmentRequest;
use App\Http\Resources\DepartmentResource;


class DepartmentController extends Controller
{
    private DepartmentRepositoryInterface $DepartmentRepository;

    public function __construct(DepartmentRepositoryInterface $userRepository)
    {
        $this->DepartmentRepository = $userRepository;
    }

    public function index(Request $request): JsonResponse
    {
        $query = Department::query();

        // Handle specific FeathersJS query parameters
        if ($request->has('companyId')) {
            $query->where('companyId', $request->input('companyId'));
        }
        if ($request->has('name')) {
            $query->where('name', $request->input('name'));
        }
        if ($request->has('code')) {
            $query->where('code', $request->input('code'));
        }
        if ($request->has('isDefault')) {
            $query->where('isDefault', $request->input('isDefault'));
        }

        // Handle pagination
        $limit = $request->input('$limit', 10);  // Default to 10 items
        $skip = $request->input('$skip', 0);  // Default to no offset

        $query->limit($limit)->offset($skip);

        // Handle sorting
        if ($request->has('$sort')) {
            foreach ($request->input('$sort') as $field => $order) {
                if ($field === "createdAt") $field = "created_at";
                if ($field === "updatedAt") $field = "updated_at";
                if ($field === "_id") $field = "id";
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
        return response()->json(["data" => DepartmentResource::collection($results)]);
    }

    public function store(CreateDepartmentRequest $request): JsonResponse
    {
        $request->merge(['created_by' => Auth::id(), 'updated_by' => Auth::id()]);
        $data = Department::create($request->all());
        return response()->json(new DepartmentResource($data));
    }

    public function show(Request $request,  $id): JsonResponse
    {

        $query = Department::query();

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

        $data = Department::with([
            'createdBy' => function ($query) {
                $query->select('id', 'name'); // Assumes 'id' is needed for relationship linking
            },
            'updatedBy' => function ($query) {
                $query->select('id', 'name');
            }
        ])->findOrFail($id)->$query->get();
        return response()->json(DepartmentResource::collection($data));
    }

    public function update(CreateDepartmentRequest $request, $id): JsonResponse
    {
        $request->merge(['updated_by' => Auth::id()]);
        $newData = $request->except(["id", "created_at"]);
        $data = $this->DepartmentRepository->updateDepartment($id, (array) $newData);
        return response()->json(new DepartmentResource($data));
    }

    public function destroy($id)
    {
        $post = Department::find($id);
        $post->delete();
        return response()->json(['message' => 'Department deleted successfully']);
    }

    public function getSchema(): JsonResponse
    {
        return response()->json([
            \Illuminate\Support\Facades\DB::select("DESCRIBE departments")
        ]);
    }
}
