export default function LoaderOverlay({ show }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}
