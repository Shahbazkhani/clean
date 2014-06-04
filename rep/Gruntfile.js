'use strict';
module.exports = function(grunt) {
 
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
    grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json')
 
        // watch for changes and trigger compass, jshint, uglify and livereload
        watch: {
            options: {
                livereload: true,
            },
            compass: {
                files: ['library/**/*.{scss,sass}'],
                tasks: ['compass']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            },
            livereload: {
                files: ['*.html', '*.php', 'library/images/**/*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },
 
        // compass and scss
        compass: {
        	dev:{
        		options:{
        			require: 'susy',
        			sassDir: 'library/sccs'
        			cssDir:'library/css'

        		}

        	},
            dist: {
                options: {
                	require: 'susy',
                	sassDir: 'library/sccs'
                	cssDir: 'library/css'
                	outputStyle: 'compresed'

                }
            }
        },
 
        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'library/js/*.js'
            ]
        },
 
        // uglify to concat, minify, and make source maps
        uglify: {
  options: {
    // the banner is inserted at the top of the output
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  },
  dist: {
    files: {
      'library/js/scripts.min.js': ['library/js/scripts.js']
    }
  }
},
 
        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'library/images/',
                    src: '**/*',
                    dest: 'library/imagemin/images/'
                }]
            }
        }
 
        // deploy via rsync
        /*
        deploy: {
            staging: {
                src: "./",
                dest: "~/path/to/theme",
                host: "user@host.com",
                recursive: true,
                syncDest: true,
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc']
            },
            production: {
                src: "./",
                dest: "~/path/to/theme",
                host: "user@host.com",
                recursive: true,
                syncDest: true,
                exclude: '<%= rsync.staging.exclude %>'
            }
        }
        */
 
    });

 
    // rename tasks
   // grunt.renameTask('rsync', 'deploy');
 
    // register task
    grunt.registerTask('default', ['watch']);
 
};