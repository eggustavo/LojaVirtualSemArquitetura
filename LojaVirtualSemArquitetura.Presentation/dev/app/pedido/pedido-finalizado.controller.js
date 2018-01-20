(function(){
    'use strict';

    angular.module('LV').controller('pedidoFinalizadoCtrl', pedidoFinalizadoController);

    pedidoFinalizadoController.$inject = ['$routeParams'];

    function pedidoFinalizadoController($routeParams) {
        var vm = this;

        vm.numeroPedido = null;

        inicialization();

        function inicialization() {
            vm.numeroPedido = $routeParams.numeroPedido;
        }
    }
})();