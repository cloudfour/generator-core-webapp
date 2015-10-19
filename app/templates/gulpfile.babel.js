import config from './gulp.config.js';
import gulp from 'gulp';
import tasks from 'core-gulp-tasks';

tasks.clean(gulp, config.clean);
tasks.css(gulp, config.css);
tasks.js(gulp, config.js);
tasks.serve(gulp, config.serve);
tasks.watch(gulp, config.watch);
