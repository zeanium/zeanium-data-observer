var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('uglify', function(){
	return gulp.src(['src/*.js'])
		.pipe(uglify())
		.pipe(gulp.dest('dist/minx'));
});

gulp.task('concat', gulp.series('uglify', function () {
	return gulp.src(['src/index.js', 'src/*.js'])
		.pipe(concat('zn.data.observer.js'))
		.pipe(gulp.dest('dist/'));
}));

gulp.task('concat-minx', gulp.series('uglify', function () {
	return gulp.src(['dist/minx/index.js', 'dist/minx/*.js'])
		.pipe(concat('zn.data.observer.minx.js'))
		.pipe(gulp.dest('dist/'));
}));

//建立一个默认执行的任务，这个任务顺序执行上面创建的N个任务
gulp.task('default', gulp.series('concat', 'concat-minx'));