const handleTodoErrors = (e, req, res) => {
    console.log(e);
    if (e.name === "ValidationError") {
        Object.keys(e.errors).forEach((key) => {
            return res.status(400).send({message: e.errors[key].message});
        });
    } else {
        return res.status(500).send({message: "Ocorreu algum erro."});
    }
}

module.exports = {handleTodoErrors}
