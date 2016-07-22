export default function(app, config){
    app.controller('HomeCtrl', ['$scope', function($scope) {
        $scope.hi = 'Hei';
        $scope.config = config;
    }]);
}
