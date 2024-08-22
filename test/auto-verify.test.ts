import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { config } from "dotenv";
config();

const CLIENTID = process.env.CLIENTID;
const client = new CognitoIdentityProviderClient();
const input = {
  // SignUpRequest
  ClientId: CLIENTID, // required
  Username: "username", // required
  Password: "password12345!@#$QWERTY", // required
  UserAttributes: [
    // AttributeListType
    {
      // AttributeType
      Name: "email", // required
      Value: "user@email.com",
    },
  ],
};
const command = new SignUpCommand(input);

test("User can sign up", async () => {
  const response = await client.send(command);
  expect(response.UserConfirmed).toBe(true);
});

// { // SignUpResponse
//   UserConfirmed: true || false, // required
//   CodeDeliveryDetails: { // CodeDeliveryDetailsType
//     Destination: "STRING_VALUE",
//     DeliveryMedium: "SMS" || "EMAIL",
//     AttributeName: "STRING_VALUE",
//   },
//   UserSub: "STRING_VALUE", // required
// };
