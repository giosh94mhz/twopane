'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*\n' +
            ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
            ' * <%= pkg.description %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' *\n' +
            ' * Copyright (C) 2015  <%= pkg.author.name %>\n' +
            ' * Licensed under <%= pkg.license %> License\n' +
            ' * See LICENSE file for the full copyright notice.\n' +
            ' */\n'
        },
        update_json: {
            options: {
                src: 'package.json',
                indent: '\t'
            },
            bower: {
                src: 'package.json',
                dest: 'bower.json',
                fields: {
                    name: null,
                    version: null,
                    description: null,
                    repository: null,
                    keywords: null,
                    license: null
                }
            }
        },
        // Task configuration.
        clean: {
            files: ['dist']
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/<%= pkg.name %>.jqueryui.js'],
                dest: 'dist/<%= pkg.name %>.jqueryui.js'
            },
            css: {
                src: ['src/<%= pkg.name %>.jqueryui.css'],
                dest: 'dist/<%= pkg.name %>.jqueryui.css'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.jqueryui.min.js'
            },
        },
        cssmin: {
            dist: {
                files: {
                    'dist/<%= pkg.name %>.jqueryui.min.css': '<%= concat.css.dest %>'
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            options: {
                jshintrc: true
            },
            gruntfile: ['Gruntfile.js'],
            src: ['src/**/*.js'],
            test: ['test/**/*.js', '!test/libs/**'],
        },
        watch: {
            startup: {
                files: [],
                tasks: ['connect:base'],
                options: {
                    atBegin: true,
                    spawn: false,
                }
            },
            gruntfile: {
                files: '<%= jshint.gruntfile %>',
                tasks: ['jshint:gruntfile']
            },
            css: {
                files: ['<%= concat.css.src %>'],
                tasks: ['build:css'],
                options: { livereload: true }
            },
            src: {
                files: ['<%= jshint.src %>', '<%= concat.css.src %>'],
                tasks: ['default'],
                options: { livereload: true }
            },
            test: {
                files: '<%= jshint.test %>',
                tasks: ['jshint:test', 'qunit']
            },
        },
        connect: {
            base: {
                options: {
                    port: 8000,
                    livereload: true
                }
            },
            keepalive: {
                options: {
                    port: 8000,
                    livereload: true,
                    keepalive: true,
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-update-json');

    // Tasks
    grunt.registerTask('server', 'connect:keepalive');
    grunt.registerTask('build:css', ['concat:css', 'cssmin']);
    grunt.registerTask('build:js', ['concat:css', 'cssmin']);
    grunt.registerTask('build', ['clean', 'concat', 'uglify', 'cssmin']);

    grunt.registerTask('default', ['update_json', 'jshint', 'qunit', 'build']);
};
