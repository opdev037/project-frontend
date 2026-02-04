<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap');

:root {
  /* Colors */
  --color-primary: #E85A4F;
  --color-primary-dark: #764ba2;
  --color-accent-purple: #667eea;
  --color-accent-green: #3D8A5A;

  /* Background */
  --bg-page: #F5F4F1;
  --bg-white: #FFFFFF;
  --bg-card: #FAFAF8;
  --bg-dark: #1A1918;

  /* Text */
  --text-primary: #1A1918;
  --text-secondary: #6D6C6A;
  --text-muted: #9C9B99;
  --text-white: #FFFFFF;

  /* Border */
  --border-light: #E5E4E1;
  --border-dark: #333333;
  --border-muted: #D1D0CD;

  /* Shadows */
  --shadow-card: 0 2px 12px rgba(26, 25, 24, 0.03);
  --shadow-card-sm: 0 2px 8px rgba(26, 25, 24, 0.03);

  /* Font */
  --font-family: 'Noto Sans TC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: var(--font-family);
  background-color: var(--bg-page);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  min-height: 100vh;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  opacity: 0.9;
}
</style>
