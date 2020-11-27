import axios from 'axios';
import Vue from 'vue';
import moment from 'moment';
import { BILLING_PROVIDER_ID, API_HOST_PROD, API_HOST_SANDBOX } from '../config';

const API_HOST = process.env.NUXT_ENV_MODE === 'sandbox' ? API_HOST_SANDBOX : API_HOST_PROD;

const Cookie = process.client ? require('js-cookie') : undefined;
const cookieparser = process.server ? require('cookieparser') : undefined;

export const state = () => ({
  status: '',
  countriesList: {},
  currencyList: {},
  categories: [],
  shouldCashout: false,
  providers: [
    {
      name: 'All providers',
    },
    {
      name: 'Netent',
      icon: 'netent',
    },
    {
      name: "Play'n go",
      icon: 'go',
    },
    {
      name: 'Microgaming',
      icon: 'microgaming',
    },
    {
      name: '1x2 gambing',
      icon: 'gaming_book',
    },
    {
      name: 'Amatic',
      icon: 'amatic',
    },
    {
      name: 'Belatra',
      icon: 'belatra',
    },
    {
      name: 'Spinometal',
      icon: 'spinometal',
    },
    {
      name: 'Booming games',
      icon: 'booming',
    },
    {
      name: 'Egt',
      icon: 'egt',
    },
    {
      name: 'Endorphina',
      icon: 'endorphina',
    },
    {
      name: 'Netent',
      icon: 'netent',
    },
    {
      name: "Play'n go",
      icon: 'go',
    },
    {
      name: 'Microgaming',
      icon: 'microgaming',
    },
    {
      name: '1x2 gambing',
      icon: 'gaming_book',
    },
    {
      name: 'Amatic',
      icon: 'amatic',
    },
    {
      name: 'Belatra',
      icon: 'belatra',
    },
    {
      name: 'Spinometal',
      icon: 'spinometal',
    },
    {
      name: 'Booming games',
      icon: 'booming',
    },
    {
      name: 'Egt',
      icon: 'egt',
    },
    {
      name: 'Endorphina',
      icon: 'endorphina',
    },
    {
      name: 'Netent',
      icon: 'netent',
    },
    {
      name: "Play'n go",
      icon: 'go',
    },
    {
      name: 'Microgaming',
      icon: 'microgaming',
    },
    {
      name: '1x2 gambing',
      icon: 'gaming_book',
    },
    {
      name: 'Amatic',
      icon: 'amatic',
    },
    {
      name: 'Belatra',
      icon: 'belatra',
    },
    {
      name: 'Spinometal',
      icon: 'spinometal',
    },
    {
      name: 'Booming games',
      icon: 'booming',
    },
    {
      name: 'Egt',
      icon: 'egt',
    },
    {
      name: 'Endorphina',
      icon: 'endorphina',
    },
    {
      name: 'Netent',
      icon: 'netent',
    },
    {
      name: "Play'n go",
      icon: 'go',
    },
    {
      name: 'Microgaming',
      icon: 'microgaming',
    },
    {
      name: '1x2 gambing',
      icon: 'gaming_book',
    },
    {
      name: 'Amatic',
      icon: 'amatic',
    },
    {
      name: 'Belatra',
      icon: 'belatra',
    },
    {
      name: 'Spinometal',
      icon: 'spinometal',
    },
    {
      name: 'Booming games',
      icon: 'booming',
    },
    {
      name: 'Egt',
      icon: 'egt',
    },
    {
      name: 'Endorphina',
      icon: 'endorphina',
    },
  ],
  token: null,
  authError: '',
  navIsOpen: false,
  notificationsPanelIsOpen: false,
  width: 0,
  games: [],
  jackpots: [],
  limits: [
    {
      name: 'loss limits',
      limits: [
        {
          isMoney: true,
          limitState: 1,
          limitAmount: 5,
          currentPeriod: 'daily',
          title: 'daily limit',
          type: 'loss',
          reset: moment()
            .endOf('day')
            .format(),
        },
        {
          isMoney: true,
          limitState: 19,
          limitAmount: 25,
          currentPeriod: 'weekly',
          type: 'loss',
          title: 'weekly limit',
          reset: moment()
            .endOf('week')
            .format(),
        },
      ],
    },
    {
      name: 'session limit',
      limits: [
        {
          isMoney: false,
          limitState: 30,
          limitAmount: 80,
          title: 'time spent of gambling',
          type: 'session',
        },
      ],
    },
    {
      name: 'wager limits',
      limits: [
        {
          isMoney: true,
          limitState: 7,
          limitAmount: 14,
          currentPeriod: 'weekly',
          type: 'wager',
          title: 'weekly limit',
          reset: moment()
            .endOf('week')
            .format(),
        },
      ],
    },
    {
      name: 'cooling off',
      limits: [
        {
          isMoney: true,
          limitState: 7,
          limitAmount: 20,
          type: 'cooling',
          title: 'time spent gambling',
          reset: moment()
            .endOf('week')
            .format(),
        },
      ],
    },
    {
      name: 'reality check',
      limits: [
        {
          isMoney: false,
          type: 'reality_check',
          title: 'notification',
          period: 'every 60 min',
        },
      ],
    },
    {
      name: 'deposit limits',
      limits: [
        {
          isMoney: true,
          limitState: 67,
          limitAmount: 100,
          currentPeriod: 'daily',
          type: 'deposit',
          title: 'daily limit',
          reset: moment()
            .endOf('day')
            .format(),
        },
        {
          isMoney: true,
          limitState: 10,
          limitAmount: 50,
          currentPeriod: 'weekly',
          type: 'deposit',
          title: 'weekly limit',
          reset: moment()
            .endOf('week')
            .format(),
        },
      ],
    },
    {
      name: 'self exclusion',
      limits: [
        {
          isMoney: false,
          type: 'self_exclusion',
          title: 'blocked address',
          period: '6 month',
        },
      ],
    },
  ],
  gamesAreLoading: false,
  winnersAreLoading: false,
  errors: {},
  user: {},
  currency: 'eur',
  billingSession: {},
  fakeBillingSession: {
    userId: '123',
    sessionId: '123',
    merchantId: '1000',
  },
  tournaments: [
    {
      title: 'Weekly<br/> tournament',
      subtitle: '€ 500 <span class="Colored">+</span> 500 Free Spins',
      image: 'promotion1.png',
      announce: 'Weekly tournament',
      enddate: '2021-01-01',
      text:
        '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
    },
    {
      title: 'Roomcasino<br/> friday party',
      subtitle: '<span class="Colored">7 000</span> Free Spins<br/> every day',
      image: 'promotion2.png',
      announce: 'Friday party',
      enddate: '2021-01-01',
      text:
        '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
    },
    {
      title: 'Summer deluxe<br/> tournament',
      subtitle: '<span class="Colored">€ 50 000</span> every<br/> 5th day!',
      image: 'promotion5.png',
      announce: 'Summer deluxe tournament',
      enddate: '2021-01-01',
      text:
        '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
    },
    {
      title: 'Two day<br/> tournament',
      subtitle: '<span class="Colored">7 000</span> Free Spins<br/> every day',
      image: 'promotion6.png',
      announce: 'Two day tournament',
      enddate: '2021-01-01',
      text:
        '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
    },
  ],
  notifications: {
    promotions: [
      {
        title: 'First deposit bonus',
        icon: 'bonus.png',
        text:
          '100% of the deposit amount. <strong>€100 <span class="Colored">+</span> 55 free spins!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'On your second deposit',
        icon: 'bonus.png',
        text:
          '55% of the deposit amount. <strong>€100 <span class="Colored">+</span> 100 free spins!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'Third deposit bonus',
        icon: 'bonus.png',
        text: '100% of the deposit amount.<br/> Up to <strong>€100!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'Thuesday free spins',
        icon: 'bonus-ball.png',
        text: 'Up to <strong>100 free spins</strong> every Tuesday!',
        btnText: 'Get bonus',
      },
      {
        title: 'Weekend reload',
        icon: 'bonus-weekend.png',
        text: '40% of the deposit amount.<br/> Up to <strong>€150!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'Bonus for high rollers',
        icon: 'bonus-spades.png',
        text:
          '30% of the deposit amount.<br/> Up to <strong>€550</strong> on your first deposit of <strong>€300 </strong>',
        btnText: 'Get bonus',
      },
    ],
    notifications: [],
    tournaments: [
      {
        title: 'Weekly tournament',
        icon: 'bonus-cup.png',
        text: '<strong>€1000</strong> weekly prize fund for playing table games!',
        btnText: 'Learn more',
      },
      {
        title: 'Friday party',
        icon: 'bonus-diamond.png',
        text: '<strong>€500</strong> free spins up for grabs every 5 days!',
        btnText: 'Learn more',
      },
    ],
  },
  currentTournamentWinners: [
    {
      id: 1,
      name: 'Natacool',
      points: 3422,
      prize: '$ 10 000, 00',
    },
    {
      id: 2,
      name: 'Fire lightning 12',
      points: 2210,
      prize: '$ 5 000, 00',
    },
    {
      id: 3,
      name: 'Dakamu',
      points: 1012,
      prize: '$ 3 000, 00',
    },
    {
      id: 4,
      name: 'Ioana Juliana',
      points: 840,
      prize: '520 CP',
    },
    {
      id: 5,
      name: 'Fire lightning 11',
      points: 720,
      prize: '500 CP',
    },
    {
      id: 6,
      name: 'Dakamu',
      points: 640,
      prize: '500 CP',
    },
    {
      id: 7,
      name: 'Natacool',
      points: 530,
      prize: '500 CP',
    },
    {
      id: 8,
      name: 'Ioana Juliana',
      points: 420,
      prize: '500 CP',
    },
    {
      id: 9,
      name: 'Zzdeb',
      points: 380,
      prize: '500 CP',
    },
    {
      id: 10,
      name: 'Fire ligtning',
      points: 260,
      prize: '500 CP',
    },
  ],
  previousTournamentWinners: [
    {
      id: 1,
      name: 'Thunderbird',
      points: 3850,
      prize: '$ 12 000, 00',
    },
    {
      id: 2,
      name: 'Fire lightning 12',
      points: 2210,
      prize: '$ 5 000, 00',
    },
    {
      id: 3,
      name: 'Dakamu',
      points: 1012,
      prize: '$ 3 000, 00',
    },
    {
      id: 4,
      name: 'Ioana Juliana',
      points: 840,
      prize: '520 CP',
    },
    {
      id: 5,
      name: 'Fire lightning 11',
      points: 720,
      prize: '500 CP',
    },
    {
      id: 6,
      name: 'Dakamu',
      points: 640,
      prize: '500 CP',
    },
    {
      id: 7,
      name: 'Natacool',
      points: 530,
      prize: '500 CP',
    },
    {
      id: 8,
      name: 'Ioana Juliana',
      points: 420,
      prize: '500 CP',
    },
    {
      id: 9,
      name: 'Zzdeb',
      points: 380,
      prize: '500 CP',
    },
    {
      id: 10,
      name: 'Fire ligtning',
      points: 260,
      prize: '500 CP',
    },
  ],
  terms: [
    'You begin to participate in the VIP program after making your first deposit.',
    'CP is credited at the rate of 1 CP for every $ 12.5, 12.5 EUR, 15 CAD, 15 AUD, 15 NZD, 125 NOK, 325 CZK, 200 ZAR, 50 PLN bids.',
    'Exchange CP - 1 $, 1 EUR, 1.25 CAD, 1.25 AUD, 1.25 NZD, 10 NOK, 25 CZK, 17 ZAR, 4 PLN for 100 CP.',
    'All free spins are issued with a wager x10. All cash prizes are issued with wagering x1.',
    'Funds received when exchanging CP for real money are charged with wager x1.',
    'All prizes and free spins will be issued within 24 hours after the player has reached the VIP level.',
    'All prizes and free spins will be issued within 24 hours after the player has reached the VIP level.',
    'RoomCasino reserves the right to change the terms of the VIP program at any time.',
    'All free spins are issued with a wager x10. All cash prizes are issued with wagering x1.',
  ],
});

export const getters = {
  activeAccount: state => {
    if (state.user.accountList) return state.user.accountList.find(acc => acc.active === true);
    return {};
  },
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  providersList: state => startIndex =>
    state.providers.slice(startIndex, state.providers.length + 1),
  fakedNewGames: state => [...state.games].reverse().slice(0, 12),
  gamesLimited: state => limit => state.games.slice(0, limit),
  limitedTournamentWinners: state => limit => state.currentTournamentWinners.slice(0, limit),
  countriesNames: state => Object.values(state.countriesList),
  currencyNames: state => Object.values(state.currencyList),
  userInfo: state => {
    const info = { ...state.user };
    const countryName = state.countriesList[info.country];
    info.country = countryName;
    delete info.accountList;
    return info;
  },
  curencyAccounts: state =>
    Object.keys(state.currencyList).filter(cur => {
      if (state.user.accountList) {
        return !state.user.accountList.some(acc => acc.currency === cur);
      }
      return cur;
    }),
  isNewNotifications: state => !Object.values(state.notifications).every(arr => !arr.length),
};

export const mutations = {
  openNav: state => {
    state.navIsOpen = true;
  },
  closeNav: state => {
    state.navIsOpen = false;
  },
  openNotificationsPanel: state => {
    state.notificationsPanelIsOpen = true;
  },
  closeNotificationsPanel: state => {
    state.notificationsPanelIsOpen = false;
  },
  setCategories: (state, payload) => {
    state.categories = payload;
  },
  setWidth: (state, payload) => {
    state.width = payload;
  },
  gamesAreLoading: state => {
    state.gamesAreLoading = true;
  },
  gamesAreLoaded: state => {
    state.gamesAreLoading = false;
  },
  setGames: (state, payload) => {
    state.games = payload;
  },
  setCountriesList: (state, payload) => {
    state.countriesList = payload;
  },
  setCurrencyList: (state, payload) => {
    state.currencyList = payload;
  },
  pushErrors: (state, payload) => {
    state.errors = { ...state.errors, payload };
  },
  setJackpots: (state, payload) => {
    state.jackpots = payload;
  },
  addLimits: (state, payload) => {
    let limit = state.limits.find(lim => lim.name === payload.name);
    if (!limit) {
      limit = {
        name: payload.name,
        limits: [],
      };
      state.limits.push(limit);
    }
    limit.limits.push(payload.content);
  },
  authRequest(state) {
    state.status = 'loading';
    state.authError = '';
  },
  authError(state, message) {
    state.status = 'error';
    state.authError = message;
  },
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
  setBillingSession(state, payload) {
    state.billingSession = payload;
  },
  authSuccess(state) {
    state.status = 'success';
  },
  removeAuthError(state) {
    state.authError = '';
  },
  logout(state) {
    state.status = '';
    state.token = null;
  },
  setCashoutTrue(state) {
    state.shouldCashout = true;
  },
  setCashoutFalse(state) {
    state.shouldCashout = false;
  },
  updateBalance(state, payload) {
    state.user.balance += Number(payload);
  },
  setActiveUserAccount(state, currency) {
    if (state.user.accountList) {
      state.user.accountList.forEach(acc => {
        if (acc.currency === currency) acc.active = true;
        else acc.active = false;
      });
    }
  },
  updateLimits(state, { i, j, payload }) {
    Vue.set(state.limits[i].limits, j, payload);
  },
  deleteLimit(state, { i, j }) {
    state.limits[i].limits = [
      ...state.limits[i].limits.slice(0, j),
      ...state.limits[i].limits.slice(j + 1),
    ];
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (process.env.NUXT_ENV_MODE !== 'sandbox') {
      let token = null;
      if (req.headers.cookie) {
        const parsed = cookieparser.parse(req.headers.cookie);
        try {
          // eslint-disable-next-line prefer-destructuring
          token = parsed.token;
          // eslint-disable-next-line no-empty
        } catch (e) {}
        commit('setToken', token);
      }
    }
  },
  async getGames({ commit }, query = '') {
    commit('gamesAreLoading');
    try {
      // eslint-disable-next-line no-underscore-dangle
      // const res = await axios.get(`https://games.netdnstrace1.com/?liveCasinoOnly=true&${query}`);
      const res = await axios.get(`${API_HOST}/getGameList${query}`);
      commit('setGames', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('gamesAreLoaded');
    }
  },
  async registerUser({ commit }, payload) {
    commit('authRequest');
    await axios.post(`${API_HOST}/register`, payload, {
      transformResponse: [
        data => {
          let res;

          try {
            res = JSON.parse(data);
          } catch (error) {
            throw Error(
              `[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`,
            );
          }

          if (res.code === 0) {
            return res.data;
          }
          commit('authError', res.message);
        },
      ],
    });
  },

  async authorize({ state, commit, dispatch }, payload) {
    commit('authRequest');
    await dispatch('login', payload);
    if (!state.authError) await dispatch('getProfile');
    if (!state.authError) commit('authSuccess');
  },

  async login({ commit }, payload) {
    try {
      const res = await axios.post(`${API_HOST}/login`, payload);
      if (res.data.code === 10002) {
        commit('authError', res.data.message);
      } else {
        const { token } = res.data.data;
        commit('setToken', token);
        Cookie.set('token', token);
        axios.defaults.headers.common['X-Auth-Token'] = token;
      }
    } catch (e) {
      commit('authError', e);
      Cookie.remove('token');
    }
  },

  async getProfile({ commit }) {
    try {
      const res = await axios.get(`${API_HOST}/getProfile`);
      const user = res.data.data;
      commit('setUser', user);
    } catch (e) {
      commit('authError', e);
    }
  },

  async logout({ commit }, isAuthError = false) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      if (!isAuthError) await axios.post(`${API_HOST}/logout`);
      commit('logout');
      Cookie.remove('token');
      delete axios.defaults.headers.common['X-Auth-Token'];
      this.$route.push('/');
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async getCountriesList({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`${API_HOST}/countryList`);
      commit('setCountriesList', res.data.data.countryList);
    } catch (e) {
      commit('pushErrors', e);
    }
  },
  async getCurrencyList({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`${API_HOST}/currencyList`);
      commit('setCurrencyList', res.data.data.currencyList);
    } catch (e) {
      commit('pushErrors', e);
    }
  },
  async getCategoriesList({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`${API_HOST}/categoryList`);
      commit('setCategories', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    }
  },
  async getBillingSession({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.post(`${API_HOST}/getBillingSession`, {
        bpId: BILLING_PROVIDER_ID,
      });
      commit('setBillingSession', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async startGame({ commit }, payload) {
    try {
      const res = await axios.post(`${API_HOST}/startGame`, payload);
      const { url } = res.data.data;
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('target', '_blank');
      a.click();
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async setActiveAccount({ commit }, payload) {
    try {
      const res = await axios.post(`${API_HOST}/setActiveAccount`, payload);
      commit('setActiveUserAccount', res.data.data.currency);
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async updateProfile({ commit, dispatch }, payload) {
    try {
      await axios.put(`${API_HOST}/updateProfile`, payload);
      dispatch('getProfile');
    } catch (e) {
      commit('pushErrors', e);
    }
  },
};
