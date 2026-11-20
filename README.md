# MAYOR_KAY Portfolio

This is a static, multi-page portfolio site. It has no build step or runtime dependencies; internal links and asset paths are relative so the site works from the repository root or a GitHub Pages project URL.

## Project structure

```text
.
├── index.html
├── pages/
│   ├── about.html
│   ├── services.html
│   └── contact.html
├── assets/
│   ├── icons/
│   │   └── favicon.png
│   └── images/
│       ├── lustro.png
│       ├── prosper-desktop.png
│       └── prosper-mobile.png
├── css/
│   ├── dark-mode.css
│   ├── responsive.css
│   └── style.css
└── js/
    ├── main.js
    └── navigation.js
```

`style.css` contains shared component styles, `responsive.css` contains breakpoint and reduced-motion rules, and `dark-mode.css` contains the existing dark color palette. The site currently has no light-theme toggle. Fonts continue to load from Google Fonts.

`navigation.js` handles the mobile menu and current-page state. `main.js` handles the contact form, footer year, and reveal behavior.

## GitHub Pages

Publish the repository root as the Pages source. Keep all page and asset paths relative when adding links or files; this supports both user-site and project-site deployments. The contact form uses the existing Formspree endpoint.
