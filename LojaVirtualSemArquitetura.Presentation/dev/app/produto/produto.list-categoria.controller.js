(function() {
    'use strict';

    angular.module('LV').controller('produtoListCategoriaCtrl', produtoListCategoriaCtrl);

    produtoListCategoriaCtrl.$inject = ['$rootScope', '$routeParams', 'produtoFactory', 'message', 'settings'];

    function produtoListCategoriaCtrl($rootScope, $routeParams, produtoFactory, message, settings) {
        var vm = this;

        vm.colecaoProduto = [];

        vm.adicionarAoCarrinho = adicionarAoCarrinho;

        initialization();

        function initialization() {
            listarProdutosPorCategoria($routeParams.categoriaId);
        }

        function listarProdutosPorCategoria(categoriaId) {
            produtoFactory.listarPorCategoria(categoriaId)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                vm.colecaoProduto = response.data.dados;
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processar a requisição: ' + message.getMessage(response), 'Loja Virtual');
            }
        }

        function adicionarAoCarrinho(produto) {
            produto.quantidade = 1;
            $rootScope.carrinho.push(produto);
            localStorage.setItem(settings.constCarrinho, angular.toJson($rootScope.carrinho));
            toastr.success('O item <strong>' + produto.descricao + '</strong> foi adicionado ao seu carrinho', 'Produto Adicionado');
        }        
    }
})();