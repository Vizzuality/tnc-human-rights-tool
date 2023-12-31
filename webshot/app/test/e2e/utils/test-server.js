const chai = require('chai');
const chaiHttp = require('chai-http');

let requester;

chai.use(chaiHttp);

exports.getTestServer = async function getTestServer() {
    if (requester) {
        return requester;
    }

    const serverPromise = require('../../../src/app');
    const { server } = await serverPromise();
    requester = chai.request(server).keepOpen();
    return requester;
};

exports.closeTestAgent = function closeTestAgent() {
    if (!requester) {
        return;
    }
    requester.close();
    requester = null;
};
