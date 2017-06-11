'use strict';

var path = require('path');

var serveTask = function (gulp, plugins, config, helpers, generator_config) {
  gulp.task('serve', ['styles-watch', 'templates-watch', 'assets-watch'], function() {
    
    var browserSyncConfig = {
      server: './dist',
      online: true
    }
    
    plugins.browserSync.init(browserSyncConfig);

    gulp.watch(path.join(config.src.base, config.src.styles), ['styles-watch']);
    gulp.watch(config.src.templatesWatch, ['templates-watch']);
    gulp.watch(path.join(config.src.base, config.src.assets), ['assets-watch']);
    
  });
};

module.exports = serveTask;
