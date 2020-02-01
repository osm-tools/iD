import { json as d3_json } from 'd3-fetch';
import { data as _data } from '../../data';  // prebundled data


//
// The coreData module fetches data from JSON files
//
export function coreData(context) {
  let _module = {};
  let _inflight = {};
  let _fileMap = {
    'address_formats': 'data/address_formats.min.json',
    'deprecated': 'data/deprecated.min.json',
    'discarded': 'data/discarded.min.json',
    'imagery': 'data/imagery.min.json',
    'intro_graph': 'data/intro_graph.min.json',
    'languages': 'data/languages.min.json',
    'locales': 'data/locales.min.json',
    'nsi_brands': 'https://cdn.jsdelivr.net/npm/name-suggestion-index@3/dist/brands.min.json',
    'nsi_filters': 'https://cdn.jsdelivr.net/npm/name-suggestion-index@3/dist/filters.min.json',
    'oci_features': 'https://cdn.jsdelivr.net/npm/osm-community-index@2/dist/features.min.json',
    'oci_resources': 'https://cdn.jsdelivr.net/npm/osm-community-index@2/dist/resources.min.json',
    'phone_formats': 'data/phone_formats.min.json',
    'shortcuts': 'data/shortcuts.min.json',
    'territory_languages': 'data/territory_languages.min.json',
    'wmf_sitematrix': 'https://cdn.jsdelivr.net/npm/wmf-sitematrix@0.1/wikipedia.min.json'
  };


  // Returns a Promise to fetch data
  // (resolved with the data if we have it already)
  _module.get = (which) => {
    if (_data[which]) {
      return Promise.resolve(_data[which]);
    }

    const file = _fileMap[which];
    const url = file && context.asset(file);
    if (!url) {
      return Promise.reject(`Unknown data file for "${which}"`);
    }

    let prom = _inflight[url];
    if (!prom) {
      _inflight[url] = prom = d3_json(url)
        .then(result => {
          delete _inflight[url];
          if (!result) {
            throw new Error(`No data loaded for "${which}"`);
          }
          _data[which] = result;
          return result;
        })
        .catch(err => {
          delete _inflight[url];
          throw err;
        });
    }

    return prom;
  };


  // Accessor for the file map
  _module.fileMap = function(val) {
    if (!arguments.length) return _fileMap;
    _fileMap = val;
    return _module;
  };


  return _module;
}
