import "bootstrap/dist/css/bootstrap.min.css";

export function Button(props) {
	let { typeButton, onClick, ...rest } = props;
	return (
		<button
			type="button"
			className={`btn btn-${typeButton} mb-4`}
			style={{ ...rest }}
			onClick={onClick}
		>
			{props.children}
		</button>
	);
}
