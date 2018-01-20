(function() {
    'use strict';

    angular.module('LV').controller('categoriaEditCtrl', categoriaEditController);

    categoriaEditController.$inject = ['$routeParams', '$location', 'categoriaFactory', 'message'];

    function categoriaEditController($routeParams, $location, categoriaFactory, message) {
        var vm = this;

        vm.categoria = {
            id: 0,
            descricao: ''
        };

        vm.atualizar = atualizar;

        initialization();

        function initialization() {
            obterCategoria($routeParams.categoriaId);
        }

        function obterCategoria(categoriaId) {
            categoriaFactory.obterPorId(categoriaId)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                vm.categoria = response.data.dados;
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processar a requisição: ' + message.getMessage(response), 'Loja Virtual');
            }
        }

        function atualizar() {
            categoriaFactory.atualizar(vm.categoria)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                $location.path('/categoria/list');
                toastr.success(message.getMessage(response));
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processar a requisição: ' + message.getMessage(response), 'Loja Virtual');
            }
        }      
    }
})();