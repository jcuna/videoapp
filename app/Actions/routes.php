<?php
/**
 * Created By: Jon Garcia
 * Date: 1/16/16
 * Routes file.
 */

/**
 |--------------------------------------------
 | routes.php
 |--------------------------------------------
 | Declare your routes here. Look at the various working examples here.
 | Feel free to modify it as you build your application.
 */
namespace App\Core\Http\Routing {

    use \App\Core\Http\View;
    use App\Core\Request;
    use App\Models\Format;
    use App\Models\Movie;
    use App\Models\User;
    use \App\Services\IsAuthenticated;

    Router::group(["prefix" => "api/v1"], function () {

        Router::get("is-logged-in", function (Request $request) {
            if ($request->session->get("user_logged_in")) {
                return ["data" => $request->session->all(), "status" => 200];
            } elseif (Request::hasCookie("login_cookie")) {
                $user = new User();
                $user->loginWithCookie();
            }
            return [
                "data" => $request->session->all(),
                "status" => 200
            ];
        });

        Router::get("movie-formats", function () {
            return [
                "status" => 200,
                "data" => (new Format())->all()->toArray()
            ];
        });

        Router::get("all-movies", function (Request $request) {

            $direction = "ASC";
            if ($request->has("direction")) {
                $direction = $request->get("direction");
            }
            $order = "{$request->get("sortBy")} {$direction}";
            $movies = (new Movie())->order($order);
            if ($request->has("limit")) {
                $movies->limit($request->get("limit"));
            }
            return [
                "status" => 200,
                "data" => $movies->get()->toArray()
            ];
        });

        Router::get('get-movie/{id}', 'Movies@getMovie');

        Router::post('api-login', 'Users@apiLogin');

        /** We can only allow people to log through facebook when coming from same origin url */
        //Router::group(["before" => IsSameOrigin::class], function () {
        Router::post('fb-login', 'Users@apiFBLogin');
        //});

        Router::group(["before" => IsAuthenticated::class], function () {
            Router::put('api-logout', 'Users@apiLogout');
            Router::post('new-movie', 'Movies@newMovie');
            Router::post('update-movie/{id}', 'Movies@updateMovie');
            Router::post('delete-movie/{id}', 'Movies@deleteMovie');
        });


        //These are backend generated views
        Router::all('login', 'Users@login', ['via' => 'login_path']);

        Router::group(["before" => IsAuthenticated::class], function () {
            Router::get('/', 'Home@index');
            Router::get('users/logout', 'Users@logout');
            Router::all('users/create', 'Users@create');
            Router::all('users', 'Users@index');
            Router::get('users/all', 'Users@allUsers');
            Router::get('users/{username}', 'Users@index');
            Router::post('users/login', 'Users@login');
            Router::all('users/deleteCurrentUser', 'Users@deleteCurrentUser');
        });

        Router::group(["before" => IsAuthenticated::class], function () {
            // Example declaring multiple actions for a controller.
            // This is also a useful admin menu that gives you info about the system and allows you to create the first user
            Router::resources('admin', 'Admin',
                [
                    ['get' =>
                        ['index', 'showRoutes', 'logs', 'info', 'statusReport', 'memcachedStats', 'firstUser']
                    ],
                    ['post' =>
                        ['index', 'firstUser']
                    ]
                ]
            );
        });

        //When a page is missing.
        Router::missing(function () {
            return View::render('errors/error', "The requested page doesn't exist", 404);
        });
    });
}