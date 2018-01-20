(function() {
    'use strict';

    angular.module('LV').controller('loginCtrl', loginController);

    loginController.$inject = ['$rootScope', '$location', 'loginFactory', 'settings', 'message'];

    function loginController($rootScope, $location, loginFactory, settings, message) {
        var vm = this;

        vm.usuario = {
            email: '',
            senha: ''
        };

        vm.submit = submit;

        function submit() {
            loginFactory.autenticar(vm.usuario)
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(response) {
                $rootScope.usuario = response.data.dados;

                //Gravando dados do login na sessão do navegador, cada aba aberta é uma sessão diferente
                sessionStorage.setItem(settings.constUsuario, JSON.stringify($rootScope.usuario));

                $location.path('/');
            }

            function errorCallback(response) {
                $rootScope.usuario = null;
                sessionStorage.removeItem(settings.constUsuario);
                toastr.error('Ocorreu um erro ao processar a autenticação: ' + message.getMessage(response), 'Loja Virtual');
            }
        }
    }
})();