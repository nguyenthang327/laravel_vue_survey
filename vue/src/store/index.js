import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: "hihi",
    slug: "hihi-a",
    status: "draft",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png",
    description: "hey",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expired_at: "2021-12-20 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "from which country are you?",
        description: null,
        data: {
          options: [
            {
              uuid: "sadfasdf",
              text: "js",
            },
            {
              uuid: "sadfasdf2",
              text: "php",
            },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "from which country are you 2?",
        description: null,
        data: {
          options: [
            {
              uuid: "sadfasdf",
              text: "js",
            },
            {
              uuid: "sadfasdf2",
              text: "react",
            },
          ],
        },
      },
      {
        id: 3,
        type: "text",
        question: "from which country are you 2?",
        description: null,
        data: {},
      },
    ],
  },
  {
    id: 200,
    title: "ss",
    slug: "22-a",
    status: "active",
    image: "",
    description: "",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expired_at: "2021-12-20 18:00:00",
    questions: [],
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: [...tmpSurveys],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    logout({ commit }, user) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userData) => {
      state.user.data = userData.user;
      state.user.token = userData.token;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  modules: {},
});

export default store;
