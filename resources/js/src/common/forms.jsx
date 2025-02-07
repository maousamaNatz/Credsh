export function Input({ label, error, ...props }) {
    return (
        <div>
            {label && (
                <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="mt-1">
                <input
                    {...props}
                    className={`
                        w-full rounded-md shadow-sm
                        ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' :
                                'border-gray-300 focus:border-pink-500 focus:ring-pink-500'}
                    `}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
