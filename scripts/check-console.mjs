import { spawn } from "child_process";

const chrome = spawn(
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--user-data-dir=/tmp/chrome-console-profile",
    "--remote-debugging-port=9223",
    "http://localhost:3001",
  ]
);

setTimeout(async () => {
  try {
    const list = await (await fetch("http://127.0.0.1:9223/json/list")).json();
    const page = list.find((t) => t.type === "page");
    if (!page) {
      chrome.kill();
      process.exit(1);
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: "Log.enable" }));
      ws.send(JSON.stringify({ id: 2, method: "Runtime.enable" }));
      ws.send(
        JSON.stringify({
          id: 3,
          method: "Runtime.evaluate",
          params: {
            expression: `
              (() => {
                const logs = [];
                // Check if three canvas exists
                const canvases = Array.from(document.querySelectorAll('canvas')).map(c => ({
                  w: c.width,
                  h: c.height,
                  style: c.getAttribute('style'),
                  parent: c.parentElement?.className
                }));
                return { canvases };
              })()
            `,
            returnByValue: true,
          },
        })
      );
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.method === "Runtime.consoleAPICalled") {
        console.log("Console:", msg.params.type, msg.params.args.map(a => a.value || a.description).join(" "));
      }
      if (msg.method === "Log.entryAdded") {
        console.log("Log:", msg.params.entry.level, msg.params.entry.text);
      }
      if (msg.id === 3) {
        console.log("DOM Canvas check:", msg.result.result.value);
      }
    };

    setTimeout(() => {
      ws.close();
      chrome.kill();
      process.exit(0);
    }, 4000);
  } catch (err) {
    console.error("Error:", err);
    chrome.kill();
    process.exit(1);
  }
}, 2500);
