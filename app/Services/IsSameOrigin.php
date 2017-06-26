<?php
/**
 * Author: Jon Garcia.
 * Date: 6/25/17
 * Time: 7:32 PM
 */

namespace App\Services;


use App\Core\Interfaces\Advises\BeforeAdvise;
use App\Core\Request;

class IsSameOrigin implements BeforeAdvise {

    public function handler(Request $request)
    {
        $pos = strpos($request->origin, $request->server["HTTP_HOST"]);
        if ($pos !== 7 || $pos !== 8) {
            return [
                "status" => 500,
                "data" => "Cannot login through facebook from outside site"
            ];
        }
    }
}