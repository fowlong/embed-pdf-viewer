# Embed PDF Viewer - Snippet

This directory contains the source code for the `embed-pdf-viewer` snippet. You can use this to build the snippet locally and integrate it into your project without relying on a CDN.

## Local Development and Usage

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Building the Snippet

**Note:** This snippet is part of a monorepo. Before building the snippet, you need to build the workspace packages it depends on.

1.  **Navigate to the repository root:**
    ```bash
    cd embed-pdf-viewer
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Build workspace packages:**
    ```bash
    pnpm run build:packages
    ```

4.  **Build the snippet:**
    ```bash
    cd snippet
    pnpm run build
    ```

    This will compile the TypeScript source and create a `dist` directory containing the bundled JavaScript (`embedpdf.js`) and its type definitions.

### Running the Example Locally

After building the snippet, you can run the `index.html` example to see it in action. Since the example uses ES Modules, you need to serve the files using a local web server.

1.  **Install a local web server (if you don't have one):**
    ```bash
    pnpm add -g http-server
    ```

2.  **Start the server from the `snippet` directory:**
    ```bash
    http-server .
    ```

3.  **Open your browser** and navigate to the URL provided by the server (usually `http://localhost:8080`). You should see the example page with the PDF viewer loaded.

### Integrating into Your Project

After running the `build` command, you can copy the contents of the `snippet/dist` directory into your own project and import it as shown in the `index.html` example.

---

## 📚 Documentation

The full walkthrough, advanced examples, and API reference live in our docs site:

👉 **[https://www.embedpdf.com/docs/snippet/introduction](https://www.embedpdf.com/docs/snippet/introduction)**

---

## 🚀 Introduction

**EmbedPDF Snippet** is a *"batteries‑included"* drop‑in that turns any `<div>` into a professional PDF reader. No build step, no framework lock‑in—just copy, paste, and you're done.

### Why choose the Snippet?

* **Complete UI out‑of‑the‑box** – toolbar, thumbnails, search, zoom & more
* **Zero build tooling** – works in plain HTML pages or alongside any JS framework
* **30‑second setup** – a single `<script type="module">` is all you need
* **Fully configurable** – tweak behavior with a lightweight options object
* **Runs everywhere** – modern browsers, frameworks, static sites & CMSes

---

## ⚡️ Quick Install

Add the CDN module and point it at a container:

```html filename="index.html" copy
<div id="pdf-viewer" style="height: 500px"></div>
<script async type="module">
  import EmbedPDF from 'https://snippet.embedpdf.com/embedpdf.js';

  EmbedPDF.init({
    type: 'container',           // mount strategy
    target: document.getElementById('pdf-viewer'),
    src: 'https://snippet.embedpdf.com/ebook.pdf' // your PDF URL
  });
</script>
```

That's it—refresh and enjoy a full‑featured viewer.

---

## 🛠 Basic Usage Pattern

1. **Container** – create a DOM element where the viewer will render.
2. **Import** – load `embedpdf.js` from the CDN with `type="module"`.
3. **Initialize** – call `EmbedPDF.init()` with your configuration.

### Minimal Example

```html filename="basic-example.html" copy
<!DOCTYPE html>
<html>
  <head><title>My PDF Viewer</title></head>
  <body>
    <div id="pdf-viewer" style="height: 100vh"></div>
    <script async type="module">
      import EmbedPDF from 'https://snippet.embedpdf.com/embedpdf.js';

      EmbedPDF.init({
        type: 'container',
        target: document.getElementById('pdf-viewer'),
        src: 'https://snippet.embedpdf.com/ebook.pdf'
      });
    </script>
  </body>
</html>
```

## 📄 License

EmbedPDF Snippet is [MIT licensed](https://github.com/embedpdf/embed-pdf-viewer/blob/main/LICENSE). Commercial use is welcome—just keep the copyright headers intact.
