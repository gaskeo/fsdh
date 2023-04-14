const exampleHoc = (component: () => any) => {
    return (
        <p>{component()}</p>
    );
};

export default exampleHoc;
