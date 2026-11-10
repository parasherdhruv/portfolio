import { THEME_STORAGE_KEY } from "@/lib/theme";

export function ThemeScript() {
  const script = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
    THEME_STORAGE_KEY,
  )});var p=s?JSON.parse(s):{};var themes=["midnight","ocean","violet","emerald","amber"];var modes=["light","dark","system"];var t=themes.indexOf(p.theme)>-1?p.theme:"midnight";var a=modes.indexOf(p.appearance)>-1?p.appearance:"system";var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var m=a==="system"?(d?"dark":"light"):a;var r=document.documentElement;r.dataset.theme=t;r.dataset.mode=m;r.style.colorScheme=m;}catch(e){document.documentElement.dataset.theme="midnight";document.documentElement.dataset.mode="dark";}})();`;

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
