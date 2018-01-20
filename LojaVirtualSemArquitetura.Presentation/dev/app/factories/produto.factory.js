(function() {
    'use strict';

    angular.module('LV').factory('produtoFactory', produtoFactory);

    produtoFactory.$inject = ['$http','settings'];

    function produtoFactory($http, settings) {
        return {
            listar: listar,
            listarPorCategoria: listarPorCategoria,
            obterPorId: obterPorId,
            adicionar: adicionar,
            atualizar: atualizar,
            remover: remover
        };

        function listar() {
            return $http.get(settings.constServiceUrl + 'api/v1/produto');
        }

        function listarPorCategoria(categoriaId) {
            return $http.get(settings.constServiceUrl + 'api/v1/produto/categoria/' + categoriaId);
        }

        function obterPorId(produtoId) {
            return $http.get(settings.constServiceUrl + 'api/v1/produto/' + produtoId);
        }

        function adicionar(produto) {
            return $http.post(settings.constServiceUrl + 'api/v1/produto', produto);
        }

        function atualizar(produto) {
            return $http.put(settings.constServiceUrl + 'api/v1/produto', produto);
        }

        function remover(produtoId) {
            return $http.delete(settings.constServiceUrl + 'api/v1/produto/' + produtoId);
        }
    }
})();