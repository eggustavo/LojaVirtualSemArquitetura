(function(){
    'use strict';

    angular.module('LV').controller('usuarioCreateCtrl', usuarioCreateController);

    usuarioCreateController.$inject = ['$location', 'usuarioFactory', 'cepFactory', 'message'];

    function usuarioCreateController($location, usuarioFactory, cepFactory, message) {
        var vm = this;

        vm.usuario = {            
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            municipio: '',
            uf: ''
        };

        vm.adicionar = adicionar;
        vm.pesquisarCep = pesquisarCep;

        function adicionar() {
            usuarioFactory.adicionar(vm.usuario)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                $location.path('/login');
                toastr.success(message.getMessage(response), 'Loja Virtual');
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processar a requisição: ' + message.getMessage(response), 'Loja Virtual');
            }
        }

        function pesquisarCep() {
            if (vm.usuario.cep === null)
            {
                return;
            }

            cepFactory.pesquisar(vm.usuario.cep)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                vm.usuario.logradouro = response.data.logradouro;
                vm.usuario.complemento = response.data.complemento;
                vm.usuario.bairro = response.data.bairro;
                vm.usuario.municipio = response.data.localidade;
                vm.usuario.uf = response.data.uf;
            }

            function errorCallback(response) {
                toastr.error('Ocorreu um erro ao processar a requisição: ' + message.getMessage(response), 'Loja Virtual');
            }
        }
    }
})();