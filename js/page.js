function toggleTheme() {
    let themeLink = document.getElementById('theme-style');
    
    if (!themeLink) {
        themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.id = 'theme-style';
        themeLink.href = 'css/dark-theme.css';
        document.head.appendChild(themeLink);
    } else {
        themeLink.remove();
    }
  }