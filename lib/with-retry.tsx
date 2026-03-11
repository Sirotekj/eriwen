export default async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
  delay = 500,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;

    await new Promise((res) => setTimeout(res, delay));
    return withRetry(fn, retries - 1, delay);
  }
}
