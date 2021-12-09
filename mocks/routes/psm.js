var PSM_ENTITIES = require('../dummies/psm-entities.js').PSM_ENTITIES;

var PSM_TAG_PROPERTY = require('../dummies/psm-tag-property.js').PSM_TAG_PROPERTY;

module.exports = [
    {
        id: 'get-tile-data', // id of the route
        url: '/api/0.6/map.json', // url in express format
        method: 'GET', // HTTP method
        variants: [
            {
              id: 'success', // id of the variant
              response: {
                status: 200, // status to send
                body: PSM_ENTITIES, // body to send
              },
            },
            {
                id: 'error', // id of the variant
                response: {
                  status: 400, // status to send
                  body: {
                    // body to send
                    message: 'Error',
                  },
                },
            },
        ]
    },
    {
      id: 'get-tag-info-key', // id of the route
      url: '/api/4/key/values', // url in express format
      method: 'GET', // HTTP method
      variants: [
          {
            id: 'success', // id of the variant
            response: {
              status: 200, // status to send
              body: PSM_TAG_PROPERTY, // body to send
            },
          },
          {
              id: 'error', // id of the variant
              response: {
                status: 400, // status to send
                body: {
                  // body to send
                  message: 'Error',
                },
              },
          },
      ]
  }
];
