function uploadLocals(birdList, observation, updateLocalObs) {
    const array = JSON.parse(window.localStorage.getItem("locals"));
    if (array) {
        for (let i = 0; i < array.length; i++) {
            birdList.update({
                Birds: [...observation,
                array[i]
                ]
            })
        }
    }
    localStorage.removeItem("locals")
    updateLocalObs([]);
}

export default uploadLocals