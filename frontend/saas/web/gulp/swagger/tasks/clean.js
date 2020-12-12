const gulp = require('gulp');
const del = require('del');
const {SERVICES_FOLDER} = require('../options');

gulp.task('swagger:clean', function () {
  return  del([SERVICES_FOLDER + "/**/*"], {force: true});
});