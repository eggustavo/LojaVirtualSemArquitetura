(function() {
    'use strict';

    angular.module('LV').factory('loginFactory', loginFactory);

    loginFactory.$inject = ['$http', 'settings'];

    function loginFactory($http, settings) {
        return {
            autenticar: autenticar
        };

        function autenticar(usuario) {
            return $http.post(settings.constServiceUrl + 'api/v1/usuario/autenticar', usuario);
        }
    }
})();