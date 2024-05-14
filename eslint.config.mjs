import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  // Importez la configuration recommandée de pluginJs
  pluginJs.configs.recommended,
  // Ajoutez des règles supplémentaires ici
  {
    // Désactiver la règle "no-undef" pour les fichiers spécifiques
    files: ["scripts/pages/index.js", "scripts/pages/photographer.js", "scripts/templates/photographer.js", "scripts/utils/contactForm.js"],
    rules: {
      "no-undef": "off"
    }
  },
  {
    // Désactiver la règle "no-unused-vars" pour les fichiers spécifiques
    files: ["scripts/templates/photographer.js", "scripts/utils/contactForm.js"],
    rules: {
      "no-unused-vars": "off"
    }
  }
];