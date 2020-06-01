const gulp = require('gulp');
const del = require('del');
const gulpRename = require('gulp-rename');
const plumber = require('gulp-plumber');
const gulpScss = require('gulp-sass');
const px2rpx = require('gulp-px2rpx');
const gulpCleanCss = require('gulp-clean-css');
const gulpImagemin = require('gulp-imagemin');
const uglifyes = require('uglify-es');
const gulpUglify = require('gulp-uglify/composer')(uglifyes, console);
const jsonMinify = require('gulp-json-minify');
const uglify = require('gulp-uglify-es').default;

gulp.task('clean-dist', cb => del(['dist'], cb));

gulp.task('dev-img', () => {
  return gulp.src(['src/**/*.{jpg,png,jpeg,gif,svg}'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('dev-js', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/'));
});

gulp.task('dev-json', () => {
  return gulp.src(['src/**/*.json'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/'));
});

gulp.task('dev-wxml', () => {
  return gulp.src(['src/**/*.wxml'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('dev-wxss', () => {
  return gulp.src(['src/**/*.scss', '!src/sass-utils/**/*.scss'])
    .pipe(plumber())
    .pipe(gulpScss({
      outputStyle: 'expanded',
    }))
    .pipe(gulpRename((path) => {
      path.extname = '.wxss';
    }))
    .pipe(px2rpx({
      screenWidth: 375, // 设计稿屏幕, 默认750
      wxappScreenWidth: 750, // 微信小程序屏幕, 默认750
      remPrecision: 6, // 小数精度, 默认6
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('min-js', () => {
  return gulp.src(['src/**/*.js'])
    // .pipe(plumber())
    .pipe(gulpUglify({
      ecma: 8,
      output: {
        // 最紧凑的输出
        beautify: false,
      },
      compress: {
        // 删除所有的 `console` 语句
        drop_console: true,
      },
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('min-json', () => gulp.src(['src/**/*.json', '!src/ext.json'])
  .pipe(plumber())
  .pipe(jsonMinify())
  .pipe(gulp.dest('dist/'))
);

gulp.task('min-wxss', () => {
  return gulp.src(['src/**/*.scss', '!src/sass-utils/**/*.scss'])
    .pipe(gulpScss({
      outputStyle: 'expanded',
    }))
    .pipe(gulpRename((path) => {
      path.extname = '.wxss';
    }))
    .pipe(gulpCleanCss({
      compatibility: 'units.rpx',
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('min-img', () => {
  return gulp.src(['src/**/*.{jpg,png,jpeg,gif,svg}'])
    .pipe(gulpImagemin({
      progressive: true,
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('min-wxml', () => {
  return gulp.src(['src/**/*.wxml'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.{jpg,png,jpeg,gif,svg}', ['dev-img']);
  gulp.watch('src/**/*.js', ['dev-js']);
  gulp.watch('src/**/*.json', ['dev-json']);
  gulp.watch('src/**/*.scss', ['dev-wxss']);
  gulp.watch('src/**/*.wxml', ['dev-wxml']);
});

gulp.task('dev', [/*'clean-dist'*/], () => {
  gulp.start('dev-img', 'dev-js', 'dev-json', 'dev-wxml', 'dev-wxss', 'watch');
});

gulp.task('build', ['clean-dist'], () => {
  gulp.start('min-img', 'min-js', 'min-json', 'min-wxml', 'min-wxss');
});
//压缩小程序js文件
gulp.task('jsmin', function() {
    gulp.src(['src/*/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))

});
