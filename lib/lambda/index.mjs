export async function handler(event) {
  return {
    ...event,
    response: {
      autoConfirmUser: true,
      autoVerifyEmail: true,
    },
  };
}
