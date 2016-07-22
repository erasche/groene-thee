export default function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl',
    }).otherwise({
        redirectTo: '/'
    })
}
