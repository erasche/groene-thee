function requestInterceptor(RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
        headers = headers || {};
        headers['Prefer'] = 'return=representation';

        if (operation === 'getList') {
            headers['Range-Unit'] = what;
            headers['Range'] = ((params._page - 1) * params._perPage) + '-' + (params._page * params._perPage - 1);
            delete params._page;
            delete params._perPage;

            if (params._sortField) {
                if(params._sortField !== 'id'){
                    params.order = params._sortField + '.' + params._sortDir.toLowerCase();
                }
                delete params._sortDir;
                delete params._sortField;
            }
        }
    });
}

function responseInterceptor(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        switch (operation) {
            case 'get':
                return data[0];
            case 'getList':
                response.totalCount = response.headers('Content-Range') ? response.headers('Content-Range').split('/')[1] : '1';
                break;
        }

        return data;
    });
}

export default { requestInterceptor, responseInterceptor }
