// this file is an API access layer used to keep all requests to our various API's in one file.
// this way if we have to change things like headers, urls, or request libraries this can be done on one location
import axios from 'axios';
import { useHrtStore } from '../store/hrtStore';
import { useUserAuthStore } from '../store/userAuthStore';

export const queryUserResponseAPI = async (params) => {};
export const protectedQueryUserResponseAPI = async (params) => {};
export const queryContentApi = async (params) => {
  const hrtStore = useHrtStore();
  if (params.type === 'GET') {
    try {
      const response = await axios.get(hrtStore.contentApiUrl + params.urlSlug);
      return response.data;
    } catch (error) {
      throw new Error(
        'A response could not be obtained from our server. Please check your URL and Parameters.'
      );
    }
  } else {
    throw new Error('Only GET requests can be made to the Content API');
  }
};
export const protectedQueryDataApi = async (params) => {
  const hrtStore = useHrtStore();
  const userAuthStore = useUserAuthStore();
  await userAuthStore.attemptSilentTokenRefresh();
  const url = hrtStore.dataApiUrl + params.route;
  const body = params.body;
  const options = {
    headers: {
      'Access-Control-Allow-Methods': 'GET, PUT,POST, DELETE, HEAD, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      Authorization: userAuthStore.idToken,
    },
  };
  if (params.type === 'GET') {
    try {
      const response = await axios.get(url, options);
      return response;
    } catch (error) {
      throw new Error(
        'A response could not be obtained from our server. Please check your URL and Parameters.'
      );
    }
  } else if (params.type === 'POST') {
    userAuthStore.isEditSaving = true;
    try {
      const response = await axios.post(url, body, options);
      if (response.status == 200) {
        userAuthStore.isEditSaving = false;
        return response;
      }
    } catch (error) {
      userAuthStore.isEditSaving = 'error';
      throw new Error(
        'A response could not be obtained from our server. Please check your URL and Parameters.'
      );
    }
  } else if (params.type === 'PUT') {
    try {
      const response = await axios.put(url, body, options);
      console.log('update', response);
      return response;
    } catch (error) {
      throw new Error(
        'A response could not be obtained from our server. Please check your URL and Parameters.'
      );
    }
  } else if (params.type === 'DELETE') {
    try {
      const response = await axios.delete(url, options);
      return response;
    } catch (error) {
      throw new Error(
        'A response could not be obtained from our server. Please check your URL and Parameters.'
      );
    }
  } else {
    throw new Error('There was a problem with the data API request');
  }
};
export const queryDataApi = async (params) => {
  const hrtStore = useHrtStore();
  const url = hrtStore.dataApiUrl + params.route;
  const body = params.body;
  const options = {
    headers: {
      'Access-Control-Allow-Methods': 'GET, PUT,POST, DELETE, HEAD, OPTIONS',
      'Access-Control-Allow-Origin': '*',
    },
  };
  if (params.type === 'GET') {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw new Error(
        'A response could not be obtained from our server. Please check your URL and Parameters.'
      );
    }
  } else if (params.type === 'POST') {
    try {
      const response = await axios.post(url, body, options);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(
        'A response could not be obtained from our server. Please check your URL and Parameters.'
      );
    }
  } else {
    throw new Error('There was a problem with the data API request');
  }
};

// export const queryIndicatorResponsesApi = async (params) => {
//   const hrtStore = useHrtStore();
//   console.log(params);
//   const responsesEndpoint = `https://hrt-api.ncsdata.org/v1/indicators/${params.sessionId}`;
//   // V1StGXR8_Z5jdHi6B-myT
//   // o3FtGpE9_A2tdHeh7-jr9
//   // GBft9RyT_S3j8He0jv-qv1
//   if (params.type === 'GET' && params.sessionId) {
//     try {
//       const response = await axios.get(responsesEndpoint);
//       //const response = await axios.get(hrtStore.responsesApiUrl + params.urlSlug);
//       return response.data;
//     } catch (error) {
//       throw new Error(
//         'A response could not be obtained from our server. Please check your URL and Parameters.'
//       );
//     }
//   } else {
//     throw new Error('Only GET requests can be made to the HRT Responses API');
//   }
// };

// https://api.mockaroo.com/api/generate.json?key=89ba7f60&schema=hrt_indicators_responses

// API CALLS WE NEED
/*
1. GET indicatorsResponses by sessionId
- Input parameters - sessionId
- Returns collection of indicator responses


2. GET researchResponses by sessionId 
- IGNORE for now. will be based on what we do for indicators

3. GET human_rights_projects by user_id
- IGNORE til we finish TNC login stuff
- Input parameters - user_id
- Returns collection of human rights projects
- Display on home page in table - project_name, date_created, make project_name link to session id
- If user clicks on project name, use session ID to call (1) above to get indicator responses

4. POST indicatorResponses
- Input parameters sessionId, indicator_id (just called id, NOT indicator_code, that's just used for display), field_name, field_value

5. POST human_rights_projects
- IGNORE til we finish TNC login stuff


My project name - link to session id

*/
