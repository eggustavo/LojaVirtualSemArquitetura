(function() {
    'use strict';

    angular.module('LV').factory('usuarioFactory', usuarioFactory);

    usuarioFactory.$inject = ['$http','settings'];

    function usuarioFactory($http, settings) {
        return {
            adicionar: adicionar,
            trocarSenha: trocarSenha
        };

        function adicionar(usuario) {
            return $http.post(settings.constServiceUrl + 'api/v1/usuario', usuario);
        }

        function trocarSenha(usuario) {
            return $http.put(settings.constServiceUrl + 'api/v1/usuario/trocar-senha', usuario);
        }
    }
})();