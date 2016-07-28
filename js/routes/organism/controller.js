export default function(app, config, ChadoBackend){
    app.controller('OrganismCtrl', ['$scope', 'ChadoBackend', function($scope, ChadoBackend) {
        ChadoBackend.all('organism').getList().then(function(data) {
            $scope.data  = data;
        });
    }]);
    app.controller('OrganismDetailCtrl', function($scope, ChadoBackend, $routeParams, $sce) {
        ChadoBackend.all('organism').getList({organism_id: 'eq.' + $routeParams.id}).then(function(data) {
            $scope.data  = data[0];

            $scope.jbrowseDataUrl = config.jbrowse.api + "/link/" + data[0].common_name;
            $scope.jbrowseServer = config.jbrowse.server;
            $scope.url = $sce.trustAsResourceUrl(config.jbrowse.server + "/?data=" + encodeURIComponent($scope.jbrowseDataUrl));
            //
            // Ensure parent loads first.
            ChadoBackend.all('').customGETLIST('feature?organism_id=eq.' + $routeParams.id + '&select=*,dbxref:type_id{*},featureloc:feature_id{*}').then(function(data2) {
                console.log(data2);
                $scope.features  = data2;
            });
        });
    });
}
