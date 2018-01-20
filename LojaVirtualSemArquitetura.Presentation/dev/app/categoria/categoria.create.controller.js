(function() {
    'use strict';

    angular.module('LV').controller('categoriaCreateCtrl', categoriaCreateController);

    categoriaCreateController.$inject = ['$location', 'categoriaFactory', 'message'];

    function categoriaCreateController($location, categoriaFactory, message) {
        var vm = this;

        vm.categoria = {
            id: 0,
            descricao: ''
        };

        vm.adicionar = adicionar;

        function adicionar() {
            categoriaFactory.adicionar(vm.categoria)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                $location.path('/categoria/list');
                toastr.success(message.getMessage(response), 'Loja Virtual');
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processar a requisição: ' + message.getMessage(response), 'Loja Virtual');
            }
        }
    }
})();