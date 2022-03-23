<template>
  <div>
    <b-breadcrumb align="is-left">
      <b-breadcrumb-item tag="router-link" to="/admin/posts"
        >Posts</b-breadcrumb-item
      >
      <b-breadcrumb-item tag="router-link" to="/admin/posts/create" active
        >Post create</b-breadcrumb-item
      >
    </b-breadcrumb>
    <post-form :isEdit="!!this.$route.params.id" :item="post" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PostForm from "../components/posts/PostForm.vue";
export default {
  name: "PostCreate",
  components: { PostForm },
  computed: {
    ...mapGetters("post", ["post"]),
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.fetchPost(id);
    }
  },
  methods: {
    ...mapActions("post", ["fetchPost"]),
  },
};
</script>

<style></style>
