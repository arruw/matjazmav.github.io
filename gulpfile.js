var gulp = require('gulp');

var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function() {
    return gulp.src([
            'app/assets/libs/font-awesome/**/font-awesome.css',
            'app/assets/libs/open-sans/**/open-sans.css',
            // 'app/assets/libs/icons8-win10/**/icons8-win10.css',
            'app/assets/libs/bootstrap/**/bootstrap.css',
            'app/assets/libs/myon/**/*.less',
            'app/assets/css/constants.less',
            'app/assets/css/*.less',
            'app/views/**/*.less'
        ])
        .pipe(concat('all.less'))
        .pipe(less())
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(cleanCss())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('fonts', function() {
    return gulp.src([
            'app/assets/libs/bootstrap/fonts/*.{otf,eot,svg,ttf,woff,woff2}',
            'app/assets/libs/font-awesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}',
            'app/assets/libs/open-sans/fonts/*.{otf,eot,svg,ttf,woff,woff2}',
            // 'app/assets/libs/icons8-win10/fonts/*.{otf,eot,svg,ttf,woff,woff2}',
        ])
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('scripts', function() {
    return gulp.src([
            'app/assets/libs/jquery/*.js',
            'app/assets/libs/angular/angular.js',
            'app/assets/libs/angular/angular-route.js',
            'app/assets/libs/jcs-auto-validate/jcs-auto-validate.js',
            'app/assets/libs/bootstrap/**/bootstrap.js',
            'app/assets/libs/bootstrap-notify/bootstrap-notify.js',
            'app/assets/libs/myon/*.js',
            'app/assets/js/*.js',
            'app/app.js',
            'app/views/**/*.js'
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['scripts']);
    gulp.watch('app/**/*.less', ['less']);
    gulp.watch('app/**/*.{eot,svg,ttf,woff}', ['fonts']);
});

gulp.task('default', ['less', 'fonts', 'scripts', 'watch']);