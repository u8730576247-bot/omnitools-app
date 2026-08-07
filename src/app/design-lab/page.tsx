import { Scale } from "lucide-react";
import KillKitNode from "@/components/killkit/KillKitNode";

export default function DesignLabPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0B0F17",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <KillKitNode
        title="VoxRexLex"
        description="AI Legal Assistant"
        badge="BETA"
        href="/vox-rex-lex"
        icon={Scale}
      />
    </main>
  );
}