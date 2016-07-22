window._ = require('underscore');
require('angular');
require('angular-route');
require('restangular');
require('angular-resource');
require('angular-material');
require('angular-material-icons');
require('angular-aria');
//require('angular-gravatar');
require('angular-material-data-table');
require('angular-messages');
require('angular-animate');

var app = angular.module('app', [
    'ngRoute',
    'restangular',
    'ngMaterial',
    'ngMdIcons',
    //'ui.gravatar',
    'ngMessages',
    'ngAnimate',
    'md.data.table'
]);

// custom API flavor
var apiFlavor = require('./api_flavor');
var instanceConfig = require('../app.config');

app.config(['RestangularProvider', apiFlavor.requestInterceptor]);
app.config(['RestangularProvider', apiFlavor.responseInterceptor]);
app.factory('ChadoBackend', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(instanceConfig.postgrest.chado);
    });
}).factory('TripalBackend', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(instanceConfig.postgrest.tripal);
    });
});


app.config(function($httpProvider, $mdThemingProvider, $routeProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('light-green')
        .accentPalette('grey');

    require('./routes/home/config')($routeProvider);
    require('./routes/organism/config')($routeProvider);
});

require('./routes/home/controller')(app, instanceConfig);
require('./routes/organism/controller')(app, instanceConfig);
