

function Form({ config, onSubmit }: any) {

    const renderForm = (data: any) => {
        return Object.keys(data).map((key: any) => {
            return (
                <>
                    <h3 className="h3">{key}</h3>
                    <input {...data[key]} className={key} />
                </>
            );
        });
    }

    return (
        <div className="form">
            <div className="form__box">
                {renderForm(config.fields)}
                <div
                    className="form__btn btn"
                    onClick={onSubmit}
                >Submit</div>
            </div>
        </div>
    );
}

export default Form;