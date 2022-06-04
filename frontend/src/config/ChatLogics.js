export const getSender = (logged, users) => { 
    return users[0]._id === logged._id ? users[1].name : users[0].name
}
export const getSenderFull = (logged, users) => { 
    return users[0]._id === logged._id ? users[1] : users[0].name
}