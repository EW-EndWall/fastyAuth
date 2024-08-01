<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentInputPassword from "../components/input/InputPassword.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
</script>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PasswordEdit",
  data() {
    return {
      password: "",
      newPassword: "",

      message: "",
    };
  },
  computed: {
    ...mapGetters(["getId"]),
  },
  methods: {
    ...mapActions(["passwordEdit"]),
    async userPasswordEdit() {
      try {
        const res = await this.passwordEdit({
          params: {
            id: this.getId,
          },
          data: {
            password: this.password,
            newPassword: this.newPassword,
          },
        });

        this.message = res?.data?.message;

        setTimeout(() => {
          if (res.status == 200) this.$router.push("/account");
        }, 1500);
      } catch (error) {
        // console.error(`Component "${this.$options.name}" error:`, error); // * debug
        this.message = "Server error, please try later.";
      }
    },
  },
};
</script>

<template>
  <div
    class="container w-10/12 mx-auto my-3 p-5 text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-800 rounded-md"
  >
    <componentElementTitle :textName="'Password Settings'" />

    <div class="my-3 p-2 rounded-md text-center">
      {{ message }}
    </div>

    <form
      @submit.prevent="userPasswordEdit"
      class="flex flex-col w-3/4 mx-auto gap-3"
    >
      <componentInputPassword
        :textName="'Password'"
        :idName="'password'"
        :required="true"
        v-model:valueData="password"
      />
      <componentInputPassword
        :textName="'New Password'"
        :idName="'newPassword'"
        :required="true"
        v-model:valueData="newPassword"
      />
      <div
        class="flex sm:flex-row flex-col gap-3 justify-around mt-4 items-center"
      >
        <componentElementButtonRouterLink
          :url="'./'"
          :textName="'Back'"
          :class="'w-full block'"
        />
        <componentButton :textName="'Save'" :class="'w-full block'" />
      </div>
    </form>
  </div>
</template>
