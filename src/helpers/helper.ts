export async function sleep(ms: number) {
  return new Promise((resolve, _) => setTimeout(resolve, ms));
}
