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

const setWorkTime = (todo, startedAt) => {
    const timeDifference = Math.abs(startedAt.getTime() - new Date().getTime());
    const timeInSeconds = timeDifference / 1000
    todo.startedAt = undefined
    if (todo.workTime) {
        todo.workTime = todo.workTime + timeInSeconds
    } else {
        todo.workTime = timeInSeconds
    }
}

module.exports = {handleTodoErrors, setWorkTime}
