(function() {
    'use strict';

    angular.module('LV').controller('produtoEditCtrl', produtoEditController);

    produtoEditController.$inject = ['$routeParams', '$location', 'produtoFactory', 'categoriaFactory', 'message'];

    function produtoEditController($routeParams, $location, produtoFactory, categoriaFactory, message) {
        var vm = this;

        vm.produto = {
            id: 0,
            descricao: '',
            preco: 0,
            imagem: '',
            quantidadeEstoque: 0,
            categoriaId: null
        };

        vm.atualizar = atualizar;

        initialization();

        function initialization() {
            listarCategorias();
            obterProduto($routeParams.produtoId);
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

        function obterProduto(produtoId) {
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

        function atualizar() {
            produtoFactory.atualizar(vm.produto)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                $location.path('/produto/list');
                toastr.success(message.getMessage(response));
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processar a requisição: ' + message.getMessage(response), 'Loja Virtual');
            }
        }
        
        function setarImagem (e, reader, file, fileList, fileOjects, fileObj) {
            if (fileObj.filetype !== 'image/jpeg') {
                toastr.error('A imagem deve ser do tipo JPEG', 'Loja Virtual');                
            } else {
                vm.produto.imagem = fileObj.base64;
            }
        }         
    }
})();