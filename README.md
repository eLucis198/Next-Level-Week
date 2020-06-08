# Next-Level-Week
 RocketSeat's "Next Level Week" Course

# How to install

After cloning run the following commands:

Server folder => `yarn`, `yarn knex:migrate`, `yarn knex:seed`.<br />
Create a file named `.env` in the **server's root folder**, copy the `.env.example` content, and add your IP address.<br />
Start with `yarn start`

Web folder => `yarn`<br />
Replace the 4th line of `web\src\services\api.ts`, put the IP address and PORT of your server.<br />
Start with `yarn start`

Mobile folder => `yarn`<br />
Replace the 5th line of `mobile\src\services\api.ts`, put the IP address and PORT of your server.<br />
Start with `yarn start`
Open Expo app in your smartphone and scan the QR code.
