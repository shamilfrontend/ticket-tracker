import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tickets: JSON.parse(localStorage.getItem('tickets') || '[]').map((ticket) => {
      if (new Date(ticket.date) < new Date()) {
        /* eslint no-param-reassign: "error" */
        ticket.status = 'outdated';
      }
      return ticket;
    }),
  },

  getters: {
    tickets(state) {
      return state.tickets;
    },

    ticketById: state => id => state.tickets.find(ticket => ticket.id === id),
  },

  mutations: {
    createTicket(state, ticket) {
      state.tickets.push(ticket);

      localStorage.setItem('tickets', JSON.stringify(state.tickets));
    },

    updateTicket(state, { id, description, date }) {
      const tickets = state.tickets.concat();

      const idx = tickets.findIndex(ticket => ticket.id === id);
      const ticket = tickets[idx];

      const status = new Date(date) > new Date() ? 'active' : 'outdated';

      tickets[idx] = {
        ...ticket,
        date,
        description,
        status,
      };

      state.tickets = tickets;
      localStorage.setItem('tickets', JSON.stringify(state.tickets));
    },

    completeTicket(state, id) {
      const idx = state.tickets.findIndex(ticket => ticket.id === id);
      state.tickets[idx].status = 'completed';

      localStorage.setItem('tickets', JSON.stringify(state.tickets));
    },
  },

  actions: {
    createTicket({ commit }, ticket) {
      commit('createTicket', ticket);
    },

    updateTicket({ commit }, ticket) {
      commit('updateTicket', ticket);
    },

    completeTicket({ commit }, ticketId) {
      commit('completeTicket', ticketId);
    },
  },
});
