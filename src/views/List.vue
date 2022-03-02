<template>
  <v-container>
    <h2>바코드 양식</h2>
    <v-row class="my-1" justify="space-between">
      <v-col>
        <v-btn class="mr-2" @click="removeSelected">선택 삭제</v-btn>
        <v-btn @click="removeAll">전체 삭제</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="addNew"> 새 양식 등록 </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :disable-pagination="true"
      no-data-text="바코드 양식이 없습니다"
      show-select
      class="elevation-1"
    >
      <template v-slot:[`item.name`]="{ item }">
        <v-btn text @click="setBasicFormat(item)">{{ item.name }} </v-btn>
        <v-chip
          class="ml-2"
          small
          label
          v-if="basicFormat.id === item.id"
          color="primary"
          >기본 양식</v-chip
        >
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon class="mr-2" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:[`item.move`]="{ item }">
        <v-icon class="mr-2" @click="moveUp(item)"> mdi-chevron-up </v-icon>
        <v-icon class="mr-2" @click="moveDown(item)"> mdi-chevron-down </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      headers: [
        { text: "양식명", value: "name" },
        { text: "등록일", value: "updatedAt" },
        { text: "수정/삭제", value: "actions", sortable: false },
        { text: "순서 변경", value: "move", sortable: false },
      ],
      selected: [],
      items: [],
      basicFormat: { id: "" },
    };
  },
  mounted() {
    this.items = JSON.parse(localStorage.getItem("db")) || [];
    this.basicFormat = JSON.parse(localStorage.getItem("basic_format")) || {
      id: "",
    };
  },
  methods: {
    moveUp(item) {
      const index = this.items.findIndex((el) => el.id === item.id);

      if (index > 0) {
        let tmpItems = this.items.slice();
        let tmp = this.items[index - 1];
        tmpItems[index - 1] = this.items[index];
        tmpItems[index] = tmp;

        this.items = tmpItems;

        localStorage.setItem("db", JSON.stringify(this.items));
      }
    },
    moveDown(item) {
      const index = this.items.findIndex((el) => el.id === item.id);

      if (index !== this.items.length - 1) {
        let tmpItems = this.items.slice();
        let tmp = this.items[index + 1];
        tmpItems[index + 1] = this.items[index];
        tmpItems[index] = tmp;

        this.items = tmpItems;
        localStorage.setItem("db", JSON.stringify(this.items));
      }
    },
    addNew() {
      this.$store.commit("setDoNotLoad", true);
      this.$router.push("/");
    },
    editItem(item) {
      this.$store.commit("setEditItem", item);
      this.$router.push("/");
    },
    deleteItem(item) {
      const db = JSON.parse(localStorage.getItem("db"));

      const toRemove = [item.id];
      const newDb = db.filter((el) => !toRemove.includes(el.id));

      localStorage.setItem("db", JSON.stringify(newDb));
      window.location.reload(true);
    },
    removeSelected() {
      const db = JSON.parse(localStorage.getItem("db"));

      const toRemove = this.selected.map((el) => el.id);
      const newDb = db.filter((el) => !toRemove.includes(el.id));

      if (localStorage.getItem("basic_format")) {
        const bF = JSON.parse(localStorage.getItem("basic_format"));
        if (toRemove.includes(bF.id)) {
          localStorage.removeItem("basic_format");
        }
      }
      localStorage.setItem("db", JSON.stringify(newDb));
      window.location.reload(true);
    },
    removeAll() {
      localStorage.clear();
      window.location.reload(true);
    },
    setBasicFormat(item) {
      localStorage.setItem("basic_format", JSON.stringify(item));
      this.basicFormat = JSON.parse(localStorage.getItem("basic_format")) || {
        id: "",
      };
    },
  },
};
</script>

<style></style>
