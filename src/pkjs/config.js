module.exports = [
	{
		"type": "heading",
    	"defaultValue": "Watchface Configuration"
  	},
  	{
    	"type": "text",
   		"defaultValue": "Simple"
  	},
  	{
    	"type": "section",
    	"items": [
      		{
        		"type": "select",
        		"messageKey": "handColor",
				"options": [
					{
						"label": "White",
						"value": "white"
					},
					{
						"label": "Red",
						"value": "red"
					},
					{
						"label": "Blue",
						"value": "blue"
					}
				],
        		"defaultValue": "white",
        		"label": "Watchhand Color?"
      		},
    	]
	},
  	{
    	"type": "submit",
    	"defaultValue": "Save Settings"
  	}
];