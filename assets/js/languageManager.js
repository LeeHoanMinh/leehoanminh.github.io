class LanguageManager {
  constructor() {
    this.loadConfig();
  }

  async loadConfig() {
    try {
      const response = await fetch("./assets/js/languages.json");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this.config = await response.json();
    } catch (error) {
      console.error("Error loading language config:", error);
      this.config = {
        default: "en",
        languages: { en: { flag: "https://flagcdn.com/w20/us.png" } },
      };
    }
    this.availableLanguages = Object.keys(this.config.languages);
    this.setLanguage(localStorage.getItem("lan") || this.config.default);
  }

  setLanguage(languageCode) {
    if (!this.config.languages[languageCode]) {
      console.warn(`Language code ${languageCode} not supported.`);
      return;
    }

    localStorage.setItem("lan", languageCode);
    const languageData = this.config.languages[languageCode];

    $("#lan img").attr("src", languageData.flag);
    $("body").attr("class", languageCode); // Usa la clase en el body para manejar estilos CSS

    this.updateLanguage();
  }

  updateLanguage() {
    const lang = localStorage.getItem("lan");
    $(".language *").each(function () {
      const element = $(this);
      const translation = element.attr(`data-${lang}`);
      if (translation !== undefined) {
        element.html(translation);
      }
    });
  }

  getNextLanguage() {
      const currentLang = localStorage.getItem('lan');
      let currentIndex = this.availableLanguages.indexOf(currentLang);
      let nextIndex = (currentIndex + 1) % this.availableLanguages.length;
      return this.availableLanguages[nextIndex];
  }
}
