/**
 * URL Parameters Module
 * Handles encoding and decoding QR configuration to/from URL parameters
 */

export class URLParams {
  /**
   * Parse URL parameters into a config object
   */
  parse() {
    const params = new URLSearchParams(window.location.search);

    return {
      data: params.get("data"),
      ec: params.get("ec"),
      v: params.get("v"),
      size: params.get("size"),
      margin: params.get("margin"),
      fg: params.get("fg"),
      bg: params.get("bg"),
      style: params.get("style"),
      finder: params.get("finder"),
      img: params.get("img"),
      mode: params.get("mode"),
      intensity: params.get("intensity"),
      logoSize: params.get("logoSize"),
      speed: params.get("speed"),
      loop: params.get("loop"),
      reverse: params.get("reverse"),
      w: params.get("w"),
      h: params.get("h"),
      format: params.get("format"),
      quality: params.get("quality"),
      render: params.get("render") === "1",
      transparent: params.get("transparent") === "1",
    };
  }

  /**
   * Build URL parameters from a config object
   */
  build(config) {
    const params = new URLSearchParams();

    // Required
    if (config.content) {
      params.set("data", config.content);
    }

    // Basic settings
    if (config.errorCorrection && config.errorCorrection !== "Q") {
      params.set("ec", config.errorCorrection);
    }
    if (config.typeNumber && config.typeNumber !== 0) {
      params.set("v", config.typeNumber);
    }
    if (config.moduleSize && config.moduleSize !== 8) {
      params.set("size", config.moduleSize);
    }
    if (config.margin !== undefined && config.margin !== 4) {
      params.set("margin", config.margin);
    }

    // Colors
    if (config.fgColor && config.fgColor !== "#000000") {
      params.set("fg", config.fgColor.replace("#", ""));
    }
    if (config.bgColor && config.bgColor !== "#ffffff") {
      params.set("bg", config.bgColor.replace("#", ""));
    }
    if (config.transparentBg) {
      params.set("transparent", "1");
    }

    // Styles
    if (config.moduleStyle && config.moduleStyle !== "square") {
      params.set("style", config.moduleStyle);
    }
    if (config.finderStyle && config.finderStyle !== "square") {
      params.set("finder", config.finderStyle);
    }

    // Overlay
    if (config.overlayMode && config.overlayMode !== "halftone") {
      params.set("mode", config.overlayMode);
    }
    if (
      config.overlayIntensity !== undefined &&
      config.overlayIntensity !== 50
    ) {
      params.set("intensity", config.overlayIntensity);
    }
    if (config.logoSize !== undefined && config.logoSize !== 25) {
      params.set("logoSize", config.logoSize);
    }

    // Animation
    if (config.animationSpeed !== undefined && config.animationSpeed !== 100) {
      params.set("speed", config.animationSpeed);
    }
    if (config.loopAnimation === false) {
      params.set("loop", "0");
    }
    if (config.reverseAnimation) {
      params.set("reverse", "1");
    }

    // Output
    if (config.outputWidth && config.outputWidth !== 400) {
      params.set("w", config.outputWidth);
    }
    if (config.outputHeight && config.outputHeight !== 400) {
      params.set("h", config.outputHeight);
    }
    if (config.outputFormat && config.outputFormat !== "png") {
      params.set("format", config.outputFormat);
    }
    if (config.outputQuality !== undefined && config.outputQuality !== 0.9) {
      params.set("quality", config.outputQuality);
    }

    return params.toString();
  }

  /**
   * Update the browser URL without reloading
   */
  updateUrl(config) {
    const params = this.build(config);
    const newUrl = window.location.pathname + (params ? "?" + params : "");
    window.history.replaceState({}, "", newUrl);
  }
}
