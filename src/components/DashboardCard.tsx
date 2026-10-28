import { motion } from "framer-motion";
import type { IconName } from "./Icon";
import { Icon } from "./Icon";

type DashboardCardProps = {
  title: string;
  value: string;
  description: string;
  icon: IconName;
  code: string;
  index: number;
};

export function DashboardCard({ title, value, description, icon, code, index }: DashboardCardProps) {
  return (
    <motion.article
      className="dashboard-card"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: 0.08 + index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -3, borderColor: "#b0cad5" }}
    >
      <div className="card-top"><span className="card-icon"><Icon name={icon} size={21} /></span><span className="card-code">{code}</span></div>
      <div className="card-content"><h2>{title}</h2><strong className={value === "—" ? "card-value card-value-empty" : "card-value"}>{value}</strong><p>{description}</p></div>
      <div className="card-footer"><span className="card-footer-dot" /> PREVIEW DATA <Icon name="arrowUpRight" size={15} /></div>
    </motion.article>
  );
}
