(function() {
    'use strict';

    angular.module('LV').controller('produtoViewCtrl', produtoViewController);

    produtoViewController.$inject = ['$routeParams', 'produtoFactory', 'message'];

    function produtoViewController($routeParams, produtoFactory, message) {
        var vm = this;

        vm.produto = {};

        initialization();

        function initialization() {
            obterproduto($routeParams.produtoId);
        }

        function obterproduto(produtoId) {
            produtoFactory.obterPorId(produtoId)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                vm.produto = response.data.dados;
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processar a requisição: ' + message.getMessage(response), 'Loja Virtual');
            }
        }     
    }
})();