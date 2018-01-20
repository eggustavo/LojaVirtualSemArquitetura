module.exports = function(grunt) {
    //Grunt config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //CSS
        cssmin: {
            target: {
                options: {
                    sourceMap: true
                },                
                files: {
                    '../dist/assets/css/lojavirtual-1.0.0.min.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/toastr/toastr.css',
                        'bower_components/animate.css/animate.css',
                        'assets/css/loja-virtual.css'
                    ]
                }
            }
        },

        //CONCAT
        concat: {
            plugins: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/toastr/toastr.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-locale-pt-br/angular-locale_pt-br.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-input-masks/angular-input-masks-dependencies.js',
                    'bower_components/angular-input-masks/angular-input-masks.js',
                    'bower_components/angular-input-masks/angular-input-masks.br.js',
                    'bower_components/angular-base64-upload/dist/angular-base64-upload.js',
                    'bower_components/angular-password/angular-password.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-touch/angular-touch.js',
                    'bower_components/angular-bootstrap/ui-bootstrap.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
                ],
                dest: 'assets/js/plugins.js',
            },
            appAngular: {
                src: [
                    'app/app.module.js',
                    'app/app.config.js',
                    'app/app.constant.js',
                    'app/app.run.js'
                ],
                dest: 'assets/js/appAngular.js',
            },
            appLojaVirtual: {
                src: [
                    'app/services/message.js',
                    'app/factories/login.factory.js',
                    'app/factories/usuario.factory.js',
                    'app/factories/categoria.factory.js',
                    'app/factories/produto.factory.js',
                    'app/factories/cep.factory.js',
                    'app/factories/pedido.factory.js',
                    'app/account/login.controller.js',
                    'app/account/logout.controller.js',
                    'app/account/trocar-senha.controller.js',
                    'app/usuario/usuario.create.controller.js',
                    'app/categoria/categoria.list.controller.js',
                    'app/categoria/categoria.create.controller.js',
                    'app/categoria/categoria.edit.controller.js',
                    'app/categoria/categoria.view.controller.js',
                    'app/produto/produto.list.controller.js',
                    'app/produto/produto.list-categoria.controller.js',
                    'app/produto/produto.create.controller.js',
                    'app/produto/produto.edit.controller.js',
                    'app/produto/produto.view.controller.js',
                    'app/carrinho/carrinho.controller.js',
                    'app/pedido/pedido-finalizado.controller.js',
                    'app/pedido/pedido-list.controller.js'
                ],
                dest: 'assets/js/appLojaVirtual.js'
            }
        },          

        //UGLIFY
        uglify: {
            options: {
                compress: true,
                sourceMap: true,
                //sourceMapName: '../dist/assets/js/lojavirtual-1.0.0.min.map',
                banner: '/*! <%= pkg.description %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */'
            },
            applib: {
                src: [
                    'assets/js/plugins.js',
                    'assets/js/appAngular.js',
                    'assets/js/appLojaVirtual.js'
                ],
                dest: '../dist/assets/js/lojavirtual-1.0.0.min.js'
            }
        },

        //COPY
        copy: {
            main: {
                files: [
                {
                    expand: true,
                    src: 'app/**/*.html',
                    dest: '../dist'
                },
                {
                    expand: true,
                    src: 'assets/images/*',
                    dest: '../dist'
                },
                {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/fonts/',
                    src: '*',
                    dest: '../dist/assets/fonts'
                },
                {
                    expand: true,
                    cwd: '.',
                    src: 'indexDist.html',
                    dest: '../dist',
                    rename: function(dest, src) {
                        return dest + '/index.html';
                    }
                }]
            }
        },
        
        //CLEAN
        clean: {
            folder_js: ['assets/js'],
            folder_dist: {
                options: {
                    force: true
                },
                src: ['../dist/**']
            }
        },
    });

    //Load Pluguins
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    //Taks
    grunt.registerTask('dist', [
        'clean:folder_dist',
        'cssmin',
        'concat',
        'uglify',
        'copy',
        'clean:folder_js'
    ]);
};