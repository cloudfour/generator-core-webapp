let src = './src',
  dest = './dist';

export default {
  clean: {
    dest: dest
  },
  css: {
    dest: dest,
    optimize: false,
    src: `${src}/main.css`
  },
  js: {
    optimize: false,
    plugins: {
      webpack: {
        entry: `${src}/main.js`,
        output: {
          path: dest,
          filename: 'main.js'
        },
        plugins: []
      }
    }
  },
  serve: {
    plugins: {
      browserSync: {
        files: ['**/*.*'],
        server: { baseDir: dest }
      }
    }
  },
  watch: {
    watchers: [
      {
        match: [`${src}/**/*.css`],
        tasks: ['css']
      }
    ]
  }
};
