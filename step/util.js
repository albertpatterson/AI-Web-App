export async function logError(fcn) {
  try {
    await fcn();
  } catch (error) {
    console.error(error);
  }
}
