<template>
  <section>
    <header class="column">
      <p class="title post-title">{{ isEdit ? "Edit" : "Create" }} post</p>
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
        <ValidationProvider
          name="description"
          v-slot="{ errors }"
          rules="required"
        >
          <b-field
            label="Description"
            class="w-200"
            :type="errors[0] && 'is-danger'"
            :message="errors"
          >
            <b-input v-model="form.description" type="textarea"> </b-input>
          </b-field>
        </ValidationProvider>
        <b-field class="file is-info mt-4" :class="{ 'has-name': !!form.file }">
          <b-upload v-model="form.file" class="file-label">
            <span class="file-cta">
              <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />
              <span class="file-label">Click to upload photo</span>
            </span>
            <span class="file-name" v-if="form.file">
              {{ form.file.name }}
            </span>
          </b-upload>
        </b-field>
        <ValidationProvider
          name="subCategory"
          v-slot="{ errors }"
          rules="required"
        >
          <b-field
            label="Subcategory"
            class="mb-3"
            :type="errors[0] && 'is-danger'"
            :message="errors"
          >
            <b-select
              placeholder="Select a sub category"
              v-model="form.subCategoryId"
              expanded
            >
              <option
                v-for="option in subCategories"
                :value="option._id"
                :key="option._id"
              >
                {{ option.title }}
              </option>
            </b-select>
          </b-field>
        </ValidationProvider>
        <vue-editor
          id="editor"
          useCustomImageHandler
          @imageAdded="() => {}"
          v-model="form.text"
        >
        </vue-editor>
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
  </section>
</template>

<script>
import { postService } from "@/_services/post.service";
import { mapActions, mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
export default {
  name: "PostForm",
  components: { VueEditor },
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
  computed: {
    ...mapGetters("category", ["subCategories"]),
  },
  watch: {
    item: {
      immediate: true,
      handler() {
        this.form = { ...this.item };
      },
    },
  },
  created() {
    this.fetchSubCategories();
  },
  methods: {
    ...mapActions("category", ["fetchSubCategories"]),
    async onSubmit() {
      try {
        this.isLoading = true;
        if (this.isEdit) {
          await postService.update(this.form);
        } else {
          await postService.create(this.form);
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
.post-title {
  text-align: center;
}
</style>
