<template>
  <div>
    <div class="columns">
      <div class="column is-8">
        <h1 class="title">Posts</h1>
      </div>
      <div class="column">
        <div class="is-flex is-justify-content-flex-end">
          <b-button
            @click="$router.push('/admin/posts/create')"
            type="is-primary"
            >Add Post</b-button
          >
        </div>
      </div>
    </div>
    <b-table striped hoverable class="bk-table" :data="posts">
      <b-table-column
        field="id"
        label="ID"
        width="40"
        numeric
        v-slot="{ index }"
      >
        {{ index + 1 }}
      </b-table-column>
      <b-table-column field="title" label="Title" v-slot="props">
        {{ props.row.title }}
      </b-table-column>
      <b-table-column field="image" label="Image" v-slot="{ row }">
        <img v-if="row.image_url" :src="row.image_url" width="100" />
      </b-table-column>
      <b-table-column field="category" label="Category" v-slot="{ row }">
        {{ row.subCategoryId && row.subCategoryId.title }}
      </b-table-column>
      <b-table-column field="tags" label="Tags" v-slot="{ row }">
        {{ row.tags && row.tags.map((i) => i.title).join(", ") }}
      </b-table-column>
      <b-table-column field="action" label="Edit/Delete" v-slot="{ row }">
        <b-button
          @click="$router.push({ name: 'PostEdit', params: { id: row._id } })"
          class="mr-2"
          type="is-info"
          size="is-small"
          ><font-awesome-icon icon="fa-solid fa-pen-to-square"
        /></b-button>
        <b-button @click="onDelete(row._id)" type="is-danger" size="is-small"
          ><font-awesome-icon icon="fa-solid fa-trash"
        /></b-button>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { postService } from "@/_services/post.service";
export default {
  name: "BkPosts",
  data() {
    return {
      deleteId: "",
    };
  },
  computed: {
    ...mapGetters("post", ["posts"]),
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    ...mapActions("post", ["fetchPosts"]),
    onDelete(id, isSub = false) {
      this.$buefy.dialog.confirm({
        title: "Deleting post",
        message: "Are you sure you want to <b>delete</b> this post?",
        confirmText: "Delete post",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          try {
            await postService.delete(id);
            this.$buefy.toast.open({
              message: "Post deleted!",
              type: "is-success",
            });
            this.fetchPosts();
          } catch (err) {
            console.log(err);
          }
        },
      });
    },
  },
};
</script>

<style lang="scss">
.grid {
  display: grid;
  row-gap: 0.3rem;
}
.bk-table {
  table td {
    vertical-align: middle;
  }
}
</style>
