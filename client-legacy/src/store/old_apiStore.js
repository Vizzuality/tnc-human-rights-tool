// // this file is an API access layer used to keep all requests to our various API's in one file.
// // this way if we have to change things like headers, urls, or request libraries this can be done on one location
// // example pinia store for the sandbox
// import { defineStore } from 'pinia';
// import axios from 'axios';
// import { useUserAuthStore } from '../store/userAuthStore.js';

// export const useApiStore = defineStore('useApiStore', {
//   state: () => {
//     return {
//       apiUrl: 'https://hrt-api.ncsdata.org/v1/',
//     };
//   },
//   getters: {},
//   actions: {
//     // async protectedApiRequest(params) {
//     //   // const userAuthStore = useUserAuthStore();
//     //   // await userAuthStore.attemptSilentTokenRefresh();
//     //   // console.log(userAuthStore.idToken);
//     //   const url = this.apiUrl + params.route;
//     //   const body = params.body;
//     //   const options = {
//     //     headers: {
//     //       'Access-Control-Allow-Methods':
//     //         'GET, PUT,POST, DELETE, HEAD, OPTIONS',
//     //       // Authorization: userAuthStore.idToken,
//     //     },
//     //   };
//     //   if (params.type === 'GET') {
//     //     const response = await axios.get(url, options);
//     //     return response;
//     //   }
//     //   if (params.type === 'POST') {
//     //     const response = await axios.post(url, body, options);
//     //     return response;
//     //   }
//     //   if (params.type === 'PUT') {
//     //     const response = await axios.put(url, body, options);
//     //     return response;
//     //   }
//     // },
//     // async getUserProjects() {
//     //   const projects = await this.protectedApiRequest({
//     //     route: `projects`,
//     //     type: 'GET',
//     //   });
//     // },
//     // async createProject() {
//     //   const projects = await this.protectedApiRequest({
//     //     route: `project`,
//     //     type: 'POST',
//     //     body: {},
//     //   });
//     // },
//   },
// });
