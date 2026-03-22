// List of micro-apps available in JS Playground
// Extend this array to add more apps without touching index.html
const apps = [
  {
    name: "Kwadraty",
    path: "./kwadraty/",
    description: "Interactive square-based experiment.",
    eventName: "mainPage-button-kwadraty"
  },
  {
    name: "Fake Letters",
    path: "./fake-letters/",
    description: "Detect suspicious homoglyph characters hiding in text and domains.",
    eventName: "mainPage-button-fakeLetters"
  }
];

// Expose globally (no modules) so index.html can read it easily
window.apps = apps;
