import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { UserMenu } from "./UserMenu";

type TopbarProps = {
  title: string;
  mobile: boolean;
  onOpenNavigation: () => void;
};

type OpenPanel = "notifications" | "profile" | null;

export function Topbar({ title, mobile, onOpenNavigation }: TopbarProps) {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!openPanel) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!controlsRef.current?.contains(event.target as Node)) setOpenPanel(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPanel(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openPanel]);

  const togglePanel = (panel: Exclude<OpenPanel, null>) => {
    setOpenPanel((current) => current === panel ? null : panel);
  };

  return (
    <header className="topbar">
      <div className="topbar-context">
        {mobile && (
          <motion.button className="icon-button mobile-menu-button" type="button" aria-label="Open navigation" onClick={onOpenNavigation} whileTap={{ scale: 0.94 }}>
            <Icon name="menu" size={21} />
          </motion.button>
        )}
        <div className="breadcrumb"><span>Support</span><Icon name="chevronRight" size={14} /><strong>{title}</strong></div>
      </div>

      <div className="topbar-actions" ref={controlsRef}>
        <label className="search-field">
          <Icon name="search" size={17} />
          <input type="search" placeholder="Search workspace" aria-label="Search workspace (coming soon)" disabled />
          <span className="search-hint">SOON</span>
        </label>
        <button className="icon-button mobile-search-button" type="button" aria-label="Search workspace (coming soon)" title="Search coming soon" disabled><Icon name="search" size={19} /></button>
        <span className="topbar-separator" />
        <div className="topbar-preview">
          <motion.span
            className="status-dot"
            animate={reduceMotion ? undefined : { opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>UI PREVIEW</span>
        </div>
        <div className="popover-anchor">
          <motion.button
            className={`icon-button${openPanel === "notifications" ? " icon-button-active" : ""}`}
            type="button"
            aria-label="Notifications"
            aria-expanded={openPanel === "notifications"}
            aria-haspopup="dialog"
            onClick={() => togglePanel("notifications")}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.94 }}
          >
            <Icon name="bell" size={19} />
          </motion.button>
          <AnimatePresence>
            {openPanel === "notifications" && (
              <motion.div className="popover notification-panel" role="dialog" aria-label="Notifications" initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }} transition={{ duration: 0.2 }}>
                <div className="popover-heading"><strong>Notifications</strong><span>PREVIEW</span></div>
                <div className="popover-empty"><span className="popover-empty-icon"><Icon name="bell" size={20} /></span><strong>All clear for now</strong><p>Notifications will appear here when support features are available.</p></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <UserMenu open={openPanel === "profile"} onToggle={() => togglePanel("profile")} />
      </div>
    </header>
  );
}
