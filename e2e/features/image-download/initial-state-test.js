const { loadAndSkipTour } = require('../../reuseables/skip-tour');
const { switchProjection } = require('../../reuseables/switch-projection');
const {
  openImageDownloadPanel,
  closeImageDownloadPanel
} = require('./reuseables');

const TIME_LIMIT = 10000;

module.exports = {
  before: function (client) {
    loadAndSkipTour(client, TIME_LIMIT);
  },

  after: function(client) {
    client.end();
  },

  'Check resolutions': function(c) {
    openImageDownloadPanel(c);
    let expected = [
      '30m',
      '60m',
      '125m',
      '250m',
      '500m',
      '1km',
      '5km',
      '10km']
      .join('\n');
    c.expect.element('#wv-image-resolution').text.to.equal(expected);
  },

  'Check formats': function(c) {
    expected = [
      'JPEG',
      'PNG',
      'GeoTIFF',
      'KMZ']
      .join('\n');
    c.expect.element('#wv-image-format').text.to.equal(expected);
  },

  'Check worldfile option': function(c) {
    expected = [
      'No',
      'Yes'
    ].join('\n');
    c.expect.element('#wv-image-worldfile').text.to.equal(expected);
  },

  'Check arctic formats': function(c) {
    closeImageDownloadPanel(c);
    switchProjection(c, 'arctic');
    openImageDownloadPanel(c);
    expected = [
      'JPEG',
      'PNG',
      'GeoTIFF']
      .join('\n');
    c.expect.element('#wv-image-format').text.to.equal(expected);
  },

  'Check antarctic formats': function(c) {
    closeImageDownloadPanel(c);
    switchProjection(c, 'antarctic');
    openImageDownloadPanel(c);
    expected = [
      'JPEG',
      'PNG',
      'GeoTIFF']
      .join('\n');
    c.expect.element('#wv-image-format').text.to.equal(expected);
    closeImageDownloadPanel(c);
  }
};