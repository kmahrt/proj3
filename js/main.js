function showSection(sectionId) {
    document.querySelectorAll(".content-section").forEach(section => {
      section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
  }


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
