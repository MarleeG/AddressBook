export function selectContact(contact) {
    // console.log('actions/index: ', contact);
    return {
        type: 'CONTACT_SELECTED',
        payload: contact
    };
}

export function renderingContacts(){
    return false;
}