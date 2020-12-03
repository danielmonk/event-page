module.exports = grunt => {
    grunt.initConfig({

        theme_path: 'wp-content/themes/event-page',

        // Compile any SCSS file that doesn't have the partial indicator _
        // By default just the style.scss file in the root of the sass dir
        // Can add any other scss files to the root to be compiled seperately also
        sass: {
            compiled: {
                options: {
                    style: 'minified'
                },
                files: [{
                    src: '[^_]*.scss',
                    cwd: '<%= theme_path %>/sass/',
                    dest: '<%= theme_path %>/compiled/css',
                    expand: true,
                    ext: '.css'
                }]
            }
        },

        // Copy media directory - add images to src/images to be compressed and copied to compiled
        copy: {
            media: {
                expand: true,
                cwd: '<%= theme_path %>/media/',
                src: ['**'],
                dest: '<%= theme_path %>/compiled/'
            },
            admin_scripts: {
                expand: true,
                cwd: '<%= theme_path %>/js/admin/',
                src: ['**'],
                dest: '<%= theme_path %>/compiled/js/'
            },
        },

        // Image compression - add images to src/images to be compressed and copied to compiled
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= theme_path %>/media/',
                    src: ['images/**/*.{png,jpg,gif}'],
                    dest: '<%= theme_path %>/compiled'
                }]
            }
        },

        // SVG compression - add SVG to src/images to be compressed and copied to compiled
        // Current issue of have to be top level in the images directory
        svgmin: {
            options: {
                plugins: []
            },
            compiled: {
                files: [{
                    expand: true,
                    cwd: '<%= theme_path %>/media/images',
                    src: '*.svg',
                    dest: '<%= theme_path %>/compiled/images',
                    ext: '.svg',
                    extDot: 'first'
                }]
            }
        },

        // CSS Minification - Run in production task only
        // Will compress any css file in the compiled/css directory that doesn't have .min.css in the name
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= theme_path %>/compiled/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= theme_path %>/compiled/css/min',
                    ext: '.css'
                }]
            }
        },

        // Browserify - Work the magic that turns our more modern ES2015+ JS into browser compatible ES5 JS
        browserify: {
            development: {
                src: [
                    "<%= theme_path %>/js/site.js"
                ],
                dest: '<%= theme_path %>/compiled/js/bundle.js',
                options: {
                    browserifyOptions: { debug: true },
                    transform: [
                        ["babelify", { "presets": ["es2015"] }]
                    ],
                    plugin: [
                        ["minifyify", { map: false }]
                    ],
                    watch: false,
                    keepAlive: false,
                }
            }
        },


        // Watch - Establish which files each task should be looking for changes in
        // If you add any additional directories you may have to update this
        watch: {
            sass: {
                files: ['<%= theme_path %>/sass/**/*.scss'],
                tasks: ['sass', 'cssmin']
            },
            js: {
                files: ['<%= theme_path %>/js/site.js', '<%= theme_path %>/js/vendor/*.js', '<%= theme_path %>/js/modules/*.js'],
                tasks: ['browserify:development']
            },
            standalone_js: {
                files: ['<%= theme_path %>/js/admin/**/*.js'],
                tasks: ['copy:admin_scripts']
            },
            imagemin: {
                files: ['<%= theme_path %>/media/images/**'],
                tasks: ['imagemin']
            },
            svgmin: {
                files: ['<%= theme_path %>/media/images/**'],
                tasks: ['svgmin']
            }
        }
    });

    // NPM Task loading
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-githooks');

    // Task Reigstration - default task is simply 'grunt'
    // At the moment the only difference between 'grunt' and 'grunt production' is:
    // - No browsersync/watch tasks
    grunt.registerTask('build', ['sass', 'cssmin', 'copy', 'imagemin', 'svgmin', 'browserify:development']);
    grunt.registerTask('default', ['sass', 'cssmin', 'copy', 'imagemin', 'svgmin', 'browserify:development', 'watch']);
}