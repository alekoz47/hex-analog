module.exports = [
  {
    "type": "heading",
    "defaultValue": "Watchface Configuration"
  },
  {
    "type": "text",
    "defaultValue": "Hex Color"
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Additional Data"
      },
      {
        "type": "toggle",
        "messageKey": "showHex",
        "defaultValue": "false",
        "label": "Show Hex Value?"
      },
      {
        "type": "toggle",
        "messageKey": "showDate",
        "defaultValue": "false",
        "label": "Show Date?"
      }
    ]
  },
  {
    "type": "submit",
    "defaultValue": "Save Settings"
  }
];
