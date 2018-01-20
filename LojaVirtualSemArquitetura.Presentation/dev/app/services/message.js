(function() {
    'use strict';

    angular.module('LV').service('message', message);

    message.$inject = [];

    function message() {
        this.getMessage = function(objeto) {
            if (objeto.data === null)
            {
                return '<br/> Erro não Catalogado ou Provedor de Dados não está acessível.';
            }

            if (objeto.status === 401) {
                return '<br/>' + objeto.status + " - A Autorização foi negada para esta requisição. <br/> Favor se autenticar ou verificar suas permissões junto ao Administrador.";
            } else {
                if (objeto.data.sucesso) {
                    return objeto.data.dados.mensagem;
                } else {
                    var msg = '<br/> <br/> ';
                    objeto.data.notificacoes.forEach(function(erro) {
                        msg += erro + '<br/>';
                    });
    
                    return msg;               
                }              
            }      
        };
    }
})();