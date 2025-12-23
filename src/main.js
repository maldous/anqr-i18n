/**
 * ANQR - Animated QR Code Generator
 * Real-time auto-updating version
 */

import { Exporter } from "./modules/exporter.js";
import { GifParser } from "./modules/gif-parser.js";
import { QRGenerator } from "./modules/qr-generator.js";
import { Toast } from "./modules/toast.js";
import { URLParams } from "./modules/url-params.js";

class ANQRApp {
  constructor() {
    this.qrGenerator = new QRGenerator();
    this.gifParser = new GifParser();
    this.urlParams = new URLParams();
    this.exporter = new Exporter();
    this.toast = new Toast();

    this.currentFrames = [];
    this.currentFrameIndex = 0;
    this.animationId = null;
    this.isPlaying = false;
    this.overlayFrames = [];
    this.generateTimeout = null;
    this.isGenerating = false;
    this.hasImage = false;

    this.init();
  }

  async init() {
    await this.qrGenerator.loadLibrary();
    this.bindEvents();
    this.initTheme();
    this.initRouter();
    this.updateDisplayValues();
    this.updateOverlayModeUI();

    // Load from URL params if present
    const params = this.urlParams.parse();
    if (params.data) {
      this.loadFromParams(params);
    }

    // Initialize image-dependent options state
    this.updateImageDependentOptions();

    // Initial generation
    this.scheduleGenerate();
  }

  bindEvents() {
    // Page navigation
    document.querySelectorAll("[data-page]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        this.navigateTo(page);
      });
    });

    // Tab switching
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document
          .querySelectorAll(".tab")
          .forEach((t) => t.classList.remove("active"));
        document
          .querySelectorAll(".tab-content")
          .forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");
        document
          .getElementById(`tab-${tab.dataset.tab}`)
          .classList.add("active");
      });
    });

    // All inputs that trigger regeneration
    const autoUpdateInputs = [
      "qrContent",
      "typeNumber",
      "moduleSize",
      "margin",
      "moduleGap",
      "fgColor",
      "bgColor",
      "moduleStyle",
      "finderStyle",
      "overlayMode",
      "overlayIntensity",
      "logoSize",
      "animationSpeed",
      "colorMode",
    ];

    autoUpdateInputs.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => this.scheduleGenerate());
        el.addEventListener("change", () => this.scheduleGenerate());
      }
    });

    // Radio buttons
    document
      .querySelectorAll('input[name="errorCorrection"]')
      .forEach((radio) => {
        radio.addEventListener("change", () => this.scheduleGenerate());
      });

    // Checkboxes
    [
      "transparentBg",
      "preserveFinders",
      "loopAnimation",
      "reverseAnimation",
      "invertImage",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("change", () => this.scheduleGenerate());
      }
    });

    // Range value displays
    document.querySelectorAll(".control-range").forEach((range) => {
      range.addEventListener("input", () => this.updateDisplayValues());
    });

    // File upload
    const uploadArea = document.getElementById("uploadArea");
    const imageInput = document.getElementById("imageInput");

    uploadArea.addEventListener("click", () => imageInput.click());
    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadArea.classList.add("dragover");
    });
    uploadArea.addEventListener("dragleave", () => {
      uploadArea.classList.remove("dragover");
    });
    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadArea.classList.remove("dragover");
      const file = e.dataTransfer.files[0];
      if (file) this.handleImageUpload(file);
    });
    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) this.handleImageUpload(file);
    });

    // Remove image
    document
      .getElementById("removeImage")
      .addEventListener("click", () => this.removeImage());

    // Overlay mode change
    document
      .getElementById("overlayMode")
      .addEventListener("change", () => this.updateOverlayModeUI());

    // Theme toggle
    document
      .getElementById("themeToggle")
      .addEventListener("click", () => this.toggleTheme());

    // Export
    document
      .getElementById("downloadBtn")
      .addEventListener("click", () => this.download());
    document
      .getElementById("copyBtn")
      .addEventListener("click", () => this.copyToClipboard());

    // Share
    document
      .getElementById("shareBtn")
      .addEventListener("click", () => this.showShareModal());
    document
      .getElementById("closeShareModal")
      .addEventListener("click", () => this.hideShareModal());
    document
      .querySelector(".modal-backdrop")
      ?.addEventListener("click", () => this.hideShareModal());
    document
      .getElementById("copyDirectLink")
      ?.addEventListener("click", () => this.copyDirectLink());
    document
      .getElementById("copyEmbedHtml")
      ?.addEventListener("click", () => this.copyEmbedHtml());

    // Play/Pause
    document
      .getElementById("playPauseBtn")
      ?.addEventListener("click", () => this.toggleAnimation());

    // Output width sync
    document.getElementById("outputWidth").addEventListener("change", () => {
      document.getElementById("outputHeight").value =
        document.getElementById("outputWidth").value;
    });

    // Reset button
    document
      .getElementById("resetBtn")
      ?.addEventListener("click", () => this.resetToDefaults());
  }

  scheduleGenerate() {
    // Debounce generation
    if (this.generateTimeout) {
      clearTimeout(this.generateTimeout);
    }
    this.generateTimeout = setTimeout(() => this.generate(), 100);
  }

  async generate() {
    if (this.isGenerating) return;

    const config = this.getConfig();
    if (!config.content) return;

    this.isGenerating = true;

    try {
      this.stopAnimation();

      if (this.overlayFrames.length > 1) {
        // Animated overlay
        this.currentFrames = [];
        for (const frame of this.overlayFrames) {
          const qrFrame = await this.qrGenerator.generate(config, frame);
          this.currentFrames.push(qrFrame);
        }

        if (config.reverseAnimation && this.currentFrames.length > 2) {
          const reversed = [...this.currentFrames].slice(1, -1).reverse();
          this.currentFrames = [...this.currentFrames, ...reversed];
        }

        document.getElementById("frameIndicator").hidden = false;
        document.getElementById("totalFrames").textContent =
          this.currentFrames.length;

        this.startAnimation(config.animationSpeed, config.loopAnimation);
      } else {
        // Single frame
        const overlay =
          this.overlayFrames.length === 1 ? this.overlayFrames[0] : null;
        const frame = await this.qrGenerator.generate(config, overlay);
        this.currentFrames = [frame];
        this.renderFrame(0);
        document.getElementById("frameIndicator").hidden = true;
      }

      this.updateEmbedCodes();
    } catch (e) {
      console.error("Generation error:", e);
    }

    this.isGenerating = false;
  }

  getConfig() {
    return {
      content: document.getElementById("qrContent").value || "",
      errorCorrection:
        document.querySelector('input[name="errorCorrection"]:checked')
          ?.value || "Q",
      typeNumber: parseInt(document.getElementById("typeNumber").value) || 0,
      moduleSize: parseInt(document.getElementById("moduleSize").value) || 6,
      margin: parseInt(document.getElementById("margin").value) || 2,
      moduleGap: parseInt(document.getElementById("moduleGap")?.value) || 8,
      fgColor: document.getElementById("fgColor").value || "#000000",
      bgColor: document.getElementById("bgColor").value || "#ffffff",
      transparentBg: document.getElementById("transparentBg")?.checked ?? false,
      moduleStyle: document.getElementById("moduleStyle").value || "square",
      finderStyle: document.getElementById("finderStyle").value || "square",
      overlayMode: document.getElementById("overlayMode").value || "halftone",
      overlayIntensity:
        parseInt(document.getElementById("overlayIntensity").value) || 50,
      colorMode: document.getElementById("colorMode")?.value || "color",
      invertImage: document.getElementById("invertImage")?.checked ?? false,
      logoSize: parseInt(document.getElementById("logoSize").value) || 25,
      preserveFinders:
        document.getElementById("preserveFinders")?.checked ?? true,
      animationSpeed:
        parseInt(document.getElementById("animationSpeed").value) || 100,
      loopAnimation: document.getElementById("loopAnimation")?.checked ?? true,
      reverseAnimation:
        document.getElementById("reverseAnimation")?.checked ?? false,
      outputWidth:
        parseInt(document.getElementById("outputWidth").value) || 400,
      outputHeight:
        parseInt(document.getElementById("outputHeight").value) || 400,
      outputFormat: document.getElementById("outputFormat").value || "png",
      outputQuality: 0.9,
    };
  }

  updateDisplayValues() {
    const displays = {
      typeNumber: (v) => (v === "0" ? "Auto" : `v${v}`),
      moduleSize: (v) => `${v}px`,
      margin: (v) => v,
      moduleGap: (v) => `${v}%`,
      overlayIntensity: (v) => `${v}%`,
      logoSize: (v) => `${v}%`,
      animationSpeed: (v) => `${v}ms`,
    };

    Object.entries(displays).forEach(([id, formatter]) => {
      const input = document.getElementById(id);
      const display = document.getElementById(`${id}Value`);
      if (input && display) {
        display.textContent = formatter(input.value);
      }
    });
  }

  updateOverlayModeUI() {
    const mode = document.getElementById("overlayMode").value;
    const logoSizeGroup = document.getElementById("logoSizeGroup");

    if (logoSizeGroup) {
      logoSizeGroup.style.display = mode === "center" ? "flex" : "none";
    }

    // Update image-dependent options state
    this.updateImageDependentOptions();
  }

  updateImageDependentOptions() {
    const overlayOptions = document.querySelectorAll(".overlay-requires-image");
    const noImageNotice = document.getElementById("noImageNotice");

    overlayOptions.forEach((el) => {
      if (this.hasImage) {
        el.classList.remove("disabled");
        el.querySelectorAll("input, select").forEach(
          (input) => (input.disabled = false),
        );
      } else {
        el.classList.add("disabled");
        el.querySelectorAll("input, select").forEach(
          (input) => (input.disabled = true),
        );
      }
    });

    if (noImageNotice) {
      noImageNotice.style.display = this.hasImage ? "none" : "block";
    }
  }

  async handleImageUpload(file) {
    if (!file.type.startsWith("image/")) {
      this.toast.show("Please upload an image file", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;

      const preview = document.getElementById("uploadPreview");
      const previewImg = document.getElementById("previewImage");
      const uploadArea = document.getElementById("uploadArea");

      previewImg.src = dataUrl;
      preview.hidden = false;
      uploadArea.style.display = "none";

      this.hasImage = true;
      this.updateImageDependentOptions();

      if (file.type === "image/gif") {
        try {
          this.overlayFrames = await this.gifParser.parse(dataUrl);
          document.getElementById("animationSection").hidden = false;
          const animSection2 = document.getElementById("animationSection2");
          if (animSection2) animSection2.hidden = false;
          this.toast.show(
            `Loaded ${this.overlayFrames.length} frames`,
            "success",
          );
        } catch (e) {
          console.error("GIF parse error:", e);
          this.overlayFrames = [await this.loadImageAsCanvas(dataUrl)];
        }
      } else {
        this.overlayFrames = [await this.loadImageAsCanvas(dataUrl)];
        document.getElementById("animationSection").hidden = true;
        const animSection2 = document.getElementById("animationSection2");
        if (animSection2) animSection2.hidden = true;
      }

      this.scheduleGenerate();
    };
    reader.readAsDataURL(file);
  }

  loadImageAsCanvas(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas);
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  removeImage() {
    this.overlayFrames = [];
    this.currentFrames = [];
    this.currentFrameIndex = 0;
    this.stopAnimation();

    // Clear preview image
    const previewImg = document.getElementById("previewImage");
    if (previewImg) previewImg.src = "";

    // Hide preview, show upload area
    const uploadPreview = document.getElementById("uploadPreview");
    if (uploadPreview) uploadPreview.hidden = true;

    const uploadArea = document.getElementById("uploadArea");
    if (uploadArea) uploadArea.style.display = "flex";

    // Clear file input
    const imageInput = document.getElementById("imageInput");
    if (imageInput) imageInput.value = "";

    // Hide animation controls
    const animationSection = document.getElementById("animationSection");
    if (animationSection) animationSection.hidden = true;

    const animationSection2 = document.getElementById("animationSection2");
    if (animationSection2) animationSection2.hidden = true;

    // Reset frame indicator
    const frameIndicator = document.getElementById("frameIndicator");
    if (frameIndicator) frameIndicator.hidden = true;

    const currentFrame = document.getElementById("currentFrame");
    if (currentFrame) currentFrame.textContent = "1";

    const totalFrames = document.getElementById("totalFrames");
    if (totalFrames) totalFrames.textContent = "1";

    this.hasImage = false;
    this.updateImageDependentOptions();

    this.scheduleGenerate();
  }

  resetToDefaults() {
    // Content
    document.getElementById("qrContent").value = "https://anqr.aldous.info";

    // Basic settings
    document.querySelector('input[name="errorCorrection"][value="Q"]').checked =
      true;
    document.getElementById("typeNumber").value = "0";
    document.getElementById("moduleSize").value = "6";
    document.getElementById("margin").value = "2";
    document.getElementById("moduleGap").value = "8";

    // Style settings
    document.getElementById("fgColor").value = "#000000";
    document.getElementById("bgColor").value = "#ffffff";
    document.getElementById("transparentBg").checked = false;
    document.getElementById("moduleStyle").value = "square";
    document.getElementById("finderStyle").value = "square";

    // Overlay settings (keep image, just reset settings)
    document.getElementById("overlayMode").value = "halftone";
    document.getElementById("overlayIntensity").value = "50";
    document.getElementById("logoSize").value = "25";
    document.getElementById("preserveFinders").checked = true;

    // Output settings
    document.getElementById("outputWidth").value = "400";
    document.getElementById("outputHeight").value = "400";
    document.getElementById("outputFormat").value = "png";
    document.getElementById("animationSpeed").value = "100";
    document.getElementById("loopAnimation").checked = true;
    document.getElementById("reverseAnimation").checked = false;

    // NOTE: We intentionally do NOT remove the uploaded image
    // Users can use the X button on the image preview to remove it separately

    // Update displays and regenerate
    this.updateDisplayValues();
    this.updateOverlayModeUI();
    this.scheduleGenerate();

    this.toast.show("Reset to defaults!", "success");
  }

  renderFrame(index) {
    const canvas = document.getElementById("qrCanvas");
    const ctx = canvas.getContext("2d");
    const frame = this.currentFrames[index];

    if (!frame) return;

    const config = this.getConfig();
    canvas.width = config.outputWidth;
    canvas.height = config.outputHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

    document.getElementById("currentFrame").textContent = index + 1;
    this.currentFrameIndex = index;
  }

  startAnimation(speed, loop) {
    this.isPlaying = true;
    document.getElementById("playPauseIcon").textContent = "⏸";

    let frameIndex = 0;
    const animate = () => {
      this.renderFrame(frameIndex);
      frameIndex++;

      if (frameIndex >= this.currentFrames.length) {
        if (loop) {
          frameIndex = 0;
        } else {
          this.stopAnimation();
          return;
        }
      }

      this.animationId = setTimeout(animate, speed);
    };

    animate();
  }

  stopAnimation() {
    if (this.animationId) {
      clearTimeout(this.animationId);
      this.animationId = null;
    }
    this.isPlaying = false;
    const icon = document.getElementById("playPauseIcon");
    if (icon) icon.textContent = "▶";
  }

  toggleAnimation() {
    if (this.currentFrames.length <= 1) return;

    if (this.isPlaying) {
      this.stopAnimation();
    } else {
      const config = this.getConfig();
      this.startAnimation(config.animationSpeed, config.loopAnimation);
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem("anqr-theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("anqr-theme", next);
    this.updateThemeIcon(next);
  }

  updateThemeIcon(theme) {
    const icon = document.querySelector(".theme-icon");
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  // SPA Router
  initRouter() {
    // Handle browser back/forward
    window.addEventListener("popstate", () => {
      this.handleRoute();
    });

    // Handle initial route
    this.handleRoute();

    // Contact form handler
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => this.handleContactForm(e));
    }
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || "generator";
    const validPages = ["generator", "gallery", "about", "privacy", "contact"];
    const page = validPages.includes(hash) ? hash : "generator";
    this.showPage(page);
  }

  navigateTo(page) {
    const hash = page === "generator" ? "" : `#${page}`;
    window.history.pushState({}, "", hash || window.location.pathname);
    this.showPage(page);
  }

  showPage(page) {
    // Hide all pages
    document
      .querySelectorAll(".page")
      .forEach((p) => p.classList.remove("active"));

    // Show target page
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
      targetPage.classList.add("active");
    }

    // Update nav links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === page);
    });

    // Scroll to top
    window.scrollTo(0, 0);

    // Show/hide generator-specific buttons
    const isGenerator = page === "generator";
    const shareBtn = document.getElementById("shareBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    if (shareBtn) shareBtn.style.display = isGenerator ? "" : "none";
    if (downloadBtn) downloadBtn.style.display = isGenerator ? "" : "none";
  }

  handleContactForm(e) {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value;

    const subjectText = `[ANQR ${subject}] Contact Form Submission`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    window.location.href = `mailto:matthew.aldous@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(body)}`;

    this.toast.show("Opening email client...", "info");
  }

  loadFromParams(params) {
    if (params.data) document.getElementById("qrContent").value = params.data;
    if (params.ec) {
      const radio = document.querySelector(
        `input[name="errorCorrection"][value="${params.ec}"]`,
      );
      if (radio) radio.checked = true;
    }
    if (params.v) document.getElementById("typeNumber").value = params.v;
    if (params.size) document.getElementById("moduleSize").value = params.size;
    if (params.margin) document.getElementById("margin").value = params.margin;
    if (params.fg) document.getElementById("fgColor").value = `#${params.fg}`;
    if (params.bg) document.getElementById("bgColor").value = `#${params.bg}`;
    if (params.style)
      document.getElementById("moduleStyle").value = params.style;
    if (params.finder)
      document.getElementById("finderStyle").value = params.finder;
    if (params.mode) document.getElementById("overlayMode").value = params.mode;
    if (params.intensity)
      document.getElementById("overlayIntensity").value = params.intensity;
    if (params.logoSize)
      document.getElementById("logoSize").value = params.logoSize;

    this.updateDisplayValues();
    this.updateOverlayModeUI();
  }

  updateEmbedCodes() {
    const config = this.getConfig();
    const params = this.urlParams.build(config);
    const baseUrl = window.location.origin + window.location.pathname;
    const fullUrl = baseUrl + "?" + params + "&render=1";

    const embedHtml = document.getElementById("embedHtml");
    const directLink = document.getElementById("directLink");

    if (embedHtml) {
      embedHtml.value = `<iframe src="${fullUrl}" width="${config.outputWidth}" height="${config.outputHeight}" frameborder="0"></iframe>`;
    }
    if (directLink) {
      directLink.value = fullUrl;
    }
  }

  async download() {
    if (this.currentFrames.length === 0) {
      this.toast.show("No QR code to download", "error");
      return;
    }

    const config = this.getConfig();

    try {
      // Always download as animated GIF when there are multiple frames
      if (this.currentFrames.length > 1) {
        this.toast.show("Creating animated GIF...", "info");
        await this.exporter.downloadGif(this.currentFrames, config);
      } else if (config.outputFormat === "svg") {
        await this.exporter.downloadSvg(
          this.currentFrames[this.currentFrameIndex],
          config,
        );
      } else {
        await this.exporter.downloadImage(
          this.currentFrames[this.currentFrameIndex],
          config,
        );
      }

      this.toast.show("Downloaded!", "success");
    } catch (e) {
      console.error("Download error:", e);
      this.toast.show("Download failed", "error");
    }
  }

  async copyToClipboard() {
    if (this.currentFrames.length === 0) return;

    try {
      const canvas = this.currentFrames[this.currentFrameIndex];
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      this.toast.show("Copied!", "success");
    } catch (e) {
      console.error("Clipboard copy error:", e);
      this.toast.show("Copy failed", "error");
    }
  }

  showShareModal() {
    this.updateEmbedCodes();
    document.getElementById("shareModal").hidden = false;
  }

  hideShareModal() {
    document.getElementById("shareModal").hidden = true;
  }

  copyDirectLink() {
    const link = document.getElementById("directLink").value;
    navigator.clipboard.writeText(link);
    this.toast.show("Link copied!", "success");
  }

  copyEmbedHtml() {
    const html = document.getElementById("embedHtml").value;
    navigator.clipboard.writeText(html);
    this.toast.show("HTML copied!", "success");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.anqrApp = new ANQRApp();
});
