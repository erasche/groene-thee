/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(9);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var app = angular.module('app', ['ng-admin']);
	
	// custom API flavor
	var apiFlavor = __webpack_require__(2);
	app.config(['RestangularProvider', apiFlavor.requestInterceptor]);
	app.config(['RestangularProvider', apiFlavor.responseInterceptor]);
	
	app.config(function (RestangularProvider, $httpProvider) {
	    $httpProvider.interceptors.push(function () {
	        return {
	            request: function request(config) {
	                var pattern = /\/(\d+)$/;
	                var table = /\/([a-z]+)\//;
	                var idTable = {
	                    "organism": "organism_id",
	                    "feature": "feature_id",
	                    "dbxref": "dbxref_id",
	                    "db": "db_id",
	                    "cvterm": "cvterm_id"
	                };
	                if (pattern.test(config.url)) {
	                    config.params = config.params || {};
	                    var identifierField = idTable[table.exec(config.url)[1]];
	                    config.params[identifierField] = 'eq.' + pattern.exec(config.url)[1];
	                    config.url = config.url.replace(pattern, '');
	                }
	                return config;
	            }
	        };
	    });
	});
	
	// custom controllers
	app.controller('username', ['$scope', '$window', function ($scope, $window) {
	    // used in header.html
	    $scope.username = $window.localStorage.getItem('chado_login');
	}]);
	
	app.config(['NgAdminConfigurationProvider', function (nga) {
	    // create the admin application
	    var admin = nga.application('Chado').baseApiUrl('http://localhost:8300/');
	
	    // add entities
	    admin.addEntity(nga.entity('organism').identifier(nga.field('organism_id')));
	    admin.addEntity(nga.entity('feature').identifier(nga.field('feature_id')));
	    admin.addEntity(nga.entity('dbxref').identifier(nga.field('dbxref_id')));
	    admin.addEntity(nga.entity('db').identifier(nga.field('db_id')));
	    admin.addEntity(nga.entity('cvterm').identifier(nga.field('cvterm_id')));
	
	    // configure entities
	    __webpack_require__(3)(nga, admin);
	    __webpack_require__(4)(nga, admin);
	    __webpack_require__(5)(nga, admin);
	    __webpack_require__(6)(nga, admin);
	    __webpack_require__(7)(nga, admin);
	    //require('./feature/config')(nga, admin);
	    //require('./dbxref/config')(nga, admin);
	    //require('./db/config')(nga, admin);
	    //require('./cvterm/config')(nga, admin);
	
	    //admin.dashboard(require('./dashboard/config')(nga, admin));
	    admin.header(__webpack_require__(8));
	    //admin.menu(require('./menu')(nga, admin));
	
	    // attach the admin application to the DOM and execute it
	    nga.configure(admin);
	}]);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function requestInterceptor(RestangularProvider) {
	    RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
	        headers = headers || {};
	        headers['Prefer'] = 'return=representation';
	
	        if (operation === 'getList') {
	            headers['Range-Unit'] = what;
	            headers['Range'] = (params._page - 1) * params._perPage + '-' + (params._page * params._perPage - 1);
	            delete params._page;
	            delete params._perPage;
	
	            if (params._sortField) {
	                if (params._sortField !== 'id') {
	                    params.order = params._sortField + '.' + params._sortDir.toLowerCase();
	                }
	                delete params._sortDir;
	                delete params._sortField;
	            }
	        }
	    });
	}
	
	function responseInterceptor(RestangularProvider) {
	    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
	        switch (operation) {
	            case 'get':
	                return data[0];
	            case 'getList':
	                response.totalCount = response.headers('Content-Range').split('/')[1];
	                break;
	        }
	
	        return data;
	    });
	}
	
	exports['default'] = { requestInterceptor: requestInterceptor, responseInterceptor: responseInterceptor };
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	exports['default'] = function (nga, admin) {
	    var organism = admin.getEntity('organism');
	    var fields = [nga.field('abbreviation').isDetailLink(true), nga.field('genus'), nga.field('species'), nga.field('common_name'), nga.field('comment')];
	
	    organism.listView().fields(fields).listActions(['edit', 'show']);
	
	    organism.editionView().fields(fields);
	
	    organism.creationView().fields(fields);
	
	    return organism;
	};
	
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	exports['default'] = function (nga, admin) {
	    var feature = admin.getEntity('feature'),
	        cvterm = admin.getEntity('cvterm'),
	        dbxref = admin.getEntity('dbxref'),
	        organism = admin.getEntity('organism');
	
	    var fields = [nga.field('name').isDetailLink(true), nga.field('uniquename'), nga.field('type_id', 'reference').targetEntity(cvterm).targetField(nga.field('name')).label('Cvterm'), nga.field('dbxref_id', 'reference').targetEntity(dbxref).targetField(nga.field('description')).label('Dbxref'), nga.field('organism_id', 'reference').targetEntity(organism).targetField(nga.field('common_name')).label('Organism'), nga.field('is_analysis', 'boolean'), nga.field('is_osbolete', 'boolean')];
	
	    feature.listView().fields(fields).listActions(['edit', 'show']);
	
	    feature.editionView().fields(fields);
	
	    return feature;
	};
	
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	exports['default'] = function (nga, admin) {
	    var dbxref = admin.getEntity('dbxref'),
	        db = admin.getEntity('db');
	
	    var fields = [nga.field('db_id', 'reference').targetEntity(db).targetField(nga.field('name')).label('DB'), nga.field('accession').isDetailLink(true), nga.field('version'), nga.field('description', 'text')];
	
	    dbxref.listView().fields(fields).listActions(['show']);
	
	    dbxref.editionView().fields(fields);
	
	    return dbxref;
	};
	
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	exports['default'] = function (nga, admin) {
	    var db = admin.getEntity('db');
	
	    var fields = [nga.field('db_id'), nga.field('name'), nga.field('description'), nga.field('url_prefix'), nga.field('url')];
	
	    db.listView().fields(fields).listActions(['show']);
	
	    db.editionView().fields(fields);
	
	    return db;
	};
	
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	exports['default'] = function (nga, admin) {
	    var cvterm = admin.getEntity('cvterm'),
	        dbxref = admin.getEntity('dbxref');
	
	    var fields = [nga.field('name').isDetailLink(true), nga.field('definition', 'text'), nga.field('dbxref_id', 'reference').targetEntity(dbxref).targetField(nga.field('description')).label('Dbxref'), nga.field('is_relationshiptype', 'boolean'), nga.field('is_osbolete', 'boolean')];
	
	    cvterm.listView().fields(fields).listActions(['show']);
	
	    cvterm.editionView().fields(fields);
	
	    return cvterm;
	};
	
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=\"navbar-header\">\n    <button type=\"button\" class=\"navbar-toggle\" ng-click=\"isCollapsed = !isCollapsed\">\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n    </button>\n    <a class=\"navbar-brand\" href=\"#\" ng-click=\"appController.displayHome()\">Chado Admin</a>\n</div>\n<ul class=\"nav navbar-top-links navbar-right hidden-xs\">\n    <li>\n        <a href=\"https://github.com/erasche/chado-angular-admin\">\n            <i class=\"fa fa-github fa-lg\"></i>&nbsp;Source\n        </a>\n    </li>\n    <li dropdown>\n        <a dropdown-toggle href=\"#\" aria-expanded=\"true\" ng-controller=\"username\">\n            <i class=\"fa fa-user fa-lg\"></i>&nbsp;{{ username }}&nbsp;<i class=\"fa fa-caret-down\"></i>\n        </a>\n        <ul class=\"dropdown-menu dropdown-user\" role=\"menu\">\n            <li><a href=\"#\" onclick=\"logout()\"><i class=\"fa fa-sign-out fa-fw\"></i> Logout</a></li>\n        </ul>\n    </li>\n</ul>\n";

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map