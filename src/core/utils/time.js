export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitUntil(fn) {
  while (true)
    if (fn()) break;
    else await delay(100);
}
