interface ExampleWidgetProps {
    example?: boolean
}

const ExampleWidget = ({example}: ExampleWidgetProps) => {
    return (
        <p>{example ? "I'm an example" : "I'm not an example"}</p>
    );
};

export default ExampleWidget;
export {ExampleWidgetProps};