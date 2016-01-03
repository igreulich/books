'use strict';

var gulp       = require('gulp');
var gutil      = require('gulp-util');
var notify     = require('gulp-notify');
var concat     = require('gulp-concat');
var minifyCSS  = require('gulp-minify-css');
var less       = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var deploy     = require('gulp-gh-pages');

gulp.task('server', function() {
  var browserSync = require('browser-sync');
  var reload      = browserSync.reload;

  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch([
    '*.html',
    'scripts/modules.js/',
    'scripts/app.js',
    'stylesheets/vendor.css',
    'stylesheets/app.css'
  ], {cwd: 'app'}, reload);
});

gulp.task('react', function(callback) {
  var webpack       = require('webpack');
  var fs            = require('fs');
  var path          = require('path');
  var prettyBytes   = require('pretty-bytes');
  var gzipSize      = require('gzip-size');
  var webpackConfig = require('./webpack.config.js');

  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  );

  webpack(webpackConfig, function(error, stats) {
    if (error) {
      throw new gutil.PluginError('webpack', err);
    }

    stats = stats.toString();

    // Remove dropping unused statements and individual modules built
    var tester = /Dropping unused(.*?)\n|\n(.*?)\[built\]/g;
    stats = stats.replace(tester, '');
    gutil.log('[webpack]', stats);

    // Iterate through all of the output files and print their gzipped sizes
    fs.readdir(path.resolve(__dirname, './app/scripts/'), function(err, files) {
      var filesLength = files.length;

      gutil.log('gzipped file sizes:');

      files.forEach(function(file) {
        if (file.indexOf('.js') !== -1 && file.indexOf('.js') + 3 === file.length) {
          gutil.log(file + ': ' + prettyBytes(
            gzipSize.sync(fs.readFileSync(path.resolve(__dirname, './app/scripts/', file)))
          ));
        }
      });

      gutil.log('[webpack]', new Date());
      callback();
    });
  });
});

gulp.task('react:watch', function() {
  var webpack       = require('webpack');
  var webpackConfig = require('./webpack.config.js');

  webpackConfig.devtool = 'source-map';
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  );

  var compiler = webpack(webpackConfig);

  compiler.watch(200, function(err, stats) {
    if(err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({}));
    gutil.log('[webpack]', new Date());
    gutil.log('THIS IS FOR DEVELOPMENT ONLY.');
    gutil.log('PLEASE BUILD NORMALLY BEFORE COMMITTING.');
  });
});

gulp.task('build:vendor:styles', function() {
  gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.css'
  ])
  .pipe(concat('vendor.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('app/stylesheets'))
  .pipe(notify({title: 'Gulp Build', message: 'Finished building vendor css'}));
});

gulp.task('build:styles', function() {
  var path = require('path');

  gulp.src([
    'app/stylesheets/less/**/*.less'
  ])
  .pipe(less({
    paths: [path.join(__dirname, 'less', 'includes')]
  }))
  .pipe(concat('app.css'))
  .pipe(autoprefix('last 2 versions'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('app/stylesheets'))
  .pipe(notify({title: 'Gulp Build', message: 'Finished building app css'}));
});

gulp.task('build:fonts', function() {
  gulp.src([
    './node_modules/bootstrap/dist/fonts/*.*'
  ])
  .pipe(gulp.dest('app/fonts'))
  .pipe(notify({title: 'Gulp Build', message: 'Finished building fonts'}));
});

gulp.task('deploy', ['build'], function() {
  gulp.src('./app/**/*')
  .pipe(deploy())
  .pipe(notify({title: 'Gulp Deploy', message: 'Deployed to Github Pages.'}));
});

gulp.task('dev', ['build:vendor:styles', 'build:fonts', 'build:styles', 'react:watch']);
gulp.task('build', ['build:vendor:styles', 'build:fonts', 'build:styles', 'react']);
