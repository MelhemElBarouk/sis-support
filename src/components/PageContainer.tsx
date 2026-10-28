import type { ReactNode } from "react";

type PageContainerProps = {
  title: string;
  section: string;
  description: string;
  children: ReactNode;
};

export function PageContainer({ title, section, description, children }: PageContainerProps) {
  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> WORKSPACE / {section.toUpperCase()}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <span className="page-preview-badge"><span /> INTERFACE PREVIEW</span>
      </div>
      {children}
    </main>
  );
}
