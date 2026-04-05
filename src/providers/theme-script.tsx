import { PAGE_THEME_STORAGE_KEY } from "@/lib/page-theme";

/**
 * Inline script as the first body child: runs before React hydrates children so
 * `data-page-theme` matches localStorage without conflicting with server HTML.
 */
export function ThemeScript() {
  const code = `
(function(){
  try {
    var k = ${JSON.stringify(PAGE_THEME_STORAGE_KEY)};
    var t = localStorage.getItem(k);
    if (t === 'light' || t === 'dark') {
      document.documentElement.dataset.pageTheme = t;
    } else {
      document.documentElement.dataset.pageTheme = 'dark';
    }
  } catch (e) {
    document.documentElement.dataset.pageTheme = 'dark';
  }
})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
