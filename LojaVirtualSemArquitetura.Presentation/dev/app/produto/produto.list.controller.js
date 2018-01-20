(function() {
    'use strict';

    angular.module('LV').controller('produtoListCtrl', produtoListController);

    produtoListController.$inject = ['produtoFactory', 'message'];

    function produtoListController(produtoFactory, message) {
        var vm = this;

        vm.colecaoProduto = [];
        vm.remover = remover;

        initialization();

        function initialization() {
            listarProdutos();
        }

        function listarProdutos() {
            produtoFactory.listar()
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                vm.colecaoProduto = response.data.dados;
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processar a requisição: ' + message.getMessage(response), 'Loja Virtual');
            }
        }

        function remover(produto) {
            produtoFactory.remover(produto.id)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                var idx = vm.colecaoProduto.indexOf(produto);
                vm.colecaoProduto.splice(idx, 1);
                toastr.info(message.getMessage(response));
            }

            function errorCallback(response) {
                console.log(response);
                toastr.error('Ocorreu um erro ao processo a requisição: ' + message.getMessage(response), 'Loja Virutal');
            }
        }
    }
})();