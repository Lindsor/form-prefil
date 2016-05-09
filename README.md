# ln-form-prefil #

Parse a given query strning into its equivalent object.

## Loading ##
Have a form with `data-query="selector1 selector2..."` and Include script to prefiller.
```html
<script src="/src/to/prefil.js"></script>
```

## Prefil Function ##
```javascript
/**
 * Fills in the specified form by using the passed in query object.
 * If no parent form specified will use 'document' as the root.
 * @param  {Object} queryObj The query object to pull from.
 * @param  {Object} parent   The DOM parent element, if not supplied uses 'document'.
 */
window.prefill = function(queryObj, parent) {[CODE]}
```

## Using ##
Just load the module and call the prefiller with the specified object.
```html
<form>
  <input type="text" name="firstName" data-query="firstname">
  <select data-query="options" name="options">
    <option value="opt1">Option 1</option>
    <option value="opt2">Option 2</option>
    <option value="opt3">Option 3</option>
  </select>
  <label>
    Check 1
    <input type="checkbox" value="checkValue1" data-query="check1">
  </label>
</form>
```
```javascript
window.prefill({
  firstName: "My First Name",
  options: "opt2",
  check1: "checkValue1"
});
```
The code above will add a "My First Name" to the firstName input, select option 2, and click the checkbox with checkValue1 as a value.