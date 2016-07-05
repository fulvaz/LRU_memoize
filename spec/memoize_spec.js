var memoize = require("..").memoize;
var assert = require("chai").assert;

describe("memoize", function () {
    it("should cache results", function () {
        var i = 0;

        function identity(n) {
            i = i + 1;
            return n;
        }

        memoizedIdentity = memoize(identity);

        assert.equal(memoizedIdentity(1), 1);
        assert.equal(memoizedIdentity(1), 1);
        assert.equal(i, 1);

        assert.equal(memoizedIdentity(2), 2);
        assert.equal(memoizedIdentity(2), 2);
        assert.equal(i, 2);

        assert.equal(memoizedIdentity(1), 1);
        assert.equal(memoizedIdentity(2), 2);
        assert.equal(i, 2);
    });

    it("should use cache_key argument to calculate cache key", function () {
        function identity(o) {
            return o;
        }

        memoizedIdentity = memoize(identity, function (o) {
            return o[0];
        });

        var user1 = [1, "Howard"];
        var user2 = [1, "Howard Yeh"];
        assert.deepEqual(memoizedIdentity(user1), user1);
        assert.deepEqual(memoizedIdentity(user2), user1);

    });

    it("should delete some element if cache is full", function () {
        var i = 0;
        function identity(n) {
            i = i + 1;
            return n;
        }

        memoizedIdentity = memoize(identity);
        
        // fill the caches
        for (var j=0; j<memoize.caches.MAX_LENGTH; j++) {
            memoizedIdentity(j); 
        }

        // get result from caches, but not the first one
        for (var j=1; j<memoize.caches.MAX_LENGTH; j++) {
            memoizedIdentity(j);
        }

        // calc one more result
        memoizedIdentity(memoize.caches.MAX_LENGTH + 1);
        
        // so the cache result of 0 will be deleted!
        assert.equal(memoize.caches[0], undefined);
    })
});
