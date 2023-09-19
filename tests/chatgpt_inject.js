// const textarea = document.querySelector("textarea");
//
// textarea.value = "Hello Dude.";
//
// const inputEvent = new Event("input", { bubbles: true });
// textarea.dispatchEvent(inputEvent);
//
// setTimeout(() => {
//   const submitBtn = [...document.querySelectorAll("button")].at(-2);
//   submitBtn.click();
// }, 1000);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntil(fn) {
  while (true)
    if (fn()) break;
    else await delay(100);
}

const btnSelector =
  "#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2.md\\:pl-2.md\\:w-\\[calc\\(100\\%-\\.5rem\\)\\] > form > div > div:nth-child(1) > div > div.flex.items-center.md\\:items-end > div > button";

await waitUntil(() => {
  return document.querySelector(btnSelector).innerText === "Stop generating";
});

console.log("Done");

await waitUntil(() => {
  return document.querySelector(btnSelector).innerText === "Regenerate";
})

console.log("Done2");
