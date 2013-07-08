fs = require('fs');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    stylus: {
      compile: {
        files: {
          'lib/css/backbone-marionette-treeview.css': 'stylus/backbone-marionette-treeview.styl'
        }
      }
    },

    mince: {
      'dev': {
        include: ["js"],
        src: "main.js",
        dest: 'lib/js/backbone-marionette-treeview.js'
      }
    },

    watch: {
      css: {
        files: 'stylus/**/*.styl',
        tasks: ['stylus'],
        options: {
          debounceDelay: 250
        }
      },
      js: {
        files: ['js/**/*.js', '!lib/js/backbone-marionette-treeview.js', '!node_modules/**/*.js'],
        tasks: ['jshint', 'mince:dev'],
        options: {
          debounceDelay: 250
        }
      }
    },

    clean: {
      dev: ["lib/js/backbone-marionette-treeview.js", "lib/css/backbone-marionette-treeview.css"],
      dist: ["lib/js", "lib/css"]
    },

    cssmin: {
      compress: {
        files: {
          "lib/css/backbone-marionette-treeview.min.css": ["lib/css/backbone-marionette-treeview.css"]
        }
      }
    },

    uglify: {
      dev: {
        options: {
          banner: '/* Copyright (C) ' + new Date().getFullYear() +' Acquisio Inc. - <%= pkg.name %> - v<%= pkg.version %>\n\n' + fs.readFileSync('LICENSE') + '\n*/\n',
          compress: true
        },
        files: {
          'lib/js/backbone-marionette-treeview.min.js': ['lib/js/backbone-marionette-treeview.js']
        }
      }
    },

    jshint: {
      dev: {
        options: {
          '-W032': true,
          validthis: true,
          laxcomma : true,
          laxbreak : true,
          browser  : true,
          eqnull   : true,
          debug    : true,
          devel    : true,
          boss     : true,
          expr     : true,
          asi      : true,
          multistr : true
        },
        src: ['Gruntfile.js', 'lib/js/backbone-marionette-treeview.js']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mincer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default',  ['clean','stylus', 'mince', 'jshint', 'uglify']);
  grunt.registerTask('dev',  ['clean','stylus', 'mince', 'jshint', 'uglify', 'watch']);
};