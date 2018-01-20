(function() {
    'use strict';

    angular.module('LV').factory('categoriaFactory', categoriaFactory);

    categoriaFactory.$inject = ['$http', 'settings'];

    function categoriaFactory($http, settings) {
        return {
            listar: listar,
            obterPorId: obterPorId,
            adicionar: adicionar,
            atualizar: atualizar,
            remover: remover
        };

        function listar() {
            return $http.get(settings.constServiceUrl + 'api/v1/categoria');
        }

        function obterPorId(categoriaId) {
            return $http.get(settings.constServiceUrl + 'api/v1/categoria/' + categoriaId);
        }

        function adicionar(categoria) {
            return $http.post(settings.constServiceUrl + 'api/v1/categoria', categoria);
        }

        function atualizar(categoria) {
            return $http.put(settings.constServiceUrl + 'api/v1/categoria', categoria);
        }

        function remover(categoria) {
            return $http.delete(settings.constServiceUrl + 'api/v1/categoria/' + categoria.id);
        }
    }
})();