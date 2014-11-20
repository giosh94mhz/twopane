(function($) {
    /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
     */

    module('jQuery#twopane', {
        // This will run before each test in this module.
        setup: function() {
            this.elms = $('#qunit-fixture').children();
        }
    });

    function assertPaneOk(panel, assert) {
        assert.equal(panel.children().length, 2, "should have two children");
        assert.ok(panel.find('.giosh94mhz-l-pane').length, 'should create left panel');
        assert.ok(panel.find('.giosh94mhz-r-pane').length, 'should create right panel');
        assert.ok(panel.find('.ui-resizable').length, 'should create a resizable');
    }

    test('is chainable', function(assert) {
        assert.expect(1);
        // Not a bad test to run on collection methods.
        assert.strictEqual(this.elms.twopane(), this.elms, 'should be chainable');
    });

    test('can be created on empty element', function(assert) {
        var elm = this.elms.filter('#test-no-children');

        assert.expect(4);
        assertPaneOk(elm.twopane(), assert);
    });

    test('can be created on element with a single child', function(assert) {
        var elm = this.elms.filter('#test-one-child');
        var child = elm.children().get(0);

        assert.expect(5);
        assertPaneOk(elm.twopane(), assert);
        assert.strictEqual(elm.find('.giosh94mhz-l-pane').children().get(0), child, 'should use the first child as left content');
    });

    test('can be created on element with two children', function(assert) {
        var elm = this.elms.filter('#test-two-children');
        var leftChild = elm.children().get(0);
        var rightChild = elm.children().get(1);

        elm.twopane();

        assert.expect(6);
        assertPaneOk(elm, assert);
        assert.strictEqual(elm.find('.giosh94mhz-l-pane').children().get(0), leftChild, 'should use the first child as left content');
        assert.strictEqual(elm.find('.giosh94mhz-r-pane').children().get(0), rightChild, 'should use the second child as right content');
    });

    test('can be created on element with random children', function(assert) {
        var elm = this.elms.filter('#test-n-children');
        var leftChild = elm.children('.left').get(0);
        var rightChild = elm.children('.right').get(0);

        elm.twopane({
            left: '.left',
            right: '.right'
        });
        assert.expect(6);
        assertPaneOk(elm, assert);
        assert.strictEqual(elm.find('.giosh94mhz-l-pane').children().get(0), leftChild, 'should use the child with .left class as left content');
        assert.strictEqual(elm.find('.giosh94mhz-r-pane').children().get(0), rightChild, 'should use the child with .right class as right content');
    });

    test('can be created and destroyed correctly', function(assert) {
        var elm = this.elms.filter('#test-n-children');
        var childrenCount = elm.children().length;
        var orderedChildren = [];
        var leftChild = elm.find('.left').get(0);
        var rightChild = elm.find('.right').get(0);

        elm.children().each(function(i, elm) {
            orderedChildren.push(elm);
        });

        elm.twopane({
            left: '.left',
            right: '.right'
        });

        assert.expect(8 + childrenCount);

        assert.ok(childrenCount > 2, "should have more than two children for this test to work");

        assertPaneOk(elm, assert);

        elm.twopane("destroy");

        assert.equal(elm.children().length, orderedChildren.length, "should restore old children after destruction");

        elm.children().each(function(i, elm) {
            assert.equal(elm, orderedChildren[i], "should restore old children order after destruction (item "+i+")");
        });

        assert.strictEqual(elm.find('.left').get(0), leftChild, 'should restore the original left content');
        assert.strictEqual(elm.find('.right').get(0), rightChild, 'should restore the original right content');
    });

//    module('jQuery.twopane');

    module(':giosh94mhz-twopane selector', {
        // This will run before each test in this module.
        setup: function() {
            this.elms = $('#qunit-fixture').children();
        }
    });

    test('select all the nodes', function(assert) {
        // init all
        this.elms.twopane();

        assert.expect(1);
        assert.equal(
            this.elms.filter(':giosh94mhz-twopane').length,
            this.elms.length,
            "should select twopanes"
        );
    });

}(jQuery));
