import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";

type UserMenuProps = { open: boolean; onToggle: () => void };

export function UserMenu({ open, onToggle }: UserMenuProps) {
  return (
    <div className="popover-anchor user-menu">
      <motion.button
        className={`user-control${open ? " user-control-active" : ""}`}
        type="button"
        aria-label="Profile menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={onToggle}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="user-avatar"><Icon name="user" size={17} /></span>
        <span className="user-control-label">Profile</span>
        <Icon name="chevronDown" size={14} className="user-chevron" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="popover profile-panel"
            role="menu"
            aria-label="Profile menu"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <div className="profile-panel-header">
              <span className="profile-panel-avatar"><Icon name="user" size={22} /></span>
              <span><strong>Profile preview</strong><small>Account controls are not connected</small></span>
            </div>
            <div className="profile-panel-divider" />
            <button type="button" role="menuitem" disabled>
              <Icon name="user" size={17} /> Your profile <span>SOON</span>
            </button>
            <button type="button" role="menuitem" disabled>
              <Icon name="settings" size={17} /> Preferences <span>SOON</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
