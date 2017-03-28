module.exports = function( grunt ){
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {                              // Task
		    dist: {                            // Target
		      options: {                       // Target options
		      	style: 'expanded'
		      },
		      files: {                         // Dictionary of files
		        './assets/src/css/main.css': './assets/src/sass/main.scss',       // 'destination': 'source'
		        './style.css' : './assets/src/sass/style.scss'
		    	}
			}
		},

		concat: {
			options:{
				separator:"\n /*** New File ***/ \n"
			},
			/* Added new JS here*/	
			js: { 
				src: [ 
				'./assets/src/js/wrapper/start.js',
				// './node_modules/bootstrap/dist/js/bootstrap.js',
				// './assets/src/js/nicescroll.3.6.8.min.js',
				'./assets/src/js/script.js',
				'./assets/src/js/wrapper/end.js'
				],
				dest: './assets/build/js/script.js'
			},
			/* Add CSS here*/
			css: {
				src: [ 
				// './node_modules/bootstrap/dist/css/bootstrap.css',
				'./node_modules/font-awesome/css/font-awesome.css',
				'./assets/src/css/*.css'
				],
				dest: './assets/build/css/main.css'
			}
		},

		uglify: {
			options: {
				report: 'gzip'
			},
			main: {
				src: ['./assets/build/js/script.js'],
				dest: './assets/build/js/script.min.js'
			}
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
				keepSpecialComments : 0
			},
			target: {
				files: [{
					expand: true,
					cwd: './assets/build/css/',
					src: ['*.css', '!*.min.css'],
					dest: './assets/build/css/',
					ext: '.min.css'
				}]
			}
		},

		copy: {
			main: {
		      files: [
			      { expand: true, cwd: './assets/src/images', src: '**', dest: './assets/build/img/', filter: 'isFile'},
			      { expand: true, flatten: true,  cwd: './node_modules/font-awesome/fonts', src: '**', dest: './assets/build/fonts/', filter: 'isFile'},
			      { expand: true, flatten: true,  cwd: './assets/src/fonts', src: '**', dest: './assets/build/fonts/', filter: 'isFile'},
		      ],
		  },
		},
		
		watch: {
			js : {
				files : ['./assets/src/js/*.js'],
				tasks : ['js']
				
			},
			css : {
				files : ['./assets/src/sass/**/*.scss'],
				tasks : ['css']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask( 'css', [ 'sass', 'concat', 'cssmin'] );
    grunt.registerTask( 'js', [ 'concat', 'uglify' ] );

    grunt.registerTask('default', ['sass', 'concat','uglify','cssmin', 'copy'] );
}