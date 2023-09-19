const request = require('supertest');
const app = require('../app.js');

const idToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwNDNkYmJiOC0yMTFjLTQzZjItYWY3NC1mYjA2MmQzODU5NjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNzliZTZkYzEtZDc4ZS00YmJiLWIyMmItZDk5NGMwYTQxN2E3L3YyLjAiLCJpYXQiOjE2NzgyMTE0OTcsIm5iZiI6MTY3ODIxMTQ5NywiZXhwIjoxNjc4MjE1Mzk3LCJhY2N0IjowLCJhaW8iOiJFMlpnWUNpMStEM2xTMVZocTN2VDZrTFBGZE1hczlmK2UvbkQzZmViZDdiN21YVmFFNVVCIiwiYXV0aF90aW1lIjoxNjc4MjExNjQxLCJjdHJ5IjoiVVMiLCJlbWFpbCI6Im1zaWx2ZWlyYUBUTkMuT1JHIiwiZmFtaWx5X25hbWUiOiJTaWx2ZWlyYSIsImdpdmVuX25hbWUiOiJNYXR0aGV3IiwiaXBhZGRyIjoiMTg0Ljk2LjEzOS45MCIsIm5hbWUiOiJNYXR0aGV3IFNpbHZlaXJhIiwibm9uY2UiOiJhMTg0YjlmYS05YzM2LTQ4MjgtYjEwMy02ZmJkNzBhMzM4NDQiLCJvaWQiOiJlZmU1Y2I3Mi1mMDVmLTQxMWUtOWEwNS0yYzAyZTliNDIwMGUiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjk5NTAyMjY3LTE3NzAwMjczNzItMTgwMTY3NDUzMS00MTY4NCIsInByZWZlcnJlZF91c2VybmFtZSI6Im1zaWx2ZWlyYUBUTkMuT1JHIiwicmgiOiIwLkFTY0F3VzItZVk3WHUwdXlLOW1Vd0tRWHA3aTdQUVFjSWZKRHIzVDdCaTA0V1dnbkFGOC4iLCJzaWQiOiI2MDU2OTY0OS02ZGQxLTQ5ZDEtYjhlZS0zYzEzNGU4NDBmN2IiLCJzdWIiOiJxQXRTV0ZiTl9vTlpMLWNrSzJHOTNkNWQzU3lGZzFudkE2UFpCQzhEcExjIiwidGVuYW50X2N0cnkiOiJVUyIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJOQSIsInRpZCI6Ijc5YmU2ZGMxLWQ3OGUtNGJiYi1iMjJiLWQ5OTRjMGE0MTdhNyIsInVwbiI6Im1zaWx2ZWlyYUBUTkMuT1JHIiwidXRpIjoiUS1JR1dtSGc1a0toZW9kOTRWMGJBQSIsInZlciI6IjIuMCIsInZlcmlmaWVkX3ByaW1hcnlfZW1haWwiOlsibXNpbHZlaXJhQFROQy5PUkciXSwidmVyaWZpZWRfc2Vjb25kYXJ5X2VtYWlsIjpbIm1zaWx2ZWlyYUBUaGVOYXR1cmVDb25zZXJ2YW5jeTQ2Mi5tYWlsLm9ubWljcm9zb2Z0LmNvbSIsIm1zaWx2ZWlyYUBUaGVOYXR1cmVDb25zZXJ2YW5jeTQ2Mi5vbm1pY3Jvc29mdC5jb20iXSwieG1zX3RwbCI6ImVuIn0.MBshFayZO6xdQ_XCxAVgQ8OgmqlZFH86pgRsd1ELDYfHJqdd7P5y2K1Qf-MktLW9i9gFHtymTkiaWj4F8GqnxLoFVPu2IVMbIMFGrWGAGSWZmoEU5h4KuVOUbpBOVQc_ipfB_vW6zi2gUwx4dXrau_u2zUOobbmLle249LWJzEx7FT2gih9iLUgYQFLTY7G6K3mXu6ww-IHoWNsGsQcEP4EI2IV7Ig7MCmR3NjYs_Yb98J4yzNZq9d_r-rx7neD7bQ757kZlVoPXoN-aY-jYAFl6bZjjgqSztO0hVOs_e2Sfg_jWYjdrFa5w4xirlRo9cnJ8UlBy5FK62eYt2h7BHQ';

describe('GET API version route', () => {
  it('Should test the route for the hello world section of the app.', async () => {
    // console.log('look here', app);
    const response = await request(app).get('/v1').send({}).expect(200);
    expect(JSON.parse(response.text).msg).toBe(
      'Human Rights Screening Tool API Version 1'
    );
  });
});

// projects testing *******************************************************************************

describe('POST user project', () => {
  it('Should test the route for creating a new project.', async () => {
    // console.log('look here', app);
    const response = await request(app)
      .post('/v1/project')
      .set({ Authorization: idToken })
      .send({
        session_id: 'fortest',
        name: 'testOnly',
        description: 'testOnly',
      });
    const resBody = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(resBody.success).toBe(true);
    expect(resBody.data instanceof Array).toBe(true);
  });
});

let idForUpdateAndDelete = '';
describe('GET users projects', () => {
  it('Should test the route for a user getting the projects they have created.', async () => {
    const response = await request(app)
      .get('/v1/projects')
      .set({ Authorization: idToken });
    const resBody = JSON.parse(response.text);

    // get ID for delete and update
    const testVal = resBody.data.filter((val) => val.session_id == 'fortest');
    idForUpdateAndDelete = testVal[0].id;

    expect(response.status).toBe(200);
    expect(resBody.success).toBe(true);
    expect(resBody.data instanceof Array).toBe(true);
  });
});
describe('GET project by session ID ANON', () => {
  it('Should test the route for getting project by session ID for ANON users', async () => {
    // console.log('look here', app);
    const response = await request(app).get(
      `/v1/report/project/${idForUpdateAndDelete}`
    );
    const resBody = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(resBody.success).toBe(true);
    expect(resBody.data instanceof Array).toBe(true);
  });
});

describe('PUT user project', () => {
  it('Should test the route for updating an existing project.', async () => {
    const response = await request(app)
      .put(`/v1/project`)
      .set({ Authorization: idToken })
      .send({
        id: idForUpdateAndDelete,
        name: 'testOnly',
        description: 'testOnly',
      });
    const resBody = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(resBody.success).toBe(true);
    // expect(resBody.data instanceof Array).toBe(true);
  });
});

describe('DELETE user project', () => {
  it('Should test the route for deleting an existing project.', async () => {
    const response = await request(app)
      .delete(`/v1/project/${idForUpdateAndDelete}`)
      .set({ Authorization: idToken });
    const resBody = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(resBody.success).toBe(true);
    // expect(resBody.data instanceof Array).toBe(true);
  });
});

// indicator response testing *******************************************************************************
describe('POST indicator responses by session ID', () => {
  it('Should test the route for creating indicator responses by session ID', async () => {
    // console.log('look here', app);
    const response = await request(app)
      .post('/v1/indicator')
      .set({ Authorization: idToken })
      .send({
        session_id: 'fortest',
        indicator_id: '999',
        field_name: 'fortest',
        field_value: 'fortest',
      });
    const resBody = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(resBody.success).toBe(true);
    // expect(resBody.data instanceof Array).toBe(true);
  });
});

describe('GET indicator responses by session ID', () => {
  it('Should test the route for getting indicator responses by session ID', async () => {
    // console.log('look here', app);
    const response = await request(app)
      .get('/v1/indicators/fortest')
      .set({ Authorization: idToken });
    const resBody = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(resBody.success).toBe(true);
    expect(resBody.data instanceof Array).toBe(true);
  });
});

describe('GET indicator responses by session ID ANON', () => {
  it('Should test the route for getting indicator responses by session ID for ANON users', async () => {
    // console.log('look here', app);
    const response = await request(app).get(
      `/v1/report/indicators/${idForUpdateAndDelete}`
    );
    const resBody = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(resBody.success).toBe(true);
    expect(resBody.data instanceof Array).toBe(true);
  });
});
