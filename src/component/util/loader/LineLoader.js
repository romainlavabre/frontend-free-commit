export default function LineLoader({size = "4", col = "12"}) {
    return (
        <div className="w-full mx-auto my-auto">
            <div className="animate-pulse grid grid-cols-12">
                <div className={`h-${size} bg-slate-700 rounded col-span-${col}`}></div>
            </div>
        </div>
    );
}
