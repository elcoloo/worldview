const loadAndSkipTour = require('../../reuseables/skip-tour.js').loadAndSkipTour;
const localQuerystrings = require('./querystrings.js');
const TIME_LIMIT = 10000;
/**
 * selectors
 */
const runningDataLabel = '.wv-running-label';

module.exports = {
  before: function (client) {
    loadAndSkipTour(client, TIME_LIMIT);
  },
  'Load Layer with continuous palette': function(client) {
    client.url(client.globals.url + localQuerystrings.continuousDataLayers);
    client.waitForElementVisible('.wv-palettes-colorbar', TIME_LIMIT);
  },
  'Veryify running data label is correct when mouse hovers data': function(client) {
    client.getElementSize('#wv-map-geographic', (size) => {
      // var x = size.value.width / 2;
      // var y = size.value.height / 2;
      console.log(size.value);
      client.pause(4000);
      client.click('body');
      client.moveToElement('#guitarpick', -1, -1, () => {
        client.pause(1000);
        client.expect.element('.wv-running').to.be.present;
        client.getText(runningDataLabel, function (text) {
          this.assert.equal(text.value, '270.3 – 270.9 K');
        });
        // Firefox hack
      });
    });
  }
};
// Feature: Running Data
//   When I hover over a data layer, I should see the values I'm hovering over displayed in the layers tab

// @wip
// Scenario: Running data on continuous layers
//   Given Worldview is in "continuous data layers" state
//   Then label says "270.9 – 271.6 K" when mouse is in the center
//   And label says "260.9 – 261.5 K" when hovering on colorbar

// @wip
// Scenario: Running data on multiple data layers
//   Given Worldview is in "multiple data layers" state
//   Then label says "0.070 – 0.075" when mouse is in the center
//   And label says "0.380 – 0.385" when hovering on colorbar
