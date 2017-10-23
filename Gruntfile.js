module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    
    // Configurable paths
    var config = {
        testPath: 'test',
        distPath: 'dist',
        tmpPath: '.tmp',
        appRoot: 'src',
        staticRoot: 'src',
        sassPath: 'scss',
        cssPath: 'css',
        jsPath: 'js',
        imgPath: 'img'
    };
    
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

        // Project settings
        config: config,
        
        csscomb: {
            default: {
                options: {
                    config: 'csscomb.json'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.staticRoot %>/<%= config.sassPath %>/',
                    src: ['**/*.scss'],
                    dest: '<%= config.staticRoot %>/<%= config.sassPath %>/',
                    ext: '.scss'
                }]
            }
        },

		sass: {
			dist: {
				files: {
					'src/css/main.css' : 'src/<%= config.sassPath %>/main.scss'
				}
			}
		},

        concat: {
            css: {
                src: [
                    'src/css/*'
                ],
                dest: '<%= config.tmpPath %>/css/main.css'
            },
            js: {
                options: {
                    separator: ';\n',
                },
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'src/js/ablytics.js'
                    // 'src/js/analytics-experiments.js'
                ],
                dest: '<%= config.tmpPath %>/js/main.js'
            }
        },

        cssmin: {
            css: {
                src: '<%= config.tmpPath %>/css/main.css',
                dest: '<%= config.distPath %>/css/main.css'
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html',
                    'dist/thanks.html': 'src/thanks.html'
                }
            }
        },

        //compressing images
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.appRoot %>/img',
                    src: ['**/*.{png,jpg,gif,webp}'],
                    dest: '<%= config.distPath %>/img'
                }]
            }
        },

        uglify: {
            js: {
                files: {
                    '<%= config.distPath %>/js/main.js': ['<%= config.tmpPath %>/js/main.js']
                }
            }
        },

        // Combine all media queries
	    cmq: {
		    options: {
			    log: false
			},
			target: {
				files: {
					'src/css/main.css': ['src/css/main.css']
				}
			}
		},

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['csscomb', 'sass', 'cmq', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js']
            }
        },

        copy: {
            tests: {
                expand: true,
                cwd: 'src/',
                src: ['tests/**'],
                dest: 'dist/'
            }
        },

        clean: {
            folder: ['<%= config.tmpPath %>']
        }
	});

    grunt.registerTask('default', [
        'csscomb',
        'sass',
        'cmq',
        'concat:css',
        'cssmin:css',
        'concat:js',
        'imagemin',
        'uglify:js',
        'htmlmin',
        'copy:tests',
        'clean'
    ]);
}
