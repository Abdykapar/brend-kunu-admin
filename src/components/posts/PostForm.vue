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
            class="mb-4"
            :type="errors[0] && 'is-danger'"
            :message="errors"
          >
            <b-input v-model="form.description" type="textarea"> </b-input>
          </b-field>
        </ValidationProvider>
        <figure v-if="imageUrl" class="image is-128">
          <img :src="imageUrl" />
        </figure>
        <b-field
          class="file is-info mt-2"
          :class="{ 'has-name': !!form.image }"
        >
          <b-upload v-model="form.image" class="file-label">
            <span class="file-cta">
              <font-awesome-icon icon="fa-solid fa-upload" class="mr-2" />
              <span class="file-label">Click to upload photo</span>
            </span>
            <span class="file-name" v-if="form.image">
              {{ form.image.name }}
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
        <b-field label="Text" class="mb-3">
          <vue-editor
            id="editor"
            useCustomImageHandler
            :editorOptions="editorSettings"
            @image-added="handleImageAdded"
            @image-removed="onImageRemove"
            v-model="form.text"
          >
          </vue-editor>
        </b-field>
        <div class="submit mt-4">
          <b-button :loading="isLoading" native-type="submit" type="is-info">{{
            isEdit ? "Edit" : "Create"
          }}</b-button>
          <b-button
            @click="$router.back()"
            class="ml-4"
            :loading="isLoading"
            type="is-danger"
            >Cancel</b-button
          >
        </div>
      </form>
    </ValidationObserver>
  </section>
</template>

<script>
import { postService } from "@/_services/post.service";
import { imageService } from "@/_services/image.service";
import { mapActions, mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
import Quill from "quill";
import ImageResize from "quill-image-resize-module";

Quill.register("modules/imageResize", ImageResize);

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
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  computed: {
    ...mapGetters("category", ["subCategories"]),
    imageUrl() {
      if (this.form.image) return URL.createObjectURL(this.form.image);
      if (this.item.image_url) return this.item.image_url;
      return "";
    },
  },
  watch: {
    item: {
      immediate: true,
      handler() {
        this.form = {
          title: this.item.title,
          description: this.item.description,
          text: this.item.text,
          subCategoryId: this.item.subCategoryId,
        };
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
          await postService.update(this.form, this.item._id);
        } else {
          await postService.create(this.form);
        }
        this.$router.push("/admin/posts");
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        this.isLoading = false;
      }
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      imageService
        .create({ file })
        .then((result) => {
          const url = result.url;
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onImageRemove (img) {
      const a = img.split("/")
      const b = a[a.length - 1]
      if (b) {
        imageService.deleteByName(b).then(() => {
          console.log("Image deleted, url: ", b)
        }).catch(err => {
          console.log(err)
        })
      }
    }
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
.is-128 {
  width: 128px;
}
</style>
