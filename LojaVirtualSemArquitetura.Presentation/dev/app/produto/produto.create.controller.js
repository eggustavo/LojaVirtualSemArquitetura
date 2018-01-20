(function() {
    'use strict';

    angular.module('LV').controller('produtoCreateCtrl', produtoCreateController);

    produtoCreateController.$inject = ['$location', 'produtoFactory', 'categoriaFactory', 'message'];

    function produtoCreateController($location, produtoFactory, categoriaFactory, message) {
        var vm = this;

        vm.produto = {
            descricao: '',
            preco: 0,
            imagem: '',
            quantidadeEstoque: 0,
            categoriaId: null
        };

        vm.colecaoCategoria = [];

        vm.adicionar = adicionar;
        vm.setarImagem = setarImagem;

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

        function adicionar() {
            produtoFactory.adicionar(vm.produto)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                $location.path('/produto/list');
                toastr.success(message.getMessage(response), 'Loja Virtual');
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