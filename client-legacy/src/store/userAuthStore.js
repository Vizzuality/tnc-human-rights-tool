// this file is an API access layer used to keep all requests to our various API's in one file.
// this way if we have to change things like headers, urls, or request libraries this can be done on one location
// example pinia store for the sandbox
import { protectedQueryDataApi } from '../helpers/apiAccess';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useHrtStore } from './hrtStore';
import router from '../router/router';

let redirectUri = '';
const host = window.location.host;
if (host == 'localhost:5173') {
  // LAMS Homepage staging branch
  redirectUri = 'http://localhost:5173/';
} else if (host == 'ncs-human-rights-screening-tool.netlify.app') {
  redirectUri = 'https://ncs-human-rights-screening-tool.netlify.app/';
}

export const useUserAuthStore = defineStore('userAuthStore', {
  state: () => {
    return {
      redirectUri: redirectUri,
      // redirectUri: 'http://localhost:5173/',
      isLoggedIn: false,
      isEditSaving: false,
      username: '',
      userInfo: '',
      email: '',
      idToken: '',
      projects: [],
    };
  },
  getters: {
    userProjects() {
      return this.projects;
    },
  },
  actions: {
    login() {
      this.getUsersProjects()
        .then(async () => {
          router.push('/');
          this.username = "johndoe";
          this.email = "johndoe@vizzuality.com";
          this.userid = "johndoe";
          this.userInfo = "johndoeUser";
          this.isLoggedIn = true;
          // await this.getUsersProjects();
        });
    },
    logout() {
      this.username = null;
      this.email = null;
      this.userid = null;
      this.userInfo = null;
      this.isLoggedIn = false;
      router.push('/');
    },
    async attemptSilentTokenRefresh() {
      //since we're not using real tokens, we don't actually need this
    },

    async getUsersProjects() {
      try {
        const projects = await protectedQueryDataApi({
          type: 'GET',
          route: 'projects',
        });
        this.projects = projects.data.data;
      } catch (error) {
        console.log('Could not GET user projects');
      }
    },
    async createUserProject(params) {
      const hrtStore = useHrtStore();
      hrtStore.setSessionId();
      const projects = await protectedQueryDataApi({
        type: 'POST',
        route: 'project',
        body: {
          session_id: hrtStore.sessionId,
          name: params.name,
          description: params.description,
        },
      });
      console.log(projects);
      console.log('in here', projects.status);
      if (projects.status == 200) {
        console.log('in here', projects.status);
        await this.getUsersProjects();
        return true;
      }
    },
    async updateUserProject(params) {
      const hrtStore = useHrtStore();
      const projects = await protectedQueryDataApi({
        type: 'PUT',
        route: 'project',
        body: {
          id: params.id,
          name: params.name,
          description: params.description,
        },
      });
      console.log(projects);
      console.log('in here', projects.status);
      if (projects.status == 200) {
        console.log('in here', projects.status);
        await this.getUsersProjects();
        return true;
      }
    },
    async deleteUserProject(id) {
      const projects = await protectedQueryDataApi({
        type: 'DELETE',
        route: `project/${id}`,
        body: {
          id: id,
        },
      });
      if (projects.status == 200) {
        console.log('in here', projects.status);
        await this.getUsersProjects();
        return true;
      }
    },
  },
});
