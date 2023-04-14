interface ExampleEntityProps {
    example?: boolean
}

const ExampleEntity = ({example}: ExampleEntityProps) => {
    return (
        <p>{example ? "I'm an example" : "I'm not an example"}</p>
    );
};

export default ExampleEntity;
export {ExampleEntityProps};