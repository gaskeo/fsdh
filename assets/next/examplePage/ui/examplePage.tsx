interface ExamplePageProps {
    example?: boolean
}

const ExamplePage = ({example}: ExamplePageProps) => {
    return (
        <p>{example ? "I'm an example" : "I'm not an example"}</p>
    );
};

export default ExamplePage;
export {ExamplePageProps};