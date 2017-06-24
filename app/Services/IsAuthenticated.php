<?php
/**
 * Author: Jon Garcia.
 * Date: 3/9/17
 * Time: 11:38 PM
 */

namespace App\Services;


use App\Controllers\AdminController;
use App\Core\Exceptions\ViewException;
use App\Core\Request;
use App\Core\Interfaces\Advises\BeforeAdvise;
use App\Core\Http\View;

class IsAuthenticated implements BeforeAdvise
{
    public function handler(Request $request)
    {
        if (! $request->session->get("user_logged_in")) {
            return [
                "status" => 403,
                "data" => "No valid session"
            ];
        }
    }

    public function beforeHomeIndex(Request $request)
    {

    }

}