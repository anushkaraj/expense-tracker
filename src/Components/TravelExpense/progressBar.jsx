import MultiProgress, { ProgressComponentProps } from "react-multi-progress";

// for non-TS projects, remove this and other types


function CustomComponent({
	children,
	element,
	...rest
}) {
	return (
		<div
			{...rest} // adds all styles for rendering the progress bar
			style={{
				fontWeight: element.isBold ? 900 : 300,
			}}
		>
			{children}
		</div>
	);
}

export function Progress({budget,totalexpense}) {
    const spend = Math.round((totalexpense / budget) * 100);
   const remaining =100-spend;
	return (
		<MultiProgress
			transitionTime={1.2}
           
			elements={[

				{
					value: remaining,
					color: "#32cd32",
					showPercentage: true,
                    
					fontSize: 12,
					textColor: "white",
					isBold: true,
                   
				},
				{
					value: spend,
					color: "#FF0000",
					showPercentage: true,
					textColor: "white",
					fontSize: 12,
					isBold: false,
					className: "my-custom-css-class",
				},
			]}
			height={25}
			backgroundColor="gray"
			border="1px solid white"
			className="my-custom-css-class"
			component={CustomComponent}
		/>
	);
}