<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
import componentInputText from "../components/input/InputText.vue";
import componentInputEmail from "../components/input/InputEmail.vue";
import componentInputDate from "../components/input/InputDate.vue";
import componentInputTel from "../components/input/InputTel.vue";
import componentSelectOption from "../components/input/SelectOption.vue";
</script>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AccountSettings",
  data() {
    return {
      username: "",
      contact: {
        email: "",
        phone: "",
      },
      details: {
        firstName: "",
        lastName: "",
        birthdate: "",
        country: "",
        language: "",
        translationLanguage: "",
      },

      newUsername: "",
      newContact: {
        newEmail: "",
        newPhone: "",
      },
      newDetails: {
        newFirstName: "",
        newLastName: "",
        newBirthdate: "",
        newCountry: "",
        newLanguage: "",
        newTranslationLanguage: "",
      },

      messages: "",
    };
  },
  computed: {
    ...mapGetters(["getUserName", "getToken"]),
  },
  mounted() {
    this.userAccountData();
  },
  methods: {
    ...mapActions(["accountData", "clearNullData", "accountUpdate"]),

    async userAccountData() {
      try {
        const res = await this.accountData({
          data: {
            username: this.getUserName,
            token: this.getToken,
          },
        });

        this.messages = res?.messages || res?.data.messages;

        this.username = res.data.username;

        this.contact.email = res.data.contact.email;
        this.contact.phone = res.data.contact.phone;

        this.details.firstName = res.data.details.firstName;
        this.details.lastName = res.data.details.lastName;
        this.details.birthdate = res.data.details.birthdate;
        this.details.country = res.data.details.country;
        this.details.language = res.data.details.language;
        this.details.translationLanguage = res.data.details.translationLanguage;
      } catch (error) {
        // console.error(`Component "${this.$options.name}" error:`, error); // * debug
        this.messages = ["Server error, please try later."];
      }
    },

    async userProfileUpdate() {
      try {
        const value = await this.clearNullData({
          username: this.newUsername,
          contact: {
            email: this.newContact.newEmail,
            phone: this.newContact.newPhone,
          },
          details: {
            firstName: this.newDetails.newFirstName,
            lastName: this.newDetails.newLastName,
            birthdate: this.newDetails.newBirthdate,
            country: this.newDetails.newCountry,
            language: this.newDetails.newLanguage,
            translationLanguage: this.newDetails.newTranslationLanguage,
          },
        });

        const res = await this.accountUpdate({ data: value });

        this.messages = res?.message || res?.data.message;

        if (res.status == 200)
          setTimeout(() => {
            this.$router.push(".");
          }, 1500);
      } catch (error) {
        // console.error(`Component "${this.$options.name}" error:`, error); // * debug
        this.messages = ["Server error, please try later."];
      }
    },
  },
};
</script>

<template>
  <div
    class="container w-10/12 mx-auto my-3 p-5 text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-800 rounded-md"
  >
    <componentElementTitle :textName="t('page.accountSettings.title')" />
    <div class="my-3 p-2 rounded-md text-center">
      <ul v-for="(item, index) in messages" :key="index">
        <li>
          {{ item }}
        </li>
      </ul>
    </div>
    <form
      @submit.prevent="userProfileUpdate"
      class="flex flex-col w-3/4 mx-auto gap-3"
    >
      <componentInputText
        :textName="t('page.accountSettings.input.userName')"
        :idName="'username'"
        :required="false"
        :placeholder="username"
        v-model:valueData="newUsername"
      />
      <componentInputEmail
        :textName="t('page.accountSettings.input.email')"
        :idName="'email'"
        :required="false"
        :placeholder="contact.email"
        v-model:valueData="newContact.newEmail"
      />
      <componentInputTel
        :textName="t('page.accountSettings.input.phone')"
        :idName="'phone'"
        :required="false"
        :placeholder="contact.phone"
        v-model:valueData="newContact.newPhone"
      />
      <componentInputText
        :textName="t('page.accountSettings.input.firstName')"
        :idName="'firstName'"
        :required="false"
        :placeholder="details.firstName"
        v-model:valueData="newDetails.newFirstName"
      />
      <componentInputText
        :textName="t('page.accountSettings.input.lastName')"
        :idName="'lastName'"
        :required="false"
        :placeholder="details.lastName"
        v-model:valueData="newDetails.newLastName"
      />
      <componentInputDate
        :textName="t('page.accountSettings.input.birthdate')"
        :idName="'birthdate'"
        :required="false"
        :placeholder="details.birthdate"
        v-model:valueData="newDetails.newBirthdate"
      />
      <componentInputText
        :textName="t('page.accountSettings.input.country')"
        :idName="'country'"
        :required="false"
        :placeholder="details.country"
        v-model:valueData="newDetails.newCountry"
      />
      <componentSelectOption
        :textName="t('page.accountSettings.input.language')"
        :idName="'language'"
        :required="false"
        :placeholder="details.language"
        :selectValue="[
          ['EN_en', 'EN'],
          ['TR_tr', 'TR'],
        ]"
        v-model:valueData="newDetails.newLanguage"
      />
      <componentSelectOption
        :textName="t('page.accountSettings.input.translationLanguage')"
        :idName="'translationLanguage'"
        :required="false"
        :placeholder="details.translationLanguage"
        :selectValue="[
          ['EN_en', 'EN'],
          ['TR_tr', 'TR'],
        ]"
        v-model:valueData="newDetails.newTranslationLanguage"
      />
      <div
        class="flex sm:flex-row flex-col gap-3 justify-around mt-4 items-center"
      >
        <componentElementButtonRouterLink
          :url="'./'"
          :textName="t('page.accountSettings.button.back')"
          :class="'w-full block'"
        />
        <componentButton
          :textName="t('page.accountSettings.button.save')"
          :class="'w-full block'"
        />
      </div>
    </form>
  </div>
</template>
