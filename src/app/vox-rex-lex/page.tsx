export default function VoxRexLexPage() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden flex flex-col">
      <iframe
        src="/vox-rex-lex/index.html"
        className="w-full h-full border-0 flex-1"
        title="VoxRexLex"
      />
    </div>
  );
}

