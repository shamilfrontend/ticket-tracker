<template>
  <div class="row detail-ticket">
    <div class="col s12">
      <template v-if="ticket">
        <h1>{{ ticket.name }}</h1>

        <form @submit.prevent="submitHandler">
          <div class="tags">
            <label>Tags</label>
            <button
              v-for="(item, index) in ticket.tags"
              :key="index"
              type="button"
            >
              {{ item.tag }}
            </button>
          </div>

          <div class="input-field">
            <textarea
              v-model="formData.description"
              id="description"
              :disabled="ticket.status === 'completed'"
              class="materialize-textarea"
            />
            <label for="description">Description</label>
            <span class="character-counter">{{ formData.description.length }}/2048</span>
          </div>

          <input
            v-model="formData.date"
            type="text"
            :disabled="ticket.status === 'completed'"
            class="datepicker"
            ref="datepicker"
          >

          <template v-if="ticket.status !== 'completed'">
            <button
              class="btn"
              type="submit"
            >Update ticket</button>
            <button
              class="btn blue complete"
              type="button"
              @click="handleCompleteBtnClick"
            >Complete ticket</button>
          </template>
        </form>
      </template>
      <div v-else>
        <h1>Ticket not found</h1>
        <router-link to="/">Go to Main page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DetailTicket',

  data() {
    return {
      formData: {
        chips: null,
        description: '',
        date: null,
      },
    };
  },

  computed: {
    ...mapGetters(['ticketById']),

    ticket() {
      return this.ticketById(Number(this.$route.params.id));
    },
  },

  mounted() {
    this.formData.chips = window.M.Chips.init(this.$refs.chips, {
      placeholder: 'Ticket tags',
      data: this.ticket.tags,
    });
    this.formData.date = window.M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.ticket.date),
      setDefaultDate: true,
    });

    this.formData.description = this.ticket.description;
    // this.formData.date = this.ticket.date;

    this.$nextTick(() => {
      window.M.updateTextFields();
    });
  },

  beforeDestroy() {
    if (this.formData.date && this.formData.date.destroy) {
      this.formData.date.destroy();
    }
    if (this.formData.chips && this.formData.chips.destroy) {
      this.formData.chips.destroy();
    }
  },

  methods: {
    submitHandler() {
      this.$store.dispatch('updateTicket', {
        id: this.ticket.id,
        description: this.formData.description,
        date: this.formData.date.date,
      });
      this.$notify({
        group: 'notify',
        text: 'Тикет успешно обновлен',
      });
      this.$router.push('/tickets');
    },
    handleCompleteBtnClick() {
      this.$store.dispatch('completeTicket', this.ticket.id);
      this.$notify({
        group: 'notify',
        text: 'Тикет завершен',
      });
      this.$router.push('/tickets');
    },
  },
};
</script>

<style lang="scss" scoped>
$size-indent: 30px;

.detail-ticket {
  padding-bottom: $size-indent;
}

.tags {
  margin-bottom: $size-indent;

  label {
    display: block;
    margin-bottom: 10px;
  }
}

.btn {
  margin-top: $size-indent;
}

.character-counter {
  display: block;
  text-align: right;
  font-size: 12px;
}

.complete {
  margin-left: 15px;
}
</style>
