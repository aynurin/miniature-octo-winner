// get the dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var childProcess = require('child_process');
var electron = require('electron-prebuilt');
var gulpElectron = require('gulp-electron');
var packageJson = require('./app/package.json');

// create the gulp task
gulp.task('run', function () {
    childProcess.spawn(electron, ['--debug=5858', './app', '--disable-gpu'], { stdio: 'inherit' });
});

gulp.task('sass', function () {
    gulp.src('./app/ui/scss/app.scss')
        .pipe(sass({
            includePaths: require('node-reset-scss').includePath
        }).on('error', sass.logError))
        .pipe(gulp.dest('./app/ui'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/ui/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'run']);

gulp.task('build', ['sass']);

gulp.task('publish', function() {
 
    gulp.src("")
    .pipe(gulpElectron({
        src: './app',
        packageJson: packageJson,
        release: './release',
        cache: './cache',
        version: 'v0.36.1',
        packaging: true,
        platforms: ['win32-ia32', 'darwin-x64'],
        platformResources: {
            darwin: {
                CFBundleDisplayName: packageJson.name,
                CFBundleIdentifier: packageJson.name,
                CFBundleName: packageJson.name,
                CFBundleVersion: packageJson.version,
                icon: './app/assets/pendrive.icns'
            },
            win: {
                "version-string": packageJson.version,
                "file-version": packageJson.version,
                "product-version": packageJson.version,
                "icon": './app/assets/pendrive.ico'
            }
        }
    }))
    .pipe(gulp.dest(""));
});