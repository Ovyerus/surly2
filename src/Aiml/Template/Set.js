const BaseNode = require('../BaseNode');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-set
 *
 * The set element instructs the AIML interpreter to set the value of a
 * predicate to the result of processing the contents of the set element. The
 * set element has a required attribute name, which must be a valid AIML
 * predicate name. If the predicate has not yet been defined, the AIML
 * interpreter should define it in memory.
 *
 * The AIML interpreter should, generically, return the result of processing the
 * contents of the set element. The set element must not perform any text
 * formatting or other "normalization" on the predicate contents when returning
 * them.
 *
 * The AIML interpreter implementation may optionally provide a mechanism that
 * allows the AIML author to designate certain predicates as
 * "return-name-when-set", which means that a set operation using such a
 * predicate will return the name of the predicate, rather than its captured
 * value. (See [9.2].)
 *
 * A set element may contain any AIML template elements.
 *
 * <!-- Category: aiml-template-elements -->
 *
 * <aiml:set name = aiml-predicate-name >
 *    <!-- Contents: aiml-template-elements -->
 * </aiml:set>
 * 
 * @implements {BaseNode}
 */
class Set extends BaseNode {
    constructor(node, burly) {
        super(node, burly);
        this.type = 'set';
        this.name = node.attr('name') ? node.attr('name').value() : node.attr('var') ? node.attr('var').value() : node.text();
    }

    getText() {
        this.burly.environment.setVariable(this.name, this.evaluateChildren());

        // @todo implement return-name-when-set. See AIML spec section 7.4.1
        return '';
    }
}

module.exports = Set;