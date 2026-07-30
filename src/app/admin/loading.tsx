export default function AdminLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <div className="flex items-center gap-3 text-slate-500 font-medium text-xs">
        <div className="w-5 h-5 border-2 border-slate-300 border-t-[#0B1E3D] rounded-full animate-spin"></div>
        <span>Loading page...</span>
      </div>
    </div>
  );
}