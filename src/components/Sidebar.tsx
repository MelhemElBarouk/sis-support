import { AnimatePresence, motion } from "framer-motion";
import { navigation, type SectionId } from "../data/shellPreview";
import { Icon } from "./Icon";

type SidebarProps = {
  activeSection: SectionId;
  compact: boolean;
  mobile: boolean;
  canToggle: boolean;
  onSelect: (section: SectionId) => void;
  onToggleCompact: () => void;
  onClose: () => void;
};

export function Sidebar({ activeSection, compact, mobile, canToggle, onSelect, onToggleCompact, onClose }: SidebarProps) {
  return (
    <motion.aside
      className={`sidebar${compact ? " sidebar-compact" : ""}${mobile ? " sidebar-mobile" : ""}`}
      aria-label="Primary navigation"
      initial={mobile ? { x: -288 } : false}
      animate={mobile ? { x: 0, width: 288 } : { width: compact ? 80 : 256 }}
      exit={mobile ? { x: -288 } : undefined}
      transition={{ type: "spring", stiffness: 290, damping: 32 }}
    >
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true"><span>S</span><i /></div>
        {!compact && (
          <div className="brand-copy">
            <strong>SIS <span>SUPPORT</span></strong>
            <small>DEVELOPER CONSOLE</small>
          </div>
        )}
        {mobile && (
          <motion.button className="icon-button sidebar-close" type="button" aria-label="Close navigation" onClick={onClose} whileTap={{ scale: 0.94 }}>
            <Icon name="close" size={18} />
          </motion.button>
        )}
      </div>

      <div className="sidebar-divider" />
      {!compact && <div className="sidebar-group-label">WORKSPACE <span>/ 01</span></div>}

      <nav className="sidebar-nav" aria-label="Support sections">
        {navigation.map((item) => {
          const active = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              className={`nav-item${active ? " nav-item-active" : ""}`}
              type="button"
              aria-label={compact ? item.label : undefined}
              aria-current={active ? "page" : undefined}
              title={compact ? item.label : undefined}
              onClick={() => onSelect(item.id)}
              whileHover={{ x: compact ? 0 : 3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              {active && <motion.span className="nav-active-surface" layoutId="active-nav" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
              <Icon name={item.icon} size={19} />
              <AnimatePresence initial={false}>
                {!compact && <motion.span className="nav-item-label" initial={{ opacity: 0, x: -7 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -7 }} transition={{ duration: 0.16 }}>{item.label}</motion.span>}
              </AnimatePresence>
              {active && !compact && <span className="nav-active-dot" />}
            </motion.button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-preview">
          <span className="preview-pulse" />
          {!compact && <span><strong>UI PREVIEW</strong><small>Support workspace shell</small></span>}
        </div>
        {canToggle && (
          <motion.button
            className="collapse-button"
            type="button"
            aria-label={compact ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!compact}
            onClick={onToggleCompact}
            whileHover={{ backgroundColor: "#f4f9fb" }}
            whileTap={{ scale: 0.97 }}
          >
            <Icon name={compact ? "chevronRight" : "chevronLeft"} size={17} />
            {!compact && <span>Collapse sidebar</span>}
          </motion.button>
        )}
      </div>
    </motion.aside>
  );
}
