<?php
/**
 * Author: Jon Garcia.
 * Date: 6/23/17
 * Time: 12:08 AM
 */

namespace App\Controllers;

use App\Core\Http\Controller;
use App\Core\Request;
use App\Models\Movie;

class MoviesController extends Controller
{

    public function newMovie(Request $request)
    {
        $this->validate($request, [
            "title" => ["required"],
            "format" => ["required"],
            "length" => ["required", "numeric", "min:1", "max:500"],
            "release_year" => ["required", "numeric", "length:4", "message" => "Release year is invalid. i.e 2001"],
            "rating" => ["numeric", "max:5"]
        ]);

        if (! $this->validated) {
            return [
                "status" => 403,
                "data" => array_values($this->getErrors())
            ];
        }

        $movie = new Movie([
            "title" => $request->get("title"),
            "format" => $request->get("format"),
            "length" => $request->get("length"),
            "release" => $request->get("release_year"),
            "rating" => $request->get("rating")
        ]);

        if ($movie->save()) {
            return [
                "status" => 200,
                "data" => $movie->toArray()
            ];
        }

        return [
            "status" => 500,
            "data" => "An unexpected error occurred"
        ];
    }

    public function getMovie($id, Request $request)
    {
        $movie = new Movie();
        $movie->find($id);

        return [
            "status" => $movie->count === 1 ? 200 : 404,
            "data" => $movie->toArray()
        ];
    }

    public function updateMovie($id, Request $request)
    {
        $this->validate($request, [
            "title" => ["required"],
            "format" => ["required"],
            "length" => ["required", "numeric", "min:1", "max:500"],
            "release_year" => ["required", "numeric", "length:4", "message" => "Release year is invalid. i.e 2001"],
            "rating" => ["numeric", "max:5"]
        ]);

        if (! $this->validated) {
            return [
                "status" => 403,
                "data" => array_values($this->getErrors())
            ];
        }

        $data = [
            "title" => $request->get("title"),
            "format" => $request->get("format"),
            "length" => $request->get("length"),
            "release" => $request->get("release_year"),
            "rating" => $request->get("rating")
        ];

        $movie = (new Movie())->find($id);

        if (! is_null($movie)) {
            foreach ($data as $key => $value) {
                $movie->{$key} = $value;
            }
            if ($movie->save()) {
                return [
                    "status" => 200,
                    "data" => ["mid" => $id]
                ];
            }
        }
        return [
            "status" => 500,
            "data" => "An unexpected error occurred"
        ];
    }

}