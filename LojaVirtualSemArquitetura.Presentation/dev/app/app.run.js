(function() {
    'use strict';

    angular.module('LV').run(lojaVirtualRun);

    lojaVirtualRun.$inject = ['$rootScope', '$location', 'settings'];

    function lojaVirtualRun($rootScope, $location, settings) {
        //Recuperando dados do login da sessão do navegador, cada aba aberta é uma sessão diferente
        var usuario = sessionStorage.getItem(settings.constUsuario);
        var carrinho = localStorage.getItem(settings.constCarrinho);

        $rootScope.usuario = null;
        $rootScope.carrinho = [];      

        if (usuario) {
            $rootScope.usuario = JSON.parse(usuario);
        }

        if (carrinho) {
            var itemsCarrinho = angular.fromJson(carrinho);
            angular.forEach(itemsCarrinho, function (value, key) {
                $rootScope.carrinho.push(value);
            });           
        }

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (next.restrito && $rootScope.usuario === null) {
                $location.path("/login");              
            }
        });        
    }
})();