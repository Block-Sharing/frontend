var
    gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync'),
    $ = require('gulp-load-plugins')({lazy: true});

var fs = require('fs'),
    path = require('path'),
    url = require('url');

// The default file if the file/path is not found
var defaultFile = "index.html"

// I had to resolve to the previous folder, because this task lives inside a ./tasks folder
// If that's not your case, just use `__dirname`
var folder = path.resolve(__dirname, "./public");

console.log(folder);

gulp.task('styles', function () {
    return gulp
        .src('./src/sass/**/*.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe($.cleanCss())
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('vendorScripts', function () {
    gulp.src('./src/js/vendor/**/*.js')
        .pipe(gulp.dest('public/js/vendor'));
});

gulp.task('templates', function () {
    gulp.src('./src/templates/**/*.hbs')
        .pipe(gulp.dest('public/templates'));
});


gulp.task('scripts', function () {
    return browserify("src/js/app.js")
        .transform("babelify", {
            global: true,
            presets: ["es2015"]
        })
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.reload({stream: true}));
});

// Optimizes the images that exists
gulp.task('images', function () {
    return gulp
        .src('src/images/**')
        .pipe($.changed('images'))
        .pipe($.imagemin({
            // Lossless conversion to progressive JPGs
            progressive: true,
            // Interlace GIFs for progressive rendering
            interlaced: true
        }))
        .pipe(gulp.dest('public/images'))
        .pipe($.size({title: 'images'}));
});

gulp.task('html', function () {
    return gulp
        .src('./src/**/*.html')
        .pipe(gulp.dest('public/'))
});

gulp.task('browser-sync', ['styles', 'scripts', 'templates'], function () {
    browserSync({
        server: {
            baseDir: "./public/",
            injectChanges: true,
            middleware: function(req, res, next) {
                var fileName = url.parse(req.url);
                fileName = fileName.href.split(fileName.search).join("");
                var fileExists = fs.existsSync(folder + fileName);
                if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                    req.url = "/" + defaultFile;
                }
                return next();
            }
        }
    });
});

gulp.task('deploy', function () {
    return gulp
        .src('./public/**/*')
        .pipe(ghPages());
});

gulp.task('watch', function () {
    // Watch .html files
    gulp.watch('src/**/*.hbs', ['templates', browserSync.reload]);

    gulp.watch('src/**/*.html', ['html', browserSync.reload]);
    gulp.watch("public/*.html").on('change', browserSync.reload);
    // Watch .sass files
    gulp.watch('src/sass/**/*.scss', ['styles', browserSync.reload]);
    // Watch .js files
    gulp.watch('src/js/*.js', ['scripts', browserSync.reload]);
    // Watch .js files
    gulp.watch('src/js/vendor/*', ['vendorScripts', browserSync.reload]);
    // Watch image files
    gulp.watch('src/images/**/*', ['images', browserSync.reload]);
});

gulp.task('default', function () {
    gulp.start(
        'styles',
        'vendorScripts',
        'scripts',
        'images',
        'templates',
        'html',
        'browser-sync',
        'watch'
    );
});
