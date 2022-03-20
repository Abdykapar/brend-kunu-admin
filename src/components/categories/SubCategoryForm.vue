<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ isEdit ? "Edit" : "Create" }} subcategory
      </p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="form" @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider name="title" v-slot="{ errors }" rules="required">
          <b-field
            label="Title"
            :type="errors[0] && 'is-danger'"
            :message="errors"
          >
            <b-input v-model="form.title" type="text"> </b-input>
          </b-field>
        </ValidationProvider>
        <ValidationProvider
          name="category"
          v-slot="{ errors }"
          rules="required"
        >
          <b-field
            label="Category"
            :type="errors[0] && 'is-danger'"
            :message="errors"
          >
            <b-select
              placeholder="Select a category"
              v-model="form.categoryId"
              expanded
            >
              <option
                v-for="option in categories"
                :value="option._id"
                :key="option._id"
              >
                {{ option.title }}
              </option>
            </b-select>
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
import { subCategoryService } from "@/_services/sub-category.service";
export default {
  name: "SubCategoryForm",
  props: {
    isEdit: { type: Boolean, default: false },
    item: { type: Object, default: () => {} },
    categories: { type: Array, default: () => [] },
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
        this.form = {
          _id: this.item._id,
          title: this.item.title,
          categoryId: this.item.categoryId,
        };
      },
    },
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true;
        if (this.isEdit) {
          await subCategoryService.update(this.form);
        } else {
          await subCategoryService.create(this.form);
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
