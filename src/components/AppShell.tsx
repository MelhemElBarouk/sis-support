import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navigation, sectionPreview, type SectionId } from "../data/shellPreview";
import { Dashboard } from "./Dashboard";
import { PageContainer } from "./PageContainer";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type ViewportMode = "mobile" | "tablet" | "desktop";

function getViewportMode(): ViewportMode {
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1120) return "tablet";
  return "desktop";
}

export function AppShell() {
  const [viewportMode, setViewportMode] = useState<ViewportMode>(getViewportMode);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("dashboard");

  useEffect(() => {
    const onResize = () => setViewportMode(getViewportMode());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (viewportMode !== "mobile") setMobileOpen(false);
  }, [viewportMode]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (viewportMode !== "mobile" || !mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [viewportMode, mobileOpen]);

  const mobile = viewportMode === "mobile";
  const compact = viewportMode === "tablet" || collapsed;
  const pageTitle = navigation.find((item) => item.id === activeSection)?.label ?? "Dashboard";

  const selectSection = (section: SectionId) => {
    setActiveSection(section);
    setMobileOpen(false);
  };

  return (
    <div className="app-shell">
      {!mobile && (
        <Sidebar
          activeSection={activeSection}
          compact={compact}
          mobile={false}
          canToggle={viewportMode === "desktop"}
          onSelect={selectSection}
          onToggleCompact={() => setCollapsed((value) => !value)}
          onClose={() => setMobileOpen(false)}
        />
      )}

      <AnimatePresence>
        {mobile && mobileOpen && (
          <>
            <motion.button
              className="sidebar-backdrop"
              type="button"
              aria-label="Close navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <Sidebar
              activeSection={activeSection}
              compact={false}
              mobile
              canToggle={false}
              onSelect={selectSection}
              onToggleCompact={() => setCollapsed((value) => !value)}
              onClose={() => setMobileOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      <div className="workspace">
        <Topbar title={pageTitle} mobile={mobile} onOpenNavigation={() => setMobileOpen(true)} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="page-motion"
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {activeSection === "dashboard" ? (
              <Dashboard />
            ) : (
              <PageContainer title={pageTitle} section={pageTitle} description={sectionPreview.description}>
                <div className="empty-section">
                  <span className="empty-section-icon"><span className="terminal-caret">&gt;</span>_</span>
                  <h2>{pageTitle} workspace</h2>
                  <p>{sectionPreview.message}</p>
                </div>
              </PageContainer>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
