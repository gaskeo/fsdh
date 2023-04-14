interface ExampleLayoutProps {
    example?: boolean
}

const ExampleLayout = ({example}: ExampleLayoutProps) => {
    return (
        <p>{example ? "I'm an example" : "I'm not an example"}</p>
    );
};

export default ExampleLayout;
export {ExampleLayoutProps};