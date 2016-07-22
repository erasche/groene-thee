export default function ($routeProvider) {
    $routeProvider
    .when('/organism/:id', {
        templateUrl: 'partials/organism-detail.html',
        controller: 'OrganismDetailCtrl',
    })
    .when('/organism', {
        templateUrl: 'partials/organism.html',
        controller: 'OrganismCtrl',
    })
}
