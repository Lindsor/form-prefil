(function() {
  'use strict';

  /**
   * Processes the element as if its a selectable input such as checkbox or radio button.
   * @param  {Object} selectable     The input to process.
   * @param  {String} queryValue     The query value to use.
   */
  const processSelectable = function(selectable, queryValue) {
    var value = selectable.value;
    var event;
    var labels;

    if (value !== queryValue) return;

    labels = selectable.labels;

    if (labels.length === 0) {
      selectable.checked = true;
      return;
    }

    event = document.createEvent("Event");
    event.initEvent("click", true, true);

    labels[0].dispatchEvent(event);
  };

  /**
   * Processes the input as if it were a select element.
   * @param  {Object} select     The input object.
   * @param  {String} queryValue The query value to use.
   */
  const processSelect = function(select, queryValue) {
    var options = Array.prototype.slice.call(select.querySelectorAll("option"));
    var index = -1;
    var optionValue;

    for (var i = 0, l = options.length; i < l; i++) {
      if (queryValue === options[i].value) {
        index = i;
        break;
      }
    }

    //Only set the index if its at least 0
    if (index >= 0) {
      select.selectedIndex = index;
    }
  };

  /**
   * Fills in the specified form by using the passed in query object.
   * If no parent form specified will use 'document' as the root.
   * @param  {Object} queryObj The query object to pull from.
   * @param  {Object} parent   The DOM parent element.
   */
  window.prefill = function(queryObj, parent) {

    parent = parent || document;

    if (!queryObj) return;

    Object.keys(queryObj).forEach(function(key) {
      var value;
      var elements = parent.querySelectorAll("[data-query~='" + key + "']");

      value = queryObj[key] || "";

      if (!value || value.length <= 0) return;

      Array.prototype.slice.call(elements).forEach(function(input) {
        var type = (input.getAttribute("data-query-type") || input.type || input.tagName).toLowerCase();

        //Process the value correctly.
        if (/select/.test(type)) {
          processSelect(input, value);
        } else if (/radio|checkbox/.test(type)) {
          processSelectable(input, value);
        } else {
          input.value = value;
        }
      });
    });
  };
})();
