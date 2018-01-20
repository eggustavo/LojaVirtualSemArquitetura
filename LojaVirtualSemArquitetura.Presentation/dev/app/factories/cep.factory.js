(function() {
    'use strict';

    angular.module('LV').factory('cepFactory', cepFactory);

    cepFactory.$inject = ['$http','settings'];

    function cepFactory($http, settings) {
        return {
            pesquisar: pesquisar
        };

        function pesquisar(cep) {
            return $http.get(settings.constServiceCep + cep + '/json');
        }
    }
})();