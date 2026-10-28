import { motion } from "framer-motion";
import { activityPreview, dashboardCards } from "../data/shellPreview";
import { DashboardCard } from "./DashboardCard";
import { Icon } from "./Icon";
import { PageContainer } from "./PageContainer";

export function Dashboard() {
  return (
    <PageContainer title="Dashboard" section="Dashboard" description="A clear view of your support workspace, ready for what comes next.">
      <div className="section-heading"><span>OVERVIEW</span><span>01 / 02</span></div>
      <div className="dashboard-grid">
        {dashboardCards.map((card, index) => (
          <DashboardCard key={card.title} {...card} index={index} />
        ))}
      </div>

      <div className="section-heading section-heading-activity"><span>ACTIVITY</span><span>02 / 02</span></div>
      <motion.section
        className="activity-panel"
        aria-labelledby="activity-title"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.32, ease: "easeOut" }}
      >
        <div className="activity-panel-header">
          <div className="activity-title">
            <span className="activity-icon"><Icon name="activity" size={20} /></span>
            <div>
              <h2 id="activity-title">{activityPreview.title}</h2>
              <p>{activityPreview.description}</p>
            </div>
          </div>
          <span className="activity-label">EVENT STREAM / PREVIEW</span>
        </div>
        <div className="activity-empty">
          <div className="activity-empty-art" aria-hidden="true">
            <span className="activity-empty-ring"><Icon name="logs" size={28} /></span>
            <span className="activity-orbit activity-orbit-one" />
            <span className="activity-orbit activity-orbit-two" />
          </div>
          <strong>{activityPreview.emptyTitle}</strong>
          <p>{activityPreview.emptyDescription}</p>
          <span className="terminal-line">
            <span>&gt;</span> {activityPreview.terminalText}<span className="terminal-cursor">_</span>
          </span>
        </div>
      </motion.section>
      <div className="page-footer">
        <span>SIS SUPPORT</span>
        <span>INTERFACE SHELL <span className="footer-slash">//</span> UI PREVIEW</span>
      </div>
    </PageContainer>
  );
}
