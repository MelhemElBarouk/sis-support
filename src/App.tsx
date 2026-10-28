import { MotionConfig } from "framer-motion";
import { AppShell } from "./components/AppShell";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppShell />
    </MotionConfig>
  );
}

export default App;
