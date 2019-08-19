const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should;
const Tweet = require('../controllers/tweet.controller');
const tweet = new Tweet();

describe('#tweet.saveTweet()', function() {

    context('',function() {
        it('',function() {
            let result = tweet.saveTweet({});
            expect(result.status).to.deep.eql(422);
        });
    });
});