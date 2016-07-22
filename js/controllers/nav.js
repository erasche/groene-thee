export default function(app){
    app.controller('NavCtrl', ['$scope', function($scope) {
        $scope.hi = 'Hei';
        console.log($scope.hi);
    }]);
}
