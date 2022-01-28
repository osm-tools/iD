describe('Dummy-Auth function', function() {

    var dummy;

    beforeEach(function () {
        dummy = iD.dummyOauth();
    });

    it('should always be authenticated', function () {
        expect(dummy.authenticated()).to.be.true;
    });
});
