module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: 5080,
					base: '',
					hostname: 'localhost',
					livereload: 9000
				}
			}
		},

		watch: {
			options: {
				livereload: {port: 9000}
			},
			css:{
				files: 'www/css/**/*.css'
			},
			js:{
				files: 'www/js/**/*.js'
			},
			html:{
				files: 'www/**/*.html'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['connect', 'watch']);
};