const messageBody = {
    "username": "Error notifier", // This will appear as user name who posts the message
    "text": "User failed to login 3 times. Account locked for 15 minutes.", // text
    "icon_emoji": ":bangbang:", // User icon, you can also use custom icons here
    "attachments": [{ // this defines the attachment block, allows for better layout usage
      "color": "#eed140", // color of the attachments sidebar.
      "fields": [ // actual fields
        {
          "title": "Environment", // Custom field
          "value": "Production", // Custom value
          "short": true // long fields will be full width
        },
        {
          "title": "User ID",
          "value": "331",
          "short": true
        }
      ]
    }]
  };