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
    <post-form />
  </div>
</template>

<script>
import PostForm from "../components/posts/PostForm.vue";
export default {
  name: "PostCreate",
  components: { PostForm },
};
</script>

<style></style>
