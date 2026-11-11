import { spawn } from "child_process";
import fs from "fs";

const SCREENSHOT_DIR = "/Users/nikhilalakri/.gemini/antigravity/brain/ccf779c5-043d-4e34-b2d2-9f79392e58f6/screenshots";
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log("Launching Headless Chrome...");
  const chrome = spawn(
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--user-data-dir=/tmp/chrome-phase7b-verify",
      "--remote-debugging-port=9229",
      "--window-size=1440,900",
      "http://localhost:3001",
    ]
  );

  let list = null;
  for (let attempt = 0; attempt < 15; attempt++) {
    try {
      await new Promise((r) => setTimeout(r, 600));
      const listRes = await fetch("http://127.0.0.1:9229/json/list");
      list = await listRes.json();
      if (list && list.length > 0) break;
    } catch {
      // retry
    }
  }
  if (!list) {
    console.error("Could not connect to Chrome debugging port");
    chrome.kill();
    process.exit(1);
  }
  try {
    const page = list.find((t) => t.type === "page");
    if (!page) {
      console.error("No target page found");
      chrome.kill();
      process.exit(1);
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    let msgId = 1;
    const pending = new Map();

    const send = (method, params = {}) => {
      const id = msgId++;
      return new Promise((resolve) => {
        pending.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.id && pending.has(data.id)) {
        const resolve = pending.get(data.id);
        pending.delete(data.id);
        resolve(data.result);
      }
      if (data.method === "Runtime.consoleAPICalled") {
        const args = data.params.args.map((a) => a.value || a.description).join(" ");
        if (data.params.type === "error") {
          console.error("BROWSER ERROR:", args);
        } else {
          console.log(`[Browser ${data.params.type}]:`, args);
        }
      }
      if (data.method === "Runtime.exceptionThrown") {
        console.error("UNCAUGHT EXCEPTION:", data.params.exceptionDetails);
      }
    };

    await new Promise((r) => {
      ws.onopen = r;
    });

    await send("Runtime.enable");
    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // Reset scroll to top
    await send("Runtime.evaluate", {
      expression: "window.scrollTo({ top: 0, behavior: 'instant' });",
    });

    console.log("Waiting for 3D model and scene to mount (6s on cold compile)...");
    await new Promise((r) => setTimeout(r, 6000));

    // 1. Capture Hero 1440px
    console.log("Capturing phase7b-hero-1440.png...");
    const heroShot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${SCREENSHOT_DIR}/phase7b-hero-1440.png`, Buffer.from(heroShot.data, "base64"));
    console.log("Saved phase7b-hero-1440.png");

    // 2. Scroll to Pillars section
    console.log("Scrolling to #pillars...");
    await send("Runtime.evaluate", {
      expression: `
        (() => {
          const el = document.getElementById("pillars");
          if (el) el.scrollIntoView({ behavior: "instant" });
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 1500));

    console.log("Capturing phase7b-pillars-1440.png...");
    const pillarsShot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${SCREENSHOT_DIR}/phase7b-pillars-1440.png`, Buffer.from(pillarsShot.data, "base64"));
    console.log("Saved phase7b-pillars-1440.png");

    // 3. Trigger Carousel Transition & capture mid-transition
    console.log("Triggering carousel next button and capturing mid-transition...");
    await send("Runtime.evaluate", {
      expression: `
        (() => {
          const nextBtn = document.querySelector('button[aria-label="Next Architectural Pillar"]');
          if (nextBtn) nextBtn.click();
        })()
      `,
    });
    // Wait only 90ms to catch spring mid-transition
    await new Promise((r) => setTimeout(r, 90));
    const transitionShot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${SCREENSHOT_DIR}/phase7b-carousel-transition.png`, Buffer.from(transitionShot.data, "base64"));
    console.log("Saved phase7b-carousel-transition.png");

    // 4. Tablet 768px
    console.log("Testing Tablet 768px...");
    await send("Emulation.setDeviceMetricsOverride", {
      width: 768,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send("Runtime.evaluate", {
      expression: "window.scrollTo({ top: 0, behavior: 'instant' }); document.documentElement.scrollTop = 0;",
    });
    await new Promise((r) => setTimeout(r, 1500));
    const tabletHero = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${SCREENSHOT_DIR}/phase7b-hero-768.png`, Buffer.from(tabletHero.data, "base64"));
    console.log("Saved phase7b-hero-768.png");

    // 5. Mobile 390px (Mobile Fallback)
    console.log("Testing Mobile 390px...");
    await send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await send("Runtime.evaluate", {
      expression: "window.scrollTo({ top: 0, behavior: 'instant' }); document.documentElement.scrollTop = 0;",
    });
    await new Promise((r) => setTimeout(r, 1500));
    const mobileHero = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${SCREENSHOT_DIR}/phase7b-hero-390.png`, Buffer.from(mobileHero.data, "base64"));
    console.log("Saved phase7b-hero-390.png");

    // Scroll to pillars on mobile to verify horizontal snap list
    await send("Runtime.evaluate", {
      expression: `
        (() => {
          const el = document.getElementById("pillars");
          if (el) el.scrollIntoView({ behavior: "instant" });
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 1200));
    const mobilePillars = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${SCREENSHOT_DIR}/phase7b-pillars-390.png`, Buffer.from(mobilePillars.data, "base64"));
    console.log("Saved phase7b-pillars-390.png");

    // 6. Measure FPS
    console.log("Measuring FPS...");
    const fpsResult = await send("Runtime.evaluate", {
      expression: `
        new Promise((resolve) => {
          let frames = 0;
          const start = performance.now();
          function step() {
            frames++;
            if (performance.now() - start < 1000) {
              requestAnimationFrame(step);
            } else {
              const elapsed = (performance.now() - start) / 1000;
              resolve({ fps: Math.round(frames / elapsed) });
            }
          }
          requestAnimationFrame(step);
        })
      `,
      awaitPromise: true,
      returnByValue: true,
    });
    console.log("Measured FPS:", fpsResult.result.value);

    ws.close();
    chrome.kill();
    console.log("All verifications completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Verification failed:", err);
    chrome.kill();
    process.exit(1);
  }
}

run();
