import { LanguageSelection } from '../actions';

const languageSelector = (state = LanguageSelection[0], action) => {
  console.log(action);
  switch (action.type) {
    case 'SELECT_LANGUAGE':
      return action.language
    default:
      return state
  }
}

export default languageSelector
