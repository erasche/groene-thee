var app = angular.module('app', ['ng-admin']);

// custom API flavor
var apiFlavor = require('./api_flavor');
app.config(['RestangularProvider', apiFlavor.requestInterceptor]);
app.config(['RestangularProvider', apiFlavor.responseInterceptor]);

app.config(function(RestangularProvider, $httpProvider) {
    $httpProvider.interceptors.push(function() {
        return {
            request: function(config) {
                var pattern = /\/(\d+)$/;
                var table = /\/([a-z]+)\//;
                var idTable = {
                    "organism": "organism_id",
                    "feature": "feature_id",
                    "dbxref": "dbxref_id",
                    "db": "db_id",
                    "cvterm": "cvterm_id",
                }
                if (pattern.test(config.url)) {
                    config.params = config.params || {};
                    var identifierField = idTable[table.exec(config.url)[1]];
                    config.params[identifierField] = 'eq.' + pattern.exec(config.url)[1];
                    config.url = config.url.replace(pattern, '');
                }
                return config;
            },
        };
    });
});

// custom controllers
app.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html
    $scope.username =  $window.localStorage.getItem('chado_login');
}])

app.config(['NgAdminConfigurationProvider', function (nga) {
    // create the admin application
    var admin = nga.application('Chado')
        .baseApiUrl('http://shed.hx42.org:8300/');

    // add entities
    admin.addEntity(nga.entity('organism').identifier(nga.field('organism_id')));
    admin.addEntity(nga.entity('feature').identifier(nga.field('feature_id')));
    admin.addEntity(nga.entity('dbxref' ).identifier(nga.field('dbxref_id')));
    admin.addEntity(nga.entity('db'     ).identifier(nga.field('db_id')));
    admin.addEntity(nga.entity('cvterm' ).identifier(nga.field('cvterm_id')));

    // configure entities
    require('./organism/config')(nga, admin);
    require('./feature/config')(nga, admin);
    require('./dbxref/config')(nga, admin);
    require('./db/config')(nga, admin);
    require('./cvterm/config')(nga, admin);
    //require('./feature/config')(nga, admin);
    //require('./dbxref/config')(nga, admin);
    //require('./db/config')(nga, admin);
    //require('./cvterm/config')(nga, admin);

    //admin.dashboard(require('./dashboard/config')(nga, admin));
    admin.header(require('./header.html'));
    //admin.menu(require('./menu')(nga, admin));

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);
