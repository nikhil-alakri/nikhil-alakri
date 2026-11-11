import { spawn } from "child_process";

const chrome = spawn(
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--user-data-dir=/tmp/chrome-box-profile",
    "--remote-debugging-port=9224",
    "http://localhost:3001",
  ]
);

setTimeout(async () => {
  try {
    const list = await (await fetch("http://127.0.0.1:9224/json/list")).json();
    const page = list.find((t) => t.type === "page");
    if (!page) {
      chrome.kill();
      process.exit(1);
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: "Runtime.enable" }));
      setTimeout(() => {
        ws.send(
          JSON.stringify({
            id: 2,
            method: "Runtime.evaluate",
            params: {
              expression: `
                (() => {
                  const preloader = document.querySelector('[role="status"]')?.textContent;
                  const canvas = document.querySelector('canvas');
                  return {
                    preloader,
                    canvas: canvas ? { w: canvas.width, h: canvas.height } : null
                  };
                })()
              `,
              returnByValue: true,
            },
          })
        );
      }, 4000);
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id === 2) {
        console.log("Evaluation Result:", msg.result.result.value);
        ws.close();
        chrome.kill();
        process.exit(0);
      }
    };
  } catch (err) {
    console.error("Error:", err);
    chrome.kill();
    process.exit(1);
  }
}, 2000);
