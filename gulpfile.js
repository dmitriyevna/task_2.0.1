var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
    nunjucksRender = require('gulp-nunjucks-render'),
    fm = require('front-matter'),
    data = require('gulp-data'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

var paths = {

	html: ['./src/templates/**/*.html'],
	js: ['./src/js/**/*.js'],
	sass: ['./src/sass/**/*.sass'],
	css: ['./src/css/**/*.css'],
	fonts: ['./src/fonts/**/*'],
	images: ['./src/img/**/*']

};

gulp.task('sass', function(){

	return gulp.src(paths.sass)
			.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(postcss([autoprefixer({ browsers: ["> 0%"] })]))
    		.pipe(gulp.dest('./src/css/'));

});

gulp.task('render-html', function(){

    return gulp.src('src/templates/*.html')
        .pipe(data(function(file) {
            var content = fm(String(file.contents));
            file.contents = new Buffer(content.body);
            return content.attributes;}))
        .pipe(nunjucksRender({
            path: 'src/templates/'
        }))
        .pipe(gulp.dest('src'));

});

gulp.task('imagemin', function() {

    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))

});

gulp.task('serve', function(){

    browserSync.init({
        server: {
            baseDir: './src'
        }
    });

    
    gulp.watch([paths.sass], ['sass']).on('change', browserSync.reload);
    gulp.watch([paths.html], ['render-html']).on('change', browserSync.reload);

});

gulp.task('default', ['render-html', 'sass','serve']);

gulp.task('clean', function(){

	return del.sync('./build');

})

gulp.task('build', ['clean', 'imagemin', 'sass'], function() {
    
	var buildCss = gulp.src(paths.css)
    .pipe(gulp.dest('build/css'));

    var buildFonts = gulp.src(paths.fonts)
    .pipe(gulp.dest('build/fonts'));

    var buildHtml = gulp.src('./src/*.html')
    .pipe(gulp.dest('build'));    

    var buildJS = gulp.src(paths.js)
    .pipe(gulp.dest('build/js'));

});