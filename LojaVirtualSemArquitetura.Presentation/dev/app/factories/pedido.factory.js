(function() {
    'use strict';

    angular.module('LV').factory('pedidoFactory', pedidoFactory);

    pedidoFactory.$inject = ['$http','settings'];

    function pedidoFactory($http, settings) {
        return {
            listar: listar,
            finalizar: finalizar
        };

        function listar(usuarioId) {
            return $http.get(settings.constServiceUrl + 'api/v1/pedido/usuario/' + usuarioId);
        }

        function finalizar(pedido) {
            return $http.post(settings.constServiceUrl + 'api/v1/pedido', pedido);
        }
    }
})();