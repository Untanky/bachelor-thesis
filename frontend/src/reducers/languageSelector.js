import { LanguageSelection } from '../actions';

const languageSelector = (state = LanguageSelection.JAVA_SPRING, action) => {
  switch (action.type) {
    case 'SELECT_LANGUAGE':
      return action.language
    default:
      return state
  }
}

export default languageSelector
