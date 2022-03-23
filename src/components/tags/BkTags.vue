<template>
  <div>
    <div class="columns">
      <div class="column is-8">
        <h1 class="title">Tags</h1>
      </div>
      <div class="column">
        <div class="is-flex is-justify-content-flex-end">
          <b-button @click="onAction(false)" type="is-primary"
            >Add Tag</b-button
          >
        </div>
      </div>
    </div>
    <b-table striped :data="tags">
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
      <b-table-column field="action" label="Edit/Delete" v-slot="{ row }">
        <b-button
          @click="onAction(true, row)"
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
import TagForm from "./TagForm.vue";
import { tagService } from "@/_services/tag.service";
export default {
  name: "BkTags",
  data() {
    return {
      deleteId: "",
    };
  },
  computed: {
    ...mapGetters("tag", ["tags"]),
  },
  created() {
    this.fetchTags();
  },
  methods: {
    ...mapActions("tag", ["fetchTags"]),
    onAction(isEdit = false, item = {}) {
      this.$buefy.modal.open({
        parent: this,
        component: TagForm,
        hasModalCard: true,
        canCancel: false,
        props: {
          isEdit,
          item,
        },
        events: {
          fetch: () => {
            this.fetchTags();
          },
        },
      });
    },
    onDelete(id, isSub = false) {
      this.$buefy.dialog.confirm({
        title: "Deleting tag",
        message: "Are you sure you want to <b>delete</b> this tag?",
        confirmText: "Delete tag",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          try {
            await tagService.delete(id);
            this.$buefy.toast.open({
              message: "Tag deleted!",
              type: "is-success",
            });
            this.fetchTags();
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
</style>
