import { combineReducers } from 'redux';
import ContactsReducer from './reducer_contacts';
import ActiveContact from './reducer_active_contact';
import RenderingContacts from './reducer.render_contacts';



const rootReducer = combineReducers({
    contacts: ContactsReducer,
    activeContact: ActiveContact,
    renderContacts: RenderingContacts
});

export default rootReducer;
