const gulp = require('gulp');
const {codegen} = require('swagger-axios-codegen');
const {SERVICES_FOLDER, REMOTE_URL} = require('../options');

gulp.task('swagger:codegen', function () {
  return codegen({
    methodNameMode: 'path',
    useClassTransformer: false,
    serviceNameSuffix: 'Service',
    remoteUrl: REMOTE_URL,
    outputDir: SERVICES_FOLDER,
    useStaticMethod: false,
    modelMode: 'interface',
  });
});
