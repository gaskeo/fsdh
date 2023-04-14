interface ExampleComponentProps {
    example?: boolean
}

const ExampleComponent = ({example}: ExampleComponentProps) => {
    return (
        <p>{example ? "I'm an example" : "I'm not an example"}</p>
    );
};

export default ExampleComponent;
export {ExampleComponentProps};