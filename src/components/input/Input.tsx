


function Input({ data, onChange }: any) {

    return (
        <div className={"input" + data.type}>
            <h3>{data}</h3>
            <input {...data} onChange={onChange} />
        </div>
    );
}

export default Input;