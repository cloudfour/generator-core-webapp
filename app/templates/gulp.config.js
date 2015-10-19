let src = './src',
  dest = './dist';

export default {
  clean: {
    dest: `${dest}`
  },
  css: {
    dest: `${dest}`,
    optimize: false,
    src: `${src}/main.css`
  }
};
