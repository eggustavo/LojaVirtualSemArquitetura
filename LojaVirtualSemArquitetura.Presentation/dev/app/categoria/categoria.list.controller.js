(function() {
    'use strict';

    angular.module('LV').controller('categoriaListCtrl', categoriaListController);

    categoriaListController.$inject = ['$rootScope', 'categoriaFactory', 'message'];

    function categoriaListController($rootScope, categoriaFactory, message) {
        var vm = this;

        vm.colecaoCategoria = [];
        vm.remover = remover;

        initialization();

        function initialization() {
            listarCategorias();
        }

        function listarCategorias() {
            categoriaFactory.listar()
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                vm.colecaoCategoria = response.data.dados;
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processar a requisição: ' + message.getMessage(response), 'Loja Virtual');
            }
        }

        function remover(categoria) {
            categoriaFactory.remover(categoria)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                var idx = vm.colecaoCategoria.indexOf(categoria);
                vm.colecaoCategoria.splice(idx, 1);
                toastr.info(message.getMessage(response));
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processo a requisição: ' + message.getMessage(response), 'Loja Virutal');
            }
        }
    }
})();