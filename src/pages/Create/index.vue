<template>
  <div class="row">
    <div class="col s12">
      <h1>Create ticket</h1>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            v-model="formData.name"
            id="name"
            type="text"
            class="validate"
            required
          >
          <label for="name">Ticket name</label>
          <span class="helper-text" data-error="name is required" />
        </div>

        <div class="chips" ref="chips"></div>

        <div class="input-field">
          <textarea
            v-model="formData.description"
            id="description"
            class="materialize-textarea"
          />
          <label for="description">Description</label>
          <span class="character-counter">{{ formData.description.length }}/2048</span>
        </div>

        <input
          v-model="formData.date"
          type="text"
          class="datepicker"
          ref="datepicker"
        >

        <button class="btn" type="submit">Create ticket</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreatePage',

  data() {
    return {
      formData: {
        name: '',
        description: '',
        chips: null,
        date: null,
      },
    };
  },

  mounted() {
    this.formData.chips = window.M.Chips.init(this.$refs.chips, {
      placeholder: 'Ticket tags',
    });
    this.formData.date = window.M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true,
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
      const ticket = {
        id: Date.now(),
        name: this.formData.name,
        description: this.formData.description,
        tags: this.formData.chips.chipsData,
        date: this.formData.date.date,
        status: 'active',
      };

      this.$store.dispatch('createTicket', ticket);
      this.$notify({
        group: 'notify',
        text: 'Тикет успешно создан',
      });
      this.$router.push('/tickets');
    },
  },
};
</script>

<style lang="scss" scoped>
$size-indent: 30px;

.chips {
  margin-bottom: $size-indent;

  .input {
    color: #9e9e9e;
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
</style>
