<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ isEdit ? "Edit" : "Create" }} tag</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="form" @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider name="title" v-slot="{ errors }" rules="required">
          <b-field
            label="Title"
            class="w-200"
            :type="errors[0] && 'is-danger'"
            :message="errors"
          >
            <b-input v-model="form.title" type="text"> </b-input>
          </b-field>
        </ValidationProvider>
        <div class="submit mt-4">
          <b-button
            :loading="isLoading"
            native-type="submit"
            type="is-primary"
            >{{ isEdit ? "Edit" : "Create" }}</b-button
          >
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { tagService } from "@/_services/tag.service";
export default {
  name: "TagForm",
  props: {
    isEdit: { type: Boolean, default: false },
    item: { type: Object, default: () => {} },
  },
  data() {
    return {
      form: {},
      isLoading: false,
    };
  },
  watch: {
    item: {
      immediate: true,
      handler() {
        this.form = { _id: this.item._id, title: this.item.title };
      },
    },
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true;
        if (this.isEdit) {
          await tagService.update(this.form);
        } else {
          await tagService.create(this.form);
        }
        this.$emit("close");
        this.$emit("fetch");
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.form {
  background-color: #fff;
  padding: 2rem;
  z-index: 99999;
}
</style>
