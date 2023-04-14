interface ExampleFeatureProps {
    example?: boolean
}

const ExampleFeature = ({example}: ExampleFeatureProps) => {
    return (
        <p>{example ? "I'm an example" : "I'm not an example"}</p>
    );
};

export default ExampleFeature;
export {ExampleFeatureProps};