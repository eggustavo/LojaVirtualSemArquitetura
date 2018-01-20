(function() {
    'use strict';

    angular.module('LV').controller('pedidoListCtrl', pedidoListController);

    pedidoListController.$inject = ['$rootScope', 'pedidoFactory', 'message'];

    function pedidoListController($rootScope, pedidoFactory, message) {
        var vm = this;

        vm.colecaoPedido = [];
        //vm.detalharPedido = detalharPedido;

        initialization();

        function initialization() {
            listarPedidos();
        }

        function listarPedidos() {
            pedidoFactory.listar($rootScope.usuario.id)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                vm.colecaoPedido = response.data.dados;
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processar a requisição: ' + message.getMessage(response), 'Loja Virtual');
            }
        }
    }
})();