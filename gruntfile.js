//  grunt -target="index" : builds and watches
//  grunt -target="main" -env="package"
//  grunt -target="index" -env="demo" 
//  	- adds google analytics
//		- minifies all assets
// 		- uglifies all HTML codes



var olParser = require('./olParser');
var fs = require('fs');
var join = require('path').join;




module.exports = function(grunt) {

	// Display the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

	// Load multiple grunt tasks using globing patterns
    require('load-grunt-tasks')(grunt);

	var folderTarget=grunt.option('target')?grunt.option('target'):"main";
	var gruntDev = grunt.option('env')?grunt.option('env'):"dev";
	var includeRevTools=grunt.option('revtools');
	grunt.initConfig({
		
		target:folderTarget,
		//  clean the files
		clean: {
		  build: ['build/<%=target%>'],
		  custom_js:['build/<%=target%>/assets/js/custom.js']
		},

		jade: {
			compile: {
			  options: {
			    basedir: 'develop',
			    pretty: true,
			    target:folderTarget,
			    parser:olParser,
			    data: {
			    	gruntDev:gruntDev,
			    	includeRevTools:includeRevTools,
			    	env:gruntDev
			    },
			  },
			  files: [{
			    expand: true,
			    src: [ '**/*.jade', '!_*/**/*.jade' ],
			    cwd: "develop/<%=target%>/",
			    dest: 'build/<%=target%>/',
			    ext: '.html'
			  }]
			},
		},
		
		postcss: {
			options: {
				map: false,
				parser: require('postcss-scss'),
				processors: [
					
  					require('precss')(),
  					require("postcss-calc"),
					//require('cssnext')()
					//require('cssnano')() // uglify the result
				]
			},
			
			main_style:{
				dest:'build/<%=target%>/assets/css/styles.css',
				src:['develop/assets/css/styles.css'],
			},
			
			demo_style:{
				dest:'build/<%=target%>/assets/css/<%=target%>.css',
				src:['develop/assets/css/<%=target%>.css'],
			},

			skins:{
				files: [{
					expand: true,
					src: '*.css',
					dest: 'build/<%=target%>/assets/css/skins',
					cwd: 'develop/assets/css/skins'
				}]
			}


		},


		uglify: {
			dev:{
				files: {
					'build/<%=target%>/assets/js/vendors/vendors.js': ['develop/assets/js/vendors/*.js']
				}
			},
			package:{
				files: {
					'build/<%=target%>/assets/js/vendors/vendors.js': ['develop/assets/js/vendors/*.js']
				}
			},
			demo:{
				files: {
					'build/<%=target%>/assets/js/vendors/vendors.js': ['develop/assets/js/vendors/*.js'],
					'build/<%=target%>/assets/js/custom.js' : 'build/<%=target%>/assets/js/custom.js'

				}
			}
		},


		cssmin: {
			options: {
				keepSpecialComments: 0,
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			dev: {
				files: {
					'build/<%=target%>/assets/css/vendors/vendors.css': ['develop/assets/css/vendors/css/*.css'],
					'build/<%=target%>/assets/css/vendors/vendors-overwrites.css': ['develop/assets/css/vendors_overwrites/*.css'],
					'build/<%=target%>/assets/revolution/css/revolution-all.css': ['develop/assets/revolution/css/*.css']
				}
			},
			package: {
				files: {
					'build/<%=target%>/assets/css/vendors/vendors.css': ['develop/assets/css/vendors/css/*.css'],
					'build/<%=target%>/assets/css/vendors/vendors-overwrites.css': ['develop/assets/css/vendors_overwrites/*.css'],
					'build/<%=target%>/assets/revolution/css/revolution-all.css': ['develop/assets/revolution/css/*.css']
				}
			},
			demo: {
				files: {
					'build/<%=target%>/assets/css/vendors/vendors.css': ['develop/assets/css/vendors/css/*.css'],
					'build/<%=target%>/assets/css/vendors/vendors-overwrites.css': ['develop/assets/css/vendors_overwrites/*.css'],
					'build/<%=target%>/assets/revolution/css/revolution-all.css': ['develop/assets/revolution/css/*.css'],
					'build/<%=target%>/assets/css/<%=target%>.css' : ['build/<%=target%>/assets/css/<%=target%>.css'],
					'build/<%=target%>/assets/css/styles.css' : ['build/<%=target%>/assets/css/styles.css'],
				}
			}
		},



		copy: {

			custom_js:{

				files:[
			 		// copy custom.js file
			    	{expand: false, src: ['develop/assets/js/custom.js'], dest: 'build/<%=target%>/assets/js/custom.js', filter: 'isFile'},
			 	],
			},
			
			main: {
			 	
			    files: [			      

			    	//copy jQuery
			    	{expand: false, src: ['develop/assets/js/jquery.min.js'], dest: 'build/<%=target%>/assets/js/vendors/jquery.min.js', filter: 'isFile'},
			    	
			    	// copy php assets
			    	{expand: true, cwd:"develop/assets/php" ,src: ['**'], dest: 'build//<%=target%>/php'},

			    	// copy revolution assets
			    	{expand: true, cwd:"develop/assets/revolution" ,src: ['**'], dest: 'build/<%=target%>/assets/revolution'},

			    	// copy local assets
			    	{expand: true, cwd:"develop/<%=target%>/assets/" ,src: ['**'], dest: 'build/<%=target%>/assets/'},

			    	//copy local variables
			    	{expand: false, src: ['develop/<%=target%>/_partials/_variables-override.css'], dest: 'develop/assets/css/partials/_variables-override.css', filter: 'isFile'},
			    	
			    	// copy icons

			    	//{expand: false, src: ['develop/site/assets/css/vendors/ol-icons-reference.html'], dest: 'build/assets/css/vendors/ol-icons-reference.html', filter: 'isFile'},
			    	//{expand: false, src: ['develop/assets/css/vendors/ol-icons.css'], dest: 'build/<%=target%>/assets/css/vendors/ol-icons.css', filter: 'isFile'},
			    	{expand: true, cwd:"develop/assets/css/vendors/fonts/" ,src: ['**'], dest: 'build/<%=target%>/assets/css/fonts/'}
			    ] 
			 } 
		},


		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			demo: {
				files: [
					{
						expand: true,
						cwd: 'build/<%=target%>/',
						src: ['**/*.html'],
						dest: 'build/<%=target%>/'
					},
				],
			},
			dev: {
				
			},
			package:{
				
			}
		},

		watch: {
			options: { livereload: true },
			
			//copy custom js
			custom_js: {
				files:['develop/assets/js/custom.js'],
				tasks: ['clean:custom_js','copy:custom_js']
			},

			//copy files
			main_files:{
				files:[
					'develop/<%=target%>/assets/img/**',
					'develop/assets/css/vendors/ol-icons-reference.html',
					'develop/assets/css/vendors/ol-icons.css',
					'develop/assets/css/vendors/ol-icons/**ç'
				],
				tasks: ['copy']
			},

			// uglify js vendors 
			vendors_js: {
			 	files:['develop/assets/js/vendors/*.js'],
				tasks: ['uglify']
			},
			
			// uglify css vendors
			vendors_css: {
				files: ['develop/assets/css/vendors/*.css'],
				tasks: ['cssmin']
			},
			vendors_overwrites_css: {
				files: ['develop/assets/css/vendors_overwrites/*.css'],
				tasks: ['cssmin']
			},
			
			//jade
			jade: {
				files: ['develop/**/*.jade' ],
				tasks: ['jade:compile'],
				options: {
					event      : ['all'],
					atBegin    : false,
					spawn      : false,  //required for custom watch //Gilad
					onlyChanged: true //Custom @author Gilad peleg
				}
			},

			//custom css
			for_css:{
				files:["develop/**/*.css"],
				tasks:["postcss"]
			}
		}

	}); //initConfig

	grunt.option('target');
	var env = grunt.option('env') || 'dev';
	grunt.registerTask('default', ['clean','copy','postcss','jade','cssmin:' + env,'uglify:' + env ,'htmlmin:'+env,'watch']);







	var JadeInheritance = require('jade-inheritance');
	var fs=require('fs');
  	var changedFiles = [];
    	var path = require('path');
    
	grunt.event.on('watch', function (action, filepath, target) {
        var conf = {
            jadePathDepth  : 2,
            jadeTarget     : 'jade',
            jadePathToFiles: 'jade.compile.files',
            onlyChanged    : grunt.config('watch.jade.options.onlyChanged')
        };

        var onChange = grunt.util._.debounce(function () {

            //  get path of files,
            //  we can watch for action and only do this on change and not delete or add ...
            var files = grunt.util._.map(Object.keys(changedFiles), function (f) {
                return f.split(path.sep).slice(conf.jadePathDepth).join(path.sep);
            });


            var myfiles = grunt.util._.map(Object.keys(changedFiles), function (f) {
                return f;
            });

            //When an overrided file is changed we should fire the change event for the original file as well
            myfiles.forEach(function(file){
            	var pathArray=file.split(path.sep);
            	var targetIdx=pathArray.indexOf(folderTarget);
            	if (targetIdx>-1){
            		var rg= new RegExp("^_");
            		if (rg.test(pathArray[targetIdx+1])){
	            		pathArray.splice(targetIdx,1);
	            		var newPath='';
				        pathArray.forEach(function(entry) {
						   newPath=join(newPath,entry);
						});
						if (fs.existsSync(newPath)){
							myfiles.push(newPath);
						}
	            	}
            	}
            });

           
            // fetch the real config
            var tempConf = grunt.config(conf.jadePathToFiles);

            var dependantFiles = [];

            myfiles.forEach(function(filename) {
            			var pathReg='develop/@(_|'+folderTarget+')*';
				inheritance = new JadeInheritance(filename, pathReg, {basedir : "develop"});
				dependantFiles = dependantFiles.concat(inheritance.files);
			});

            var finalfiles = grunt.util._.map(dependantFiles, function (f) {
                return f.split(path.sep).slice(1).join(path.sep);
            });

            // change the file src
            tempConf[0].src = [finalfiles, '!_*/**/*.jade' ];
            //update config
            grunt.config(conf.jadePathToFiles, tempConf);
            
            // clean changed object
            changedFiles = [];
        }, 200);

        // modify currently only on jade
        if (conf.onlyChanged && target === conf.jadeTarget) {
            
            //grunt.log.subhead('[==JAFAR== ] - Faghat in ' + conf.jadeTarget + ' haa ke taghir kardo avaz kon !');
            changedFiles[filepath] = action;
            onChange();
        }

    });

	

	

} //exports