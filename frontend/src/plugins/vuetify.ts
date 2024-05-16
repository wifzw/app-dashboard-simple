import Vue from 'vue';
import Vuetify from 'vuetify';
import pt from 'vuetify/src/locale/pt';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#007BFF',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        textColor: '#EEEEEE',
        borderColor: '#f0f0f0',
        appBarBg: '#FFFFFF',
        mainBg: '#fafafb',
        iconColor: '#424242',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
