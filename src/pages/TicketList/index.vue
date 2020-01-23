<template>
  <div class="ticket-list">
    <h1>Tickets</h1>

    <div class="filter">
      <label class="filter-label">
        <span>Choose your option</span>
        <select v-model="filter">
          <option value="active">Active</option>
          <option value="outdated">Outdated</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <button
        v-if="filter"
        class="btn btn-small red"
        @click="handleFilterClear"
      >Clear filter</button>
    </div>
    <hr>

    <table v-if="ticketsByFilter.length">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Date</th>
        <th>Description</th>
        <th>Tags</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      <tr
        v-for="(ticket, index) in ticketsByFilter"
        :key="ticket.id"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ ticket.name }}</td>
        <td>{{ new Date(ticket.date).toLocaleDateString() }}</td>
        <td class="column-description">
          <div class="description">
            {{ ticket.description }}
          </div>
        </td>
        <td>
          <button
            v-for="(item, i) in ticket.tags"
            :key="i"
            class="tag"
          >
            {{ item.tag }}
          </button>
        </td>
        <td>{{ ticket.status }}</td>
        <td>
          <router-link
            :to="`/ticket/${ticket.id}`"
            tag="button"
            class="btn btn-small"
          >
            Open
          </router-link>
        </td>
      </tr>
    </table>
    <p v-else>No tickets</p>
  </div>
</template>

<script>
export default {
  name: 'TicketList',

  data() {
    return {
      filter: null,
    };
  },

  computed: {
    tickets() {
      return this.$store.getters.tickets;
    },

    ticketsByFilter() {
      return this.tickets.filter((ticket) => {
        if (!this.filter) return true;
        return ticket.status === this.filter;
      });
    },
  },

  methods: {
    handleFilterClear() {
      this.filter = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.column-description {
  max-width: 400px;
}

.description {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.filter {
  width: 300px;
  margin-bottom: 30px;

  select {
    display: block;
  }
}

.filter-label {
  display: block;
  margin-bottom: 10px;
}

.tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
