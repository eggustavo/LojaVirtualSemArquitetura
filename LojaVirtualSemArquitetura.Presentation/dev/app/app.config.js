(function() {
    'use strict';

    angular.module('LV').config(config);      
    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'app/home/home.html',
            restrito: false           
        })
        .when('/login', {
            templateUrl: 'app/account/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm',
            restrito: false
        })      
        .when('/logout', {
            templateUrl: 'app/home/home.html',
            controller: 'logoutCtrl',
            controllerAs: 'vm',
            restrito: false
        })
        .when('/trocar-senha', {
            templateUrl: 'app/account/trocar-senha.html',
            controller: 'trocarSenhaCtrl',
            controllerAs: 'vm',
            restrito: true
        })                     
        .when('/usuario/create', {
            templateUrl: 'app/usuario/usuario.create.html',
            controller: 'usuarioCreateCtrl',
            controllerAs: 'vm',
            restrito: false
        })           
        .when('/categoria/list', {
            templateUrl: 'app/categoria/categoria.list.html',
            controller: 'categoriaListCtrl',
            controllerAs: 'vm',
            restrito: true
        })
        .when('/categoria/view/:categoriaId', {
            templateUrl: 'app/categoria/categoria.view.html',
            controller: 'categoriaViewCtrl',
            controllerAs: 'vm',
            restrito: true
        })        
        .when('/categoria/create', {
            templateUrl: 'app/categoria/categoria.create.html',
            controller: 'categoriaCreateCtrl',
            controllerAs: 'vm',
            restrito: true
        })
        .when('/categoria/edit/:categoriaId', {
            templateUrl: 'app/categoria/categoria.edit.html',
            controller: 'categoriaEditCtrl',
            controllerAs: 'vm',
            restrito: true
        })
        .when('/produto/list', {
            templateUrl: 'app/produto/produto.list.html',
            controller: 'produtoListCtrl',
            controllerAs: 'vm',
            restrito: true
        })
        .when('/produto/list/categoria/:categoriaId', {
            templateUrl: 'app/produto/produto.list-categoria.html',
            controller: 'produtoListCategoriaCtrl',
            controllerAs: 'vm',
            restrito: false
        })        
        .when('/produto/view/:produtoId', {
            templateUrl: 'app/produto/produto.view.html',
            controller: 'produtoViewCtrl',
            controllerAs: 'vm',
            restrito: false
        })            
        .when('/produto/create', {
            templateUrl: 'app/produto/produto.create.html',
            controller: 'produtoCreateCtrl',
            controllerAs: 'vm',
            restrito: false
        })
        .when('/produto/edit/:produtoId', {
            templateUrl: 'app/produto/produto.edit.html',
            controller: 'produtoEditCtrl',
            controllerAs: 'vm',
            restrito: false
        })
        .when('/carrinho', {
            templateUrl: 'app/carrinho/carrinho.html',
            controller: 'carrinhoCtrl',
            controllerAs: 'vm',
            restrito: false
        })
        .when('/pedido-finalizado/:numeroPedido', {
            templateUrl: 'app/pedido/pedido-finalizado.html',
            controller: 'pedidoFinalizadoCtrl',
            controllerAs: 'vm',
            restrito: true
        }) 
        .when('/pedido/listar', {
            templateUrl: 'app/pedido/pedido-list.html',
            controller: 'pedidoListCtrl',
            controllerAs: 'vm',
            restrito: true
        }) 
        .otherwise({
            redirectTo: '/'
        });
    }
})();