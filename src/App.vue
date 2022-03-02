<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <h2>{{ title }}</h2>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" color="primary">
          <v-list-item @click="$router.push('/')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>양식 등록</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/list')">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>양식 관리</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    group: 0,
  }),
  mounted() {
    if (this.$route.path == "/list") {
      this.group = 1;
    } else {
      this.group = 0;
    }
  },
  computed: {
    title() {
      if (this.$route.path == "/") {
        return "바코드 양식 등록";
      } else if (this.$route.path == "/list") {
        return "바코드 양식 관리";
      } else {
        return "";
      }
    },
  },
};
</script>
