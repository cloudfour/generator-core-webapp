let src = './src',
  dest = './dist';

let config = {
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

<% if (templates) { %>
config.html = {
  sharedData: {},
  dest: dest,
  layoutDir: `${src}/layouts`,
  plugins: {
    handlebars: {
      ignorePartials: true,
      batch: [`${src}/partials`],
    }
  },
  src: `${src}/**/*.hbs`,
  templateExt: 'hbs'
};
config.watch.watchers.push({
    match: [`${src}/**/*.hbs`],
    tasks: ['html']
});
<% } %>

export default config;
